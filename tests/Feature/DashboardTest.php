<?php

use App\Models\Bid;
use App\Models\JobPosting;
use App\Models\News;
use App\Models\Official;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('the dashboard lives under the admin prefix', function () {
    expect(route('dashboard'))->toBe(url('/admin'));

    $this->actingAs(User::factory()->create());
    $this->get('/dashboard')->assertNotFound();
});

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('authenticated users can visit the dashboard', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertOk();
});

test('the dashboard shares content totals with the admin', function () {
    $this->actingAs(User::factory()->create());

    News::query()->create([
        'title' => 'Kiblawan launches new program',
        'content' => 'Program details.',
    ]);
    JobPosting::query()->create([
        'title' => 'Planning Officer',
        'description' => 'Support municipal planning.',
        'department' => 'Planning',
    ]);
    Bid::query()->create([
        'title' => 'Road improvement project',
        'date_posted' => now()->toDateString(),
    ]);
    Official::query()->create([
        'name' => 'Maria Santos',
        'position' => 'Municipal Mayor',
    ]);

    $this->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->where('stats.news', 1)
            ->where('stats.jobs', 1)
            ->where('stats.bids', 1)
            ->where('stats.officials', 1));
});
