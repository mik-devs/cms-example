<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Official;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class ChatbotController extends Controller
{
    private const FALLBACK_REPLIES = [
        'en' => 'Sorry, I am having trouble connecting. Please try again.',
        'fil' => 'Paumanhin, hindi ako makakonekta ngayon. Subukan muli.',
        'ceb' => 'Pasensya na, dili ko makakonekta karon. Palihug sulayi pag-usab.',
    ];

    private const BUSY_REPLIES = [
        'en' => 'Our assistant is very busy right now. Please try again in a few minutes.',
        'fil' => 'Masyadong abala ang aming assistant ngayon. Pakisubukan muli pagkalipas ng ilang minuto.',
        'ceb' => 'Grabe ka-busy ang among assistant karon. Palihug sulayi pag-usab pila ka minuto.',
    ];

    /**
     * Statuses that should switch to the next model immediately instead of retrying.
     *
     * @var list<int>
     */
    private const MODEL_SWITCH_STATUSES = [404, 429, 503];

    /**
     * @var array<string, list<string>>
     */
    private const STATIC_TOPICS = [
        'office_hours' => [
            'office hours',
            'office hour',
            'opening hours',
            'open hours',
            'oras sa opisina',
            'takna sa opisina',
            'unsa ang oras',
        ],
        'address' => [
            'address',
            'located',
            'location',
            'adres',
            'tirahan',
            'matatagpuan',
            'nasaan ang munisipyo',
        ],
    ];

    public function chat(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'message' => ['required', 'string', 'max:500'],
            'language' => ['nullable', 'string', 'in:en,fil,ceb'],
            'history' => ['nullable', 'array', 'max:10'],
        ]);

        $language = $validated['language'] ?? 'en';
        $fallbackReply = self::FALLBACK_REPLIES[$language];

        if ($staticReply = $this->staticReply($validated['message'], $language)) {
            return response()->json(['reply' => $staticReply]);
        }

        $apiKey = config('services.groq.api_key');

        if (blank($apiKey) || $apiKey === 'your_api_key_here') {
            Log::warning('Groq chatbot API key is missing or still the placeholder value.');

            return response()->json(['reply' => $fallbackReply], 503);
        }

        // Primary + fallback models served by Groq
        $primaryModel = config('services.groq.model', 'openai/gpt-oss-120b');
        $fallbackModels = ['openai/gpt-oss-20b', 'llama-3.3-70b-versatile'];
        $modelsToTry = array_unique(array_merge([$primaryModel], $fallbackModels));

        try {
            $officials = Official::orderBy('order')->get();

            $officialsText = '';
            if ($officials->isEmpty()) {
                $officialsText = "The list of elected officials is currently empty in the system. You must tell the user you don't have this information yet.";
            } else {
                $officialsText = "Current Elected Officials:\n";
                foreach ($officials as $off) {
                    $officialsText .= "- {$off->position}: {$off->name}\n";
                }
            }

            $address = Setting::where('key', 'address')->value('value') ?? 'Dagohoy Street, Barangay Poblacion, Kiblawan, Davao del Sur';
            $officeHours = Setting::where('key', 'office_hours')->value('value') ?? 'Mon-Fri, 8AM-5PM';

            $systemPrompt = "You are #BastaTagaKiblawanNo.1, the official AI assistant of the Municipality of Kiblawan, Davao del Sur, Philippines.

ROLE AND TONE:
- You represent the local government. Be polite, welcoming, professional, and helpful.
- Do not use slang, profanity, or casual text-speak.

STRICT BOUNDARIES:
1. ONLY answer questions related to Kiblawan, its services, tourism, officials, history, and local government operations.
2. If a user asks an off-topic question (e.g., coding, national politics, unrelated trivia, math), politely decline and state that you are only programmed to assist with Kiblawan municipal matters.
3. NEVER invent laws, fees, requirements, or schedules.
4. If the provided CONTEXT does not contain the answer, DO NOT guess. Reply with: 'Pasensya na, wala pa akong updated na impormasyon tungkol diyan. Palihug tawag o bisitahin na lang ang Municipal Hall para sa tiyak na sagot.'

DYNAMIC CONTEXT:
- Address: {$address}
- Office Hours: {$officeHours}
{$officialsText}

OUTPUT RULES:
DO NOT use Markdown formatting like **bold**, *italic*, or # headers. Output plain text only. Use plain numbers (1., 2.) or dashes (-) for lists. Do not use the word 'Certainly' or 'Here is an overview'. Start your answer directly with the facts.

LANGUAGE RULE:
";

            if ($language === 'fil') {
                $systemPrompt .= ' You MUST reply in Tagalog.';
            } elseif ($language === 'ceb') {
                $systemPrompt .= ' You MUST reply in Cebuano (Bisaya).';
            } else {
                $systemPrompt .= ' You MUST reply in English.';
            }

            // Fetch and sanitize the history text
            $rawHistory = Setting::where('key', 'kiblawan_history')->value('value') ?? '';
            // SECURITY: Strip HTML tags to prevent prompt injection and XSS
            $safeHistory = strip_tags($rawHistory);
            // Limit length to prevent token overflow (e.g., max 3000 chars)
            $safeHistory = substr($safeHistory, 0, 3000);

            // Add to the system prompt
            $systemPrompt .= "\n\nLOCAL HISTORY & CONTEXT:\n".$safeHistory;

            $response = null;
            $usedModel = null;

            // Try each model until one succeeds
            foreach ($modelsToTry as $model) {
                $httpRequest = Http::withHeaders([
                    'Accept' => 'application/json',
                    'Content-Type' => 'application/json',
                    'Authorization' => "Bearer {$apiKey}",
                ])
                    ->timeout(60)
                    ->retry(3, 2000, function ($exception): bool {
                        return ! in_array($exception->response?->status(), self::MODEL_SWITCH_STATUSES, true);
                    }, throw: false);

                if (app()->isLocal()) {
                    $httpRequest->withoutVerifying();
                }

                $response = $httpRequest->post('https://api.groq.com/openai/v1/chat/completions', [
                    'model' => $model,
                    'messages' => [
                        [
                            'role' => 'system',
                            'content' => $systemPrompt,
                        ],
                        [
                            'role' => 'user',
                            'content' => $validated['message'],
                        ],
                    ],
                    'temperature' => 0.7,
                    'max_tokens' => 800,
                ]);

                // Stop looping if request succeeded or failed with a non-retryable error
                if (! $response->failed() || ! in_array($response->status(), self::MODEL_SWITCH_STATUSES, true)) {
                    $usedModel = $model;
                    break;
                }

                Log::warning("Model {$model} failed with status {$response->status()}. Trying next...");
            }

            if ($response === null || $response->failed()) {
                Log::error('All Groq models failed', [
                    'status' => $response?->status(),
                    'body' => $response?->body(),
                ]);

                return response()->json([
                    'reply' => self::BUSY_REPLIES[$language],
                ], 503);
            }

            $text = data_get($response->json(), 'choices.0.message.content');

            if (blank($text)) {
                Log::error('Groq API returned no text response', [
                    'model' => $usedModel,
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                return response()->json([
                    'reply' => $fallbackReply,
                ], 500);
            }
        } catch (Throwable $exception) {
            $exceptionMessage = $exception->getMessage();
            if (is_string($apiKey) && $apiKey !== '') {
                $exceptionMessage = str_replace($apiKey, '[REDACTED]', $exceptionMessage);
            }

            Log::error('Groq API request failed', [
                'model' => $usedModel ?? 'unknown',
                'exception' => $exception::class,
                'message' => $exceptionMessage,
            ]);

            return response()->json([
                'reply' => $fallbackReply,
            ], 500);
        }

        return response()->json(['reply' => $text]);
    }

    private function staticReply(string $message, string $language): ?string
    {
        $normalized = mb_strtolower(trim($message));

        foreach (self::STATIC_TOPICS as $topic => $keywords) {
            foreach ($keywords as $keyword) {
                if (! str_contains($normalized, $keyword)) {
                    continue;
                }

                return Cache::remember(
                    "chatbot:static:{$topic}:{$language}",
                    now()->addHour(),
                    fn (): string => $this->buildStaticReply($topic, $language),
                );
            }
        }

        return null;
    }

    private function buildStaticReply(string $topic, string $language): string
    {
        if ($topic === 'office_hours') {
            $officeHours = Setting::where('key', 'office_hours')->value('value') ?? 'Mon-Fri, 8AM-5PM';

            return match ($language) {
                'fil' => "Bukas ang aming opisina tuwing {$officeHours}.",
                'ceb' => "Abli ang among opisina {$officeHours}.",
                default => "Our office is open {$officeHours}.",
            };
        }

        $address = Setting::where('key', 'address')->value('value') ?? 'Dagohoy Street, Barangay Poblacion, Kiblawan, Davao del Sur';

        return match ($language) {
            'fil' => "Matatagpuan ang Munisipyo ng Kiblawan sa {$address}.",
            'ceb' => "Ang Munisipyo sa Kiblawan nahimutang sa {$address}.",
            default => "The Municipality of Kiblawan is located at {$address}.",
        };
    }
}
