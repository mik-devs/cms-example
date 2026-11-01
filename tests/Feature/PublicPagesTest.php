<?php

use App\Models\Barangay;
use App\Models\News;
use Inertia\Testing\AssertableInertia as Assert;

it('renders each public navigation route', function (string $path, string $component) {
    $this->get($path)
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component($component));
})->with([
    'home' => ['/', 'public/home'],
    'starter welcome' => ['/welcome', 'welcome'],
    'about history' => ['/about/history', 'public/about/history'],
    'about demographic profile' => ['/about/demographic', 'public/about/demographic'],
    'about socio-economic profile' => ['/about/socio-economic', 'public/about/socio-economic'],
    'about geography' => ['/about/geography', 'public/about/geography'],
    'government' => ['/government', 'public/government'],
    'government vision and mission' => ['/government/vision-mission', 'public/government'],
    'government officials' => ['/government/officials', 'public/government'],
    'sangguniang bayan' => ['/government/sangguniang-bayan', 'public/government'],
    'citizens charter' => ['/government/citizens-charter', 'public/government'],
    'directories' => ['/government/directories', 'public/government'],
    'services' => ['/services', 'public/services'],
    'transparency' => ['/transparency', 'public/transparency'],
    'bids' => ['/transparency/bids', 'public/transparency'],
    'reports' => ['/transparency/reports', 'public/transparency'],
    'contact' => ['/contact', 'public/contact'],
    'news' => ['/news', 'public/news/index'],
    'careers placeholder' => ['/careers', 'public/coming-soon'],
    'tourism placeholder' => ['/tourism', 'public/coming-soon'],
    'achievements placeholder' => ['/achievements', 'public/coming-soon'],
    'barangays placeholder' => ['/barangays', 'public/coming-soon'],
]);

it('redirects the About overview to the history page', function () {
    $this->get(route('about'))
        ->assertRedirect(route('about.history'));
});

it('paginates published news and excludes drafts and unpublished records', function () {
    foreach (range(0, 9) as $index) {
        News::query()->create([
            'title' => "Published news {$index}",
            'slug' => "published-news-{$index}",
            'content' => 'Published content',
            'status' => 'published',
            'published_at' => now()->subDays($index),
        ]);
    }

    News::query()->create([
        'title' => 'Draft news',
        'slug' => 'draft-news',
        'content' => 'Draft content',
        'status' => 'draft',
        'published_at' => now(),
    ]);

    News::query()->create([
        'title' => 'Unpublished news',
        'slug' => 'unpublished-news',
        'content' => 'Unpublished content',
        'status' => 'published',
        'published_at' => null,
    ]);

    $this->get(route('news.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/news/index')
            ->has('news.data', 9)
            ->where('news.total', 10)
            ->where('news.data.0.title', 'Published news 0'));
});

it('renders a published news article and hides draft articles', function () {
    $publishedNews = News::query()->create([
        'title' => 'Published article',
        'slug' => 'published-article',
        'content' => 'Article body',
        'status' => 'published',
        'published_at' => now(),
    ]);

    News::query()->create([
        'title' => 'Draft article',
        'slug' => 'draft-article',
        'content' => 'Draft body',
        'status' => 'draft',
        'published_at' => now(),
    ]);

    $this->get(route('news.show', $publishedNews->slug))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/news/show')
            ->where('news.title', 'Published article'));

    $this->get(route('news.show', 'draft-article'))
        ->assertNotFound();
});

it('renders a barangay profile by slug and returns 404 for unknown slugs', function () {
    $barangay = Barangay::query()->create([
        'name' => 'Molopolo',
        'slug' => 'molopolo',
        'population' => 3200,
        'captain' => 'Juan Dela Cruz',
        'contact' => '0917 000 0000',
        'latitude' => '6.7500000',
        'longitude' => '125.2500000',
        'order' => 1,
    ]);

    $this->get(route('barangays.show', $barangay->slug))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/barangays/show')
            ->where('barangay.name', 'Molopolo')
            ->where('barangay.slug', 'molopolo'));

    $this->get(route('barangays.show', 'unknown-barangay'))
        ->assertNotFound();
});
