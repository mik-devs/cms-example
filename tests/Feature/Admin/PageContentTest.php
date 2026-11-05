<?php

use App\Models\Page;
use App\Models\User;
use Database\Seeders\PageSeeder;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
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

it('allows administrators to create and update content blocks with uploaded images', function () {
    Storage::fake('public');

    $this->actingAs(superAdminUser());

    $page = Page::factory()->create([
        'slug' => 'history',
        'title' => 'History of Kiblawan',
        'content' => '<p>Legacy HTML</p>',
    ]);

    $this->put(route('admin.pages.update', $page->slug), [
        'title' => 'History of Kiblawan',
        'mode' => 'blocks',
        'blocks' => [
            [
                'kicker' => '<b>Overview</b>',
                'title' => 'From Tribal Lands to a Thriving Municipality',
                'subtitle' => 'Honoring Indigenous Traditions',
                'body' => "Historically, <script>alert(1)</script> the B'laan tribe.",
                'image_position' => 'right',
                'existing_image' => '',
                'image' => UploadedFile::fake()->image('story.png'),
            ],
        ],
    ])->assertRedirect(route('admin.pages.index'));

    $blocks = json_decode($page->refresh()->content, true, 512, JSON_THROW_ON_ERROR);
    $createdImage = $blocks[0]['image'];
    $createdImagePath = str_replace('/storage/', '', $createdImage);

    expect($blocks)->toHaveCount(1);
    expect($blocks[0]['kicker'])->toBe('Overview');
    expect($blocks[0]['body'])->toContain("the B'laan tribe.")->not->toContain('<script');
    expect($blocks[0]['image_position'])->toBe('right');
    expect($createdImage)->toStartWith('/storage/pages/history/');
    Storage::disk('public')->assertExists($createdImagePath);

    $this->put(route('admin.pages.update', $page->slug), [
        'title' => 'History of Kiblawan',
        'mode' => 'blocks',
        'blocks' => [
            [
                'kicker' => 'Overview',
                'title' => 'Updated Title',
                'subtitle' => 'Honoring Indigenous Traditions',
                'body' => 'Updated body',
                'image_position' => 'left',
                'existing_image' => $createdImage,
            ],
        ],
    ])->assertRedirect(route('admin.pages.index'));

    $blocks = json_decode($page->refresh()->content, true, 512, JSON_THROW_ON_ERROR);

    expect($blocks[0]['title'])->toBe('Updated Title');
    expect($blocks[0]['image'])->toBe($createdImage);
    Storage::disk('public')->assertExists($createdImagePath);

    $this->put(route('admin.pages.update', $page->slug), [
        'title' => 'History of Kiblawan',
        'mode' => 'blocks',
        'blocks' => [
            [
                'kicker' => 'Overview',
                'title' => 'Updated Title',
                'subtitle' => 'Honoring Indigenous Traditions',
                'body' => 'Updated body',
                'image_position' => 'left',
                'existing_image' => $createdImage,
                'image' => UploadedFile::fake()->image('replacement.png'),
            ],
        ],
    ])->assertRedirect(route('admin.pages.index'));

    $blocks = json_decode($page->refresh()->content, true, 512, JSON_THROW_ON_ERROR);

    expect($blocks[0]['image'])->not->toBe($createdImage);
    Storage::disk('public')->assertExists(str_replace('/storage/', '', $blocks[0]['image']));
    Storage::disk('public')->assertMissing($createdImagePath);
});

it('requires an image and at least one block when saving in blocks mode', function () {
    $this->actingAs(superAdminUser());

    $page = Page::factory()->create([
        'slug' => 'history',
        'title' => 'History of Kiblawan',
        'content' => '<p>Legacy HTML</p>',
    ]);

    $block = [
        'kicker' => 'Overview',
        'title' => 'From Tribal Lands to a Thriving Municipality',
        'subtitle' => 'Honoring Indigenous Traditions',
        'body' => 'Historically, Kiblawan was inhabited by the B\'laan tribe.',
        'image_position' => 'left',
        'existing_image' => '',
    ];

    $this->put(route('admin.pages.update', $page->slug), [
        'title' => 'History of Kiblawan',
        'mode' => 'blocks',
        'blocks' => [$block],
    ])->assertSessionHasErrors('blocks.0.image');

    $this->put(route('admin.pages.update', $page->slug), [
        'title' => 'History of Kiblawan',
        'mode' => 'blocks',
        'blocks' => [],
    ])->assertSessionHasErrors('blocks');

    $this->put(route('admin.pages.update', $page->slug), [
        'title' => 'History of Kiblawan',
        'mode' => 'blocks',
        'blocks' => [array_merge($block, ['existing_image' => 'images/about/story.png'])],
    ])->assertSessionHasErrors('blocks.0.existing_image');

    expect($page->refresh()->content)->toBe('<p>Legacy HTML</p>');
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
