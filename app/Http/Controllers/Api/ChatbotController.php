<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Official;
use App\Models\Setting;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class ChatbotController extends Controller
{
    private const SYSTEM_PROMPT = <<<'PROMPT'
You are #BastaTagaKiblawanNo.1, the official AI assistant of the Municipality of Kiblawan. Your tone should be polite and helpful.
Context: Address is Dagohoy Street, Barangay Poblacion. Office hours are Mon-Fri, 8AM-5PM. Services include Business Permits, Civil Registry, Health Services, and other municipal services.
STRICT RULES:
1. If you don't know the answer, advise the user to call the municipal hall.
2. Do not invent laws or fees.
PROMPT;

    /**
     * @var array<string, string>
     */
    private const LANGUAGE_INSTRUCTIONS = [
        'en' => 'You MUST reply in English.',
        'fil' => 'You MUST reply in Tagalog.',
        'ceb' => 'You MUST reply in Cebuano (Bisaya).',
    ];

    /**
     * @var array<string, string>
     */
    private const FALLBACK_REPLIES = [
        'en' => 'Sorry, I am having trouble connecting. Please try again.',
        'fil' => 'Paumanhin, hindi ako makakonekta ngayon. Subukan muli.',
        'ceb' => 'Pasensya na, dili ko makakonekta karon. Palihug sulayi pag-usab.',
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

        $apiKey = config('services.gemini.api_key');

        if (blank($apiKey) || $apiKey === 'your_api_key_here') {
            Log::warning('Gemini chatbot API key is missing or still the placeholder value.');

            return response()->json([
                'reply' => $fallbackReply,
            ], 503);
        }

        $officials = Official::orderBy('order')->get();
        $mayor = $officials->first(fn ($off) => str_contains(strtolower($off->position), 'mayor'));

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

        $mayorLine = $mayor !== null
            ? "Current Mayor: {$mayor->name}"
            : 'Current Mayor: Not specified';

        $model = config('services.gemini.model', 'gemini-3.5-flash');
        $systemPrompt = self::SYSTEM_PROMPT."\n"
            .$mayorLine."\n"
            .$officialsText
            ."Address: {$address}\n"
            ."Office Hours: {$officeHours}\n"
            .self::LANGUAGE_INSTRUCTIONS[$language];
        $endpoint = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key={$apiKey}";

        try {
            $response = Http::withHeaders([
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ])->timeout(30)->post($endpoint, [
                'system_instruction' => [
                    'parts' => [
                        ['text' => $systemPrompt],
                    ],
                ],
                'contents' => [
                    [
                        'role' => 'user',
                        'parts' => [
                            ['text' => $validated['message']],
                        ],
                    ],
                ],
                'generationConfig' => [
                    'temperature' => 0.7,
                    'maxOutputTokens' => 512,
                ],
            ]);

            $response->throw();
        } catch (RequestException $exception) {
            Log::error('Gemini API request failed', [
                'model' => $model,
                'status' => $exception->response?->status(),
                'body' => $exception->response?->body(),
                'message' => $exception->getMessage(),
            ]);

            return response()->json([
                'reply' => $fallbackReply,
            ], 500);
        } catch (Throwable $exception) {
            Log::error('Gemini API Error: '.$exception->getMessage(), [
                'model' => $model,
                'exception' => $exception,
            ]);

            return response()->json([
                'reply' => $fallbackReply,
            ], 500);
        }

        $text = data_get($response->json(), 'candidates.0.content.parts.0.text');

        if (blank($text)) {
            Log::error('Gemini API returned no text response', [
                'model' => $model,
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return response()->json([
                'reply' => $fallbackReply,
            ], 500);
        }

        return response()->json(['reply' => $text]);
    }
}
