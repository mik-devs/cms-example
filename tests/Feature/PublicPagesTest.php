<?php

use App\Models\Barangay;
use App\Models\News;
use App\Models\Official;
use App\Models\TourismSpot;
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
    'government officials' => ['/government/officials', 'public/elected-officials'],
    'sangguniang bayan' => ['/government/sangguniang-bayan', 'public/sangguniang-bayan'],
    'citizens charter' => ['/government/citizens-charter', 'public/government'],
    'directories' => ['/government/directories', 'public/government'],
    'services' => ['/services', 'public/services'],
    'transparency' => ['/transparency', 'public/transparency'],
    'bids' => ['/transparency/bids', 'public/transparency'],
    'reports' => ['/transparency/reports', 'public/transparency'],
    'contact' => ['/contact', 'public/contact'],
    'news' => ['/news', 'public/news/index'],
    'careers placeholder' => ['/careers', 'public/coming-soon'],
    'tourism' => ['/tourism', 'public/tourism/index'],
    'achievements placeholder' => ['/achievements', 'public/coming-soon'],
    'barangays placeholder' => ['/barangays', 'public/coming-soon'],
]);

it('groups elected officials by position on the elected officials page', function () {
    Official::query()->create([
        'name' => 'Maria Mayor',
        'position' => 'Municipal Mayor',
        'order' => 1,
    ]);

    Official::query()->create([
        'name' => 'Vicente Vice',
        'position' => 'Vice Mayor',
        'order' => 2,
    ]);

    Official::query()->create([
        'name' => 'SB Member',
        'position' => 'Sangguniang Bayan Member',
        'order' => 3,
    ]);

    Official::query()->create([
        'name' => 'Councilor',
        'position' => 'councilor',
        'order' => 4,
    ]);

    Official::query()->create([
        'name' => 'Treasurer',
        'position' => 'Municipal Treasurer',
        'order' => 5,
    ]);

    $this->get(route('government.officials'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/elected-officials')
            ->where('mayor.name', 'Maria Mayor')
            ->where('viceMayor.name', 'Vicente Vice')
            ->has('members', 2)
            ->where('members.0.name', 'SB Member')
            ->where('members.1.name', 'Councilor'));
});

it('shows only the vice mayor and legislative members on the Sangguniang Bayan page', function () {
    Official::query()->create([
        'name' => 'Municipal Mayor',
        'position' => 'Municipal Mayor',
        'order' => 1,
    ]);

    Official::query()->create([
        'name' => 'Presiding Vice Mayor',
        'position' => 'Vice Mayor',
        'order' => 2,
    ]);

    Official::query()->create([
        'name' => 'Council Member',
        'position' => 'Sangguniang Bayan Member',
        'order' => 3,
    ]);

    $this->get(route('government.sangguniang-bayan'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/sangguniang-bayan')
            ->where('viceMayor.name', 'Presiding Vice Mayor')
            ->has('members', 1)
            ->where('members.0.name', 'Council Member')
            ->missing('mayor'));
});

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

it('lists active tourism spots in order and hides inactive spots', function () {
    TourismSpot::query()->create([
        'name' => 'Pandong Bato Peak',
        'slug' => 'pandong-bato-peak',
        'description' => 'A scenic peak and trail.',
        'image' => '/tourism/peak.jpg',
        'category' => 'Eco-Adventure',
        'order' => 2,
        'is_active' => true,
    ]);

    TourismSpot::query()->create([
        'name' => 'Lawayan Falls',
        'slug' => 'lawayan-falls',
        'description' => 'A natural waterfall in Kiblawan.',
        'image' => '/tourism/lawayan.jpg',
        'category' => 'Waterfalls',
        'order' => 1,
        'is_active' => true,
    ]);

    TourismSpot::query()->create([
        'name' => 'Hidden Falls',
        'slug' => 'hidden-falls',
        'description' => 'An inactive tourism spot.',
        'image' => '/tourism/hidden.jpg',
        'category' => 'Waterfalls',
        'order' => 3,
        'is_active' => false,
    ]);

    $this->get(route('tourism'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/tourism/index')
            ->has('spots', 2)
            ->where('spots.0.name', 'Lawayan Falls')
            ->where('spots.1.name', 'Pandong Bato Peak'));
});

it('renders active tourism details and hides inactive or unknown spots', function () {
    $activeSpot = TourismSpot::query()->create([
        'name' => 'Lawayan Falls',
        'slug' => 'lawayan-falls',
        'description' => 'A natural waterfall in Kiblawan.',
        'image' => '/tourism/lawayan.jpg',
        'category' => 'Waterfalls',
        'order' => 1,
        'is_active' => true,
    ]);

    $activeSpot->images()->createMany([
        [
            'image_path' => 'tourism/gallery/second.jpg',
            'order' => 2,
        ],
        [
            'image_path' => 'tourism/gallery/first.jpg',
            'order' => 1,
        ],
    ]);

    TourismSpot::query()->create([
        'name' => 'Hidden Falls',
        'slug' => 'hidden-falls',
        'description' => 'An inactive tourism spot.',
        'image' => '/tourism/hidden.jpg',
        'category' => 'Waterfalls',
        'order' => 2,
        'is_active' => false,
    ]);

    $this->get(route('tourism.show', $activeSpot->slug))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/tourism/show')
            ->where('spot.name', 'Lawayan Falls')
            ->where('spot.slug', 'lawayan-falls')
            ->has('spot.images', 2)
            ->where('spot.images.0.image_path', 'tourism/gallery/first.jpg')
            ->where('spot.images.1.image_path', 'tourism/gallery/second.jpg'));

    $this->get(route('tourism.show', 'hidden-falls'))
        ->assertNotFound();

    $this->get(route('tourism.show', 'unknown-spot'))
        ->assertNotFound();
});
