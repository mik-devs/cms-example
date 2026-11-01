<?php

use Illuminate\Support\Facades\Http;

it('returns the gemini reply for a chat message', function () {
    config([
        'services.gemini.api_key' => 'test-key',
        'services.gemini.model' => 'gemini-3.5-flash',
    ]);
    Http::preventStrayRequests();

    Http::fake([
        'generativelanguage.googleapis.com/*' => Http::response([
            'candidates' => [
                [
                    'content' => [
                        'parts' => [
                            ['text' => 'Kumusta! Unsa akong matabang?'],
                        ],
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
        ->assertJson(['reply' => 'Kumusta! Unsa akong matabang?']);

    Http::assertSent(fn ($request) => $request->url() === 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=test-key'
        && $request['contents'][0]['parts'][0]['text'] === 'Asa ang municipal hall?'
        && str_contains($request['system_instruction']['parts'][0]['text'], 'You MUST reply in Tagalog.')
        && str_contains($request['system_instruction']['parts'][0]['text'], 'Do not invent laws or fees.')
        && str_contains($request['system_instruction']['parts'][0]['text'], 'advise the user to call the municipal hall.'));
});

it('instructs gemini to reply in Cebuano', function () {
    config(['services.gemini.api_key' => 'test-key']);
    Http::preventStrayRequests();

    Http::fake([
        'generativelanguage.googleapis.com/*' => Http::response([
            'candidates' => [
                [
                    'content' => [
                        'parts' => [
                            ['text' => 'Kumusta!'],
                        ],
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
        $request['system_instruction']['parts'][0]['text'],
        'You MUST reply in Cebuano (Bisaya).',
    ));
});

it('defaults to english when no language is provided', function () {
    config(['services.gemini.api_key' => 'test-key']);

    Http::fake([
        'generativelanguage.googleapis.com/*' => Http::response([
            'candidates' => [
                [
                    'content' => [
                        'parts' => [
                            ['text' => 'Hello! How can I help?'],
                        ],
                    ],
                ],
            ],
        ]),
    ]);

    $this->postJson('/api/chat', ['message' => 'Hello'])->assertOk();

    Http::assertSent(fn ($request) => str_contains($request['system_instruction']['parts'][0]['text'], 'You MUST reply in English.'));
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

it('returns a friendly reply when the gemini request fails', function () {
    config(['services.gemini.api_key' => 'test-key']);

    Http::fake([
        'generativelanguage.googleapis.com/*' => Http::response([], 500),
    ]);

    $this->postJson('/api/chat', ['message' => 'Hello'])
        ->assertStatus(500)
        ->assertJsonStructure(['reply']);
});

it('returns a friendly reply when the api key is missing', function () {
    config(['services.gemini.api_key' => null]);

    $this->postJson('/api/chat', ['message' => 'Hello'])
        ->assertStatus(503)
        ->assertJsonStructure(['reply']);
});
