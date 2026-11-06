<?php

use App\Models\Setting;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

it('returns the groq reply for a chat message', function () {
    config([
        'services.groq.api_key' => 'test-key',
        'services.groq.model' => 'openai/gpt-oss-120b',
    ]);
    Http::preventStrayRequests();

    Http::fake([
        'api.groq.com/*' => Http::response([
            'choices' => [
                [
                    'message' => [
                        'role' => 'assistant',
                        'content' => 'Kumusta! Unsa akong matabang?',
                    ],
                ],
            ],
        ]),
    ]);

    $this->postJson('/api/chat', [
        'message' => 'Asa ang municipal hall?',
        'language' => 'fil',
    ])
        ->assertOk()
        ->assertJsonStructure(['reply' => ['message', 'actions']])
        ->assertJsonPath('reply.message', 'Kumusta! Unsa akong matabang?');

    Http::assertSent(fn ($request) => $request->url() === 'https://api.groq.com/openai/v1/chat/completions'
        && $request->hasHeader('Authorization', 'Bearer test-key')
        && $request['model'] === 'openai/gpt-oss-120b'
        && $request['messages'][0]['role'] === 'system'
        && $request['messages'][1]['role'] === 'user'
        && $request['messages'][1]['content'] === 'Asa ang municipal hall?'
        && str_starts_with($request['messages'][0]['content'], 'You are #BastaTagaKiblawanNo.1')
        && str_contains($request['messages'][0]['content'], 'ROLE AND TONE')
        && str_contains($request['messages'][0]['content'], 'STRICT BOUNDARIES')
        && str_contains($request['messages'][0]['content'], 'ONLY answer questions related to Kiblawan')
        && str_contains($request['messages'][0]['content'], 'NEVER invent laws')
        && str_contains($request['messages'][0]['content'], 'Pasensya na, wala pa akong updated')
        && str_contains($request['messages'][0]['content'], 'You MUST reply in Tagalog.'));
});

it('sanitizes and includes kiblawan history in the system prompt', function () {
    config(['services.groq.api_key' => 'test-key']);
    Setting::query()->updateOrCreate(
        ['key' => 'kiblawan_history'],
        ['value' => '<script>alert("xss")</script>Kiblawan was founded in 1908.'],
    );

    Http::fake([
        'api.groq.com/*' => Http::response([
            'choices' => [
                [
                    'message' => [
                        'role' => 'assistant',
                        'content' => 'Local history.',
                    ],
                ],
            ],
        ]),
    ]);

    $this->postJson('/api/chat', ['message' => 'Who founded Kiblawan?', 'language' => 'en'])
        ->assertOk();

    Http::assertSent(fn ($request) => str_contains(
        $request['messages'][0]['content'],
        "LOCAL HISTORY & CONTEXT:\nalert(\"xss\")Kiblawan was founded in 1908.",
    ));
});

it('retries the groq request after a server error', function () {
    config(['services.groq.api_key' => 'test-key']);
    Http::preventStrayRequests();

    Http::fake([
        'api.groq.com/*' => Http::sequence()
            ->push([], 500)
            ->push([
                'choices' => [
                    [
                        'message' => [
                            'content' => 'Recovered reply',
                        ],
                    ],
                ],
            ]),
    ]);

    $this->postJson('/api/chat', ['message' => 'Hello'])
        ->assertOk()
        ->assertJsonStructure(['reply' => ['message', 'actions']])
        ->assertJsonPath('reply.message', 'Recovered reply');

    Http::assertSentCount(2);
});

it('uses the next model immediately when groq returns a busy status', function (int $status) {
    config([
        'services.groq.api_key' => 'test-key',
        'services.groq.model' => 'openai/gpt-oss-120b',
    ]);
    Http::preventStrayRequests();

    Http::fake([
        'api.groq.com/*' => Http::sequence()
            ->push(['error' => ['message' => 'Model is busy']], $status)
            ->push([
                'choices' => [
                    [
                        'message' => [
                            'content' => 'Fallback reply',
                        ],
                    ],
                ],
            ]),
    ]);

    $this->postJson('/api/chat', ['message' => 'Hello'])
        ->assertOk()
        ->assertJsonStructure(['reply' => ['message', 'actions']])
        ->assertJsonPath('reply.message', 'Fallback reply');

    Http::assertSentCount(2);
    Http::assertSent(fn ($request) => $request['model'] === 'openai/gpt-oss-120b');
    Http::assertSent(fn ($request) => $request['model'] === 'openai/gpt-oss-20b');
})->with([
    'service unavailable' => [503],
    'rate limited' => [429],
]);

it('advances to the next fallback model when it is also busy', function () {
    config([
        'services.groq.api_key' => 'test-key',
        'services.groq.model' => 'openai/gpt-oss-120b',
    ]);
    Http::preventStrayRequests();

    Http::fake([
        'api.groq.com/*' => Http::sequence()
            ->push([], 503)
            ->push([], 429)
            ->push([
                'choices' => [
                    [
                        'message' => [
                            'content' => 'Second fallback reply',
                        ],
                    ],
                ],
            ]),
    ]);

    $this->postJson('/api/chat', ['message' => 'Hello'])
        ->assertOk()
        ->assertJsonStructure(['reply' => ['message', 'actions']])
        ->assertJsonPath('reply.message', 'Second fallback reply');

    Http::assertSentCount(3);
    Http::assertSent(fn ($request) => $request['model'] === 'openai/gpt-oss-120b');
    Http::assertSent(fn ($request) => $request['model'] === 'llama-3.3-70b-versatile');
});

it('does not use a duplicate model when the configured primary is already a fallback', function () {
    config([
        'services.groq.api_key' => 'test-key',
        'services.groq.model' => 'openai/gpt-oss-20b',
    ]);
    Http::preventStrayRequests();

    Http::fake([
        'api.groq.com/*' => Http::sequence()
            ->push([], 503)
            ->push([
                'choices' => [
                    [
                        'message' => [
                            'content' => 'Deduplicated fallback reply',
                        ],
                    ],
                ],
            ]),
    ]);

    $this->postJson('/api/chat', ['message' => 'Hello'])
        ->assertOk()
        ->assertJsonStructure(['reply' => ['message', 'actions']])
        ->assertJsonPath('reply.message', 'Deduplicated fallback reply');

    Http::assertSentCount(2);
    Http::assertSent(fn ($request) => $request['model'] === 'openai/gpt-oss-20b');
    Http::assertSent(fn ($request) => $request['model'] === 'llama-3.3-70b-versatile');
});

it('disables ssl verification for groq requests only in the local environment', function () {
    $this->app->detectEnvironment(fn () => 'local');
    config(['services.groq.api_key' => 'test-key']);
    Http::preventStrayRequests();

    $verifyOption = null;
    Http::fake([
        'api.groq.com/*' => function ($request, array $options) use (&$verifyOption) {
            $verifyOption = $options['verify'] ?? true;

            return Http::response([
                'choices' => [
                    [
                        'message' => [
                            'content' => 'Local reply',
                        ],
                    ],
                ],
            ]);
        },
    ]);

    $this->postJson('/api/chat', ['message' => 'Hello'])->assertOk();

    expect($verifyOption)->toBeFalse();
});

it('keeps ssl verification enabled outside the local environment', function () {
    $this->app->detectEnvironment(fn () => 'testing');
    config(['services.groq.api_key' => 'test-key']);
    Http::preventStrayRequests();

    $verifyOption = null;
    Http::fake([
        'api.groq.com/*' => function ($request, array $options) use (&$verifyOption) {
            $verifyOption = $options['verify'] ?? true;

            return Http::response([
                'choices' => [
                    [
                        'message' => [
                            'content' => 'Verified reply',
                        ],
                    ],
                ],
            ]);
        },
    ]);

    $this->postJson('/api/chat', ['message' => 'Hello'])->assertOk();

    expect($verifyOption)->not->toBeFalse();
});

it('instructs groq to reply in Cebuano', function () {
    config(['services.groq.api_key' => 'test-key']);
    Http::preventStrayRequests();

    Http::fake([
        'api.groq.com/*' => Http::response([
            'choices' => [
                [
                    'message' => [
                        'content' => 'Kumusta!',
                    ],
                ],
            ],
        ]),
    ]);

    $this->postJson('/api/chat', [
        'message' => 'Kumusta?',
        'language' => 'ceb',
    ])->assertOk();

    Http::assertSent(fn ($request) => str_contains(
        $request['messages'][0]['content'],
        'You MUST reply in Cebuano (Bisaya).',
    ));
    Http::assertSent(fn ($request) => str_contains(
        $request['messages'][0]['content'],
        'Cebuano',
    ));
});

it('defaults to english when no language is provided', function () {
    config(['services.groq.api_key' => 'test-key']);

    Http::fake([
        'api.groq.com/*' => Http::response([
            'choices' => [
                [
                    'message' => [
                        'content' => 'Hello! How can I help?',
                    ],
                ],
            ],
        ]),
    ]);

    $this->postJson('/api/chat', ['message' => 'Hello'])->assertOk();

    Http::assertSent(fn ($request) => str_contains($request['messages'][0]['content'], 'You MUST reply in English.'));
    Http::assertSent(fn ($request) => str_contains(
        $request['messages'][0]['content'],
        'English',
    ));
});

it('rejects an unsupported language', function () {
    $this->postJson('/api/chat', [
        'message' => 'Hello',
        'language' => 'es',
    ])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('language');
});

it('validates the chat message', function () {
    $this->postJson('/api/chat', ['message' => ''])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('message');
});

it('returns a friendly reply when the groq request fails', function () {
    config(['services.groq.api_key' => 'test-key']);
    Http::preventStrayRequests();

    Http::fake([
        'api.groq.com/*' => Http::response([], 500),
    ]);

    $this->postJson('/api/chat', ['message' => 'Hello'])
        ->assertStatus(503)
        ->assertJsonStructure(['reply' => ['message', 'actions']])
        ->assertJsonPath('reply.message', 'Sorry, I am having trouble connecting. Please try again.');

    Http::assertSentCount(3);
    Http::assertSent(fn ($request) => $request['model'] === 'openai/gpt-oss-120b');
});

it('returns a polite localized reply when every model is busy', function (string $language, string $expected) {
    config(['services.groq.api_key' => 'test-key']);
    Http::preventStrayRequests();

    Http::fake([
        'api.groq.com/*' => Http::response(['error' => ['message' => 'High demand']], 503),
    ]);

    $this->postJson('/api/chat', ['message' => 'Hello', 'language' => $language])
        ->assertStatus(503)
        ->assertJsonStructure(['reply' => ['message', 'actions']])
        ->assertJsonPath('reply.message', $expected);

    Http::assertSentCount(3);
})->with([
    'english' => ['en', 'Our assistant is very busy right now. Please try again in a few minutes.'],
    'tagalog' => ['fil', 'Masyadong abala ang aming assistant ngayon. Pakisubukan muli pagkalipas ng ilang minuto.'],
    'cebuano' => ['ceb', 'Grabe ka-busy ang among assistant karon. Palihug sulayi pag-usab pila ka minuto.'],
]);

it('does not leak throwable details when the groq request throws', function () {
    config(['services.groq.api_key' => 'test-key']);
    Http::preventStrayRequests();

    Http::fake([
        'api.groq.com/*' => fn () => throw new Error('diagnostic detail'),
    ]);

    $this->postJson('/api/chat', ['message' => 'Hello'])
        ->assertStatus(500)
        ->assertJsonStructure(['reply' => ['message', 'actions']])
        ->assertJsonPath('reply.message', 'Sorry, I am having trouble connecting. Please try again.')
        ->assertDontSee('diagnostic detail');
});

it('returns a friendly reply when the api key is missing', function () {
    config(['services.groq.api_key' => null]);

    $this->postJson('/api/chat', ['message' => 'Hello'])
        ->assertStatus(503)
        ->assertJsonStructure(['reply' => ['message', 'actions']]);
});

it('answers static office hours questions without calling the api', function () {
    config(['services.groq.api_key' => 'test-key']);
    Cache::flush();
    Http::preventStrayRequests();

    $this->postJson('/api/chat', ['message' => 'What are your office hours?'])
        ->assertOk()
        ->assertJsonStructure(['reply' => ['message', 'actions']]);

    Http::assertNothingSent();
    expect(Cache::has('chatbot:static:office_hours:en'))->toBeTrue();
});

it('answers static address questions in the requested language from cache', function () {
    config(['services.groq.api_key' => 'test-key']);
    Cache::flush();
    Http::preventStrayRequests();

    $this->postJson('/api/chat', ['message' => 'Unsa ang address sa munisipyo?', 'language' => 'ceb'])
        ->assertOk()
        ->assertJsonStructure(['reply' => ['message', 'actions']]);

    Http::assertNothingSent();
    expect(Cache::has('chatbot:static:address:ceb'))->toBeTrue();
});

it('serves repeated static questions from cache', function () {
    config(['services.groq.api_key' => 'test-key']);
    Cache::flush();
    Http::preventStrayRequests();

    $this->postJson('/api/chat', ['message' => 'Where is the municipal hall located?'])
        ->assertOk()
        ->assertJsonStructure(['reply' => ['message', 'actions']]);

    Cache::put('chatbot:static:address:en', 'Cached address reply', now()->addHour());

    $this->postJson('/api/chat', ['message' => 'What is your address?'])
        ->assertOk()
        ->assertJsonStructure(['reply' => ['message', 'actions']]);

    Http::assertNothingSent();
});
