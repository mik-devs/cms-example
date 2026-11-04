<?php

use App\Models\Barangay;
use App\Models\HeroSlide;
use App\Models\Setting;
use App\Models\Stat;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

it('requires authentication and verification for each new admin module', function (string $path) {
    $this->get($path)->assertRedirect(route('login'));

    $this->actingAs(User::factory()->unverified()->create())
        ->get($path)
        ->assertRedirect(route('verification.notice'));
})->with([
    'barangays' => ['/admin/barangays'],
    'hero slides' => ['/admin/hero-slides'],
    'stats' => ['/admin/stats'],
    'settings' => ['/admin/settings'],
]);

it('renders each new admin module page', function () {
    $this->actingAs(superAdminUser());
    $barangay = Barangay::query()->create([
        'name' => 'Poblacion',
        'slug' => 'poblacion',
        'order' => 1,
    ]);
    $heroSlide = HeroSlide::query()->create([
        'title' => 'Community First',
        'image' => '/images/kib.png',
        'order' => 1,
    ]);
    $stat = Stat::query()->create([
        'label' => 'Population',
        'value' => 50000,
        'order' => 1,
    ]);
    Setting::query()->create([
        'key' => 'site_name',
        'value' => 'Municipality of Kiblawan',
    ]);

    $this->get(route('admin.barangays.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/barangays/index'));
    $this->get(route('admin.barangays.create'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/barangays/create'));
    $this->get(route('admin.barangays.edit', $barangay))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/barangays/edit'));

    $this->get(route('admin.hero-slides.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/hero-slides/index'));
    $this->get(route('admin.hero-slides.create'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/hero-slides/create'));
    $this->get(route('admin.hero-slides.edit', $heroSlide))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/hero-slides/edit'));

    $this->get(route('admin.stats.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/stats/index'));
    $this->get(route('admin.stats.create'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/stats/create'));
    $this->get(route('admin.stats.edit', $stat))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/stats/edit'));
    $this->get(route('admin.settings.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/settings/index'));
});

it('creates and updates barangays reflected on the home page', function () {
    $this->actingAs(superAdminUser());

    $this->post(route('admin.barangays.store'), [
        'name' => 'Poblacion',
        'population' => 12500,
        'captain' => 'Juan Dela Cruz',
        'contact' => '(082) 123-4567',
        'latitude' => 6.6765,
        'longitude' => 125.2345,
        'order' => 1,
    ])->assertRedirect(route('admin.barangays.index'));

    $barangay = Barangay::query()->firstOrFail();
    $this->assertModelExists($barangay);
    expect($barangay->slug)->toBe('poblacion');

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/home')
            ->where('barangays.0.name', 'Poblacion'));

    $this->put(route('admin.barangays.update', $barangay), [
        'name' => 'Poblacion Updated',
        'population' => 13000,
        'captain' => 'Maria Santos',
        'contact' => '(082) 987-6543',
        'latitude' => 6.677,
        'longitude' => 125.235,
        'order' => 0,
    ])->assertRedirect(route('admin.barangays.index'));

    $barangay->refresh();
    expect($barangay->name)->toBe('Poblacion Updated');
    expect($barangay->slug)->toBe('poblacion');

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/home')
            ->where('barangays.0.name', 'Poblacion Updated'));

    $this->delete(route('admin.barangays.destroy', $barangay))
        ->assertRedirect(route('admin.barangays.index'));

    $this->assertDatabaseMissing('barangays', ['id' => $barangay->id]);
});

it('stores and manages hero slide images used by the home page', function () {
    Storage::fake('public');
    $this->actingAs(superAdminUser());

    $this->post(route('admin.hero-slides.store'), [
        'kicker' => 'Community',
        'title' => 'A Stronger Kiblawan',
        'subtitle' => 'A united community driving sustainable progress.',
        'title_emphasis' => 'Kiblawan',
        'cta_text' => 'Explore Services',
        'cta_link' => '/services',
        'image' => UploadedFile::fake()->image('hero.png'),
        'order' => 1,
        'is_active' => true,
    ])->assertRedirect(route('admin.hero-slides.index'));

    $heroSlide = HeroSlide::query()->firstOrFail();
    $originalImage = $heroSlide->image;
    Storage::disk('public')->assertExists($originalImage);
    expect($originalImage)->toStartWith('hero/');

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/home')
            ->where('heroSlides.0.title', 'A Stronger Kiblawan')
            ->where('heroSlides.0.subtitle', 'A united community driving sustainable progress.')
            ->where('heroSlides.0.title_emphasis', 'Kiblawan')
            ->where('heroSlides.0.cta_text', 'Explore Services')
            ->where('heroSlides.0.cta_link', '/services')
            ->where('heroSlides.0.image_url', Storage::disk('public')->url($originalImage)));

    $this->put(route('admin.hero-slides.update', $heroSlide), [
        'kicker' => 'Updated',
        'title' => 'A Better Kiblawan',
        'subtitle' => 'A better community for all.',
        'title_emphasis' => 'Better',
        'cta_text' => 'Plan Your Visit',
        'cta_link' => '/tourism',
        'order' => 2,
        'is_active' => true,
    ])->assertRedirect(route('admin.hero-slides.index'));

    $heroSlide->refresh();
    expect($heroSlide->title)->toBe('A Better Kiblawan');
    expect($heroSlide->subtitle)->toBe('A better community for all.');
    expect($heroSlide->title_emphasis)->toBe('Better');
    expect($heroSlide->cta_text)->toBe('Plan Your Visit');
    expect($heroSlide->cta_link)->toBe('/tourism');
    expect($heroSlide->image)->toBe($originalImage);
    Storage::disk('public')->assertExists($originalImage);

    $this->put(route('admin.hero-slides.update', $heroSlide), [
        'kicker' => 'Updated',
        'title' => 'A Better Kiblawan',
        'image' => UploadedFile::fake()->image('replacement.png'),
        'order' => 2,
        'is_active' => true,
    ])->assertRedirect(route('admin.hero-slides.index'));

    $heroSlide->refresh();
    Storage::disk('public')->assertMissing($originalImage);
    Storage::disk('public')->assertExists($heroSlide->image);

    $replacementImage = $heroSlide->image;
    $this->delete(route('admin.hero-slides.destroy', $heroSlide))
        ->assertRedirect(route('admin.hero-slides.index'));

    $this->assertDatabaseMissing('hero_slides', ['id' => $heroSlide->id]);
    Storage::disk('public')->assertMissing($replacementImage);
});

it('creates and updates stats reflected on the home page', function () {
    $this->actingAs(superAdminUser());

    $this->post(route('admin.stats.store'), [
        'label' => 'Population',
        'value' => 52000,
        'suffix' => '+',
        'order' => 1,
        'is_active' => true,
    ])->assertRedirect(route('admin.stats.index'));

    $stat = Stat::query()->firstOrFail();
    $this->assertModelExists($stat);

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/home')
            ->where('stats.0.label', 'Population')
            ->where('stats.0.value', 52000));

    $this->put(route('admin.stats.update', $stat), [
        'label' => 'Residents',
        'value' => 53000,
        'suffix' => '',
        'order' => 0,
        'is_active' => true,
    ])->assertRedirect(route('admin.stats.index'));

    $stat->refresh();
    expect($stat->label)->toBe('Residents');
    expect($stat->value)->toBe(53000.0);

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/home')
            ->where('stats.0.label', 'Residents'));

    $this->delete(route('admin.stats.destroy', $stat))
        ->assertRedirect(route('admin.stats.index'));

    $this->assertDatabaseMissing('stats', ['id' => $stat->id]);
});

it('updates public settings shown in shared layout props and the home page', function () {
    $this->actingAs(superAdminUser());
    Setting::query()->create(['key' => 'site_name', 'value' => 'Old Site Name']);
    Setting::query()->create(['key' => 'tagline', 'value' => 'Old tagline']);

    $this->put(route('admin.settings.update'), [
        'site_name' => 'Kiblawan Municipal Government',
        'tagline' => 'Serving every community',
        'address' => 'Dagohoy Street, Barangay Poblacion, Kiblawan, Davao del Sur, Philippines',
        'phone' => '(082) 555-0123',
        'email' => 'hello@example.gov.ph',
        'office_hours' => 'Monday to Friday, 8 AM to 5 PM',
        'map_embed' => 'https://maps.google.com/maps/embed?query=Kiblawan',
        'unauthorized_setting' => 'must not be saved',
    ])->assertRedirect(route('admin.settings.index'));

    $this->assertDatabaseHas('settings', [
        'key' => 'site_name',
        'value' => 'Kiblawan Municipal Government',
    ]);
    $this->assertDatabaseMissing('settings', ['key' => 'unauthorized_setting']);

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/home')
            ->where('siteSettings.site_name', 'Kiblawan Municipal Government')
            ->where('siteSettings.tagline', 'Serving every community')
            ->where('siteSettings.address', 'Dagohoy Street, Barangay Poblacion, Kiblawan, Davao del Sur, Philippines')
            ->where('settings.site_name', 'Kiblawan Municipal Government'));
});

it('rejects a barangay when its generated slug already exists', function () {
    $this->actingAs(superAdminUser());

    Barangay::query()->create([
        'name' => 'Poblacion',
        'slug' => 'poblacion',
        'order' => 1,
    ]);

    $this->post(route('admin.barangays.store'), [
        'name' => 'Poblacion',
        'order' => 2,
    ])->assertSessionHasErrors([
        'slug' => 'The slug has already been taken.',
    ]);

    $this->assertDatabaseCount('barangays', 1);
});

it('requires an image when creating a hero slide', function () {
    $this->actingAs(superAdminUser())
        ->post(route('admin.hero-slides.store'), [
            'kicker' => 'Community',
            'title' => 'Missing image',
            'order' => 1,
        ])
        ->assertSessionHasErrors([
            'image' => 'The image field is required.',
        ]);

    $this->assertDatabaseCount('hero_slides', 0);
});

it('rejects invalid settings email and map embed URLs', function () {
    $this->actingAs(superAdminUser())
        ->put(route('admin.settings.update'), [
            'site_name' => 'Kiblawan',
            'tagline' => 'Serving the community',
            'email' => 'not-an-email',
            'map_embed' => 'not-a-url',
        ])
        ->assertSessionHasErrors([
            'email' => 'The email field must be a valid email address.',
            'map_embed' => 'The map embed field must be a valid URL.',
        ]);

    $this->assertDatabaseMissing('settings', ['key' => 'site_name']);
});

it('rejects map embeds hosted outside Google Maps', function () {
    $this->actingAs(superAdminUser())
        ->put(route('admin.settings.update'), [
            'site_name' => 'Kiblawan',
            'tagline' => 'Serving the community',
            'map_embed' => 'https://example.com/maps/embed?query=Kiblawan',
        ])
        ->assertSessionHasErrors([
            'map_embed' => 'The map embed field format is invalid.',
        ]);

    $this->assertDatabaseMissing('settings', ['key' => 'site_name']);
});
