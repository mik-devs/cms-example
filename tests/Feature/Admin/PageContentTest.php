<?php

use App\Models\Page;
use App\Models\User;
use Database\Seeders\PageSeeder;
use Database\Seeders\RolePermissionSeeder;
use Inertia\Testing\AssertableInertia as Assert;

it('requires authentication and verification for page management', function () {
    $page = Page::factory()->create();

    $this->get(route('admin.pages.index'))->assertRedirect(route('login'));
    $this->get(route('admin.pages.edit', $page->slug))->assertRedirect(route('login'));

    $this->actingAs(User::factory()->unverified()->create())
        ->get(route('admin.pages.index'))
        ->assertRedirect(route('verification.notice'));
});

it('passes the matching page to each about route', function (
    string $route,
    string $slug,
    string $component,
) {
    Page::factory()->create([
        'slug' => $slug,
        'title' => "Title {$slug}",
        'content' => "<p>Content {$slug}</p>",
    ]);

    $this->get(route($route))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component($component)
            ->where('page.slug', $slug)
            ->where('page.title', "Title {$slug}"));
})->with([
    ['about.history', 'history', 'public/about/history'],
    ['about.demographic', 'demographic', 'public/about/demographic'],
    ['about.socio-economic', 'socio-economic', 'public/about/socio-economic'],
    ['about.geography', 'geography', 'public/about/geography'],
]);

it('allows administrators to edit and sanitize page content', function () {
    $this->actingAs(superAdminUser());

    $page = Page::factory()->create([
        'slug' => 'history',
        'title' => 'History of Kiblawan',
        'content' => '<p>Old content</p>',
    ]);

    $this->get(route('admin.pages.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $inertia) => $inertia
            ->component('admin/pages/index')
            ->has('pages', 1));

    $this->get(route('admin.pages.edit', $page->slug))
        ->assertOk()
        ->assertInertia(fn (Assert $inertia) => $inertia
            ->component('admin/pages/edit')
            ->where('page.slug', 'history'));

    $content = <<<'HTML'
<h2>Updated History</h2>
<p onclick="alert(1)">Safe text</p>
<script>alert(1)</script>
<a href="javascript:alert(1)">Bad link</a>
<img src="javascript:alert(1)" alt="Bad image">
<img src="/images/kib.png" alt="Safe image">
HTML;

    $this->put(route('admin.pages.update', $page->slug), [
        'title' => 'Updated History',
        'content' => $content,
    ])->assertRedirect(route('admin.pages.index'));

    $page->refresh();

    expect($page->title)->toBe('Updated History');
    expect($page->content)->toContain('<h2>Updated History</h2>');
    expect($page->content)->toContain('<p>Safe text</p>');
    expect($page->content)->toContain('<img src="/images/kib.png" alt="Safe image">');
    expect($page->content)->not->toContain('<script');
    expect($page->content)->not->toContain('onclick');
    expect($page->content)->not->toContain('javascript:');

    $this->get(route('about.history'))
        ->assertOk()
        ->assertInertia(fn (Assert $inertia) => $inertia
            ->component('public/about/history')
            ->where('page.title', 'Updated History')
            ->where('page.content', $page->content));
});

it('forbids users without the manage settings permission from editing pages', function () {
    $this->seed(RolePermissionSeeder::class);

    $editor = User::factory()->create();
    $editor->assignRole('editor');

    $page = Page::factory()->create([
        'slug' => 'history',
        'title' => 'History of Kiblawan',
        'content' => '<p>Old content</p>',
    ]);

    $this->actingAs($editor)
        ->get(route('admin.pages.index'))
        ->assertForbidden();

    $this->get(route('admin.pages.edit', $page->slug))
        ->assertForbidden();

    $this->put(route('admin.pages.update', $page->slug), [
        'title' => 'Changed',
        'content' => '<p>Changed</p>',
    ])->assertForbidden();

    expect($page->refresh()->title)->toBe('History of Kiblawan');
});

it('seeds every about page without overwriting existing edits', function () {
    $this->seed(PageSeeder::class);

    expect(Page::query()->count())->toBe(4);

    foreach (['history', 'demographic', 'socio-economic', 'geography'] as $slug) {
        expect(Page::query()->where('slug', $slug)->exists())->toBeTrue();
    }

    $history = Page::query()->where('slug', 'history')->firstOrFail();
    expect($history->title)->toBe('History of Kiblawan');
    expect($history->content)->toContain("B'laan");

    $history->update(['title' => 'Edited History']);

    $this->seed(PageSeeder::class);

    expect($history->refresh()->title)->toBe('Edited History');
});
