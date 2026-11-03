<?php

use App\Models\EmergencyContact;
use App\Models\TourismSpot;
use App\Models\TourismSpotImage;
use App\Models\User;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

it('requires authentication and verification for tourism and emergency contacts', function (string $path) {
    $this->get($path)->assertRedirect(route('login'));

    $this->actingAs(User::factory()->unverified()->create())
        ->get($path)
        ->assertRedirect(route('verification.notice'));
})->with([
    'tourism' => ['/admin/tourism'],
    'emergency contacts' => ['/admin/emergency-contacts'],
]);

it('renders tourism and emergency contact management pages', function () {
    $this->actingAs(superAdminUser());

    $tourismSpot = TourismSpot::query()->create([
        'name' => 'Mt. Apo View',
        'slug' => 'mt-apo-view',
        'description' => 'A scenic viewpoint.',
        'image' => 'tourism/mt-apo-view.jpg',
        'category' => 'Nature',
        'order' => 1,
        'is_active' => true,
    ]);
    $emergencyContact = EmergencyContact::query()->create([
        'name' => 'Police Station',
        'phone' => '911',
        'icon' => 'shield',
        'description' => 'Emergency police assistance.',
        'order' => 1,
        'is_active' => true,
    ]);

    $this->get(route('admin.tourism.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/tourism/index'));
    $this->get(route('admin.tourism.create'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/tourism/create'));
    $this->get(route('admin.tourism.edit', $tourismSpot))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/tourism/edit'));

    $this->get(route('admin.emergency-contacts.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/emergency-contacts/index'));
    $this->get(route('admin.emergency-contacts.create'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/emergency-contacts/create'));
    $this->get(route('admin.emergency-contacts.edit', $emergencyContact))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/emergency-contacts/edit'));
});

it('creates updates and deletes tourism spots with their images', function () {
    Storage::fake('public');
    $this->actingAs(superAdminUser());

    $this->post(route('admin.tourism.store'), [
        'name' => 'Mt. Apo View',
        'slug' => 'mt-apo-view',
        'description' => 'A scenic viewpoint.',
        'category' => 'Nature',
        'latitude' => 6.5348513,
        'longitude' => 125.2345303,
        'image' => UploadedFile::fake()->image('mt-apo-view.jpg'),
        'images' => [
            UploadedFile::fake()->image('gallery-one.jpg'),
            UploadedFile::fake()->image('gallery-two.jpg'),
        ],
        'order' => 1,
        'is_active' => true,
    ])->assertRedirect(route('admin.tourism.index'));

    $tourismSpot = TourismSpot::query()->firstOrFail();
    $originalImage = $tourismSpot->image;

    expect($tourismSpot->slug)->toBe('mt-apo-view');
    expect($tourismSpot->latitude)->toBe('6.5348513');
    expect($tourismSpot->longitude)->toBe('125.2345303');
    expect($originalImage)->toStartWith('tourism/');
    Storage::disk('public')->assertExists($originalImage);

    $galleryImages = $tourismSpot->images()->get();

    expect($galleryImages)->toHaveCount(2);
    expect($galleryImages->pluck('order')->all())->toBe([1, 2]);

    foreach ($galleryImages as $galleryImage) {
        expect($galleryImage->image_path)->toStartWith('tourism/gallery/');
        Storage::disk('public')->assertExists($galleryImage->image_path);
    }

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/home')
            ->where('tourismSpots.0.name', 'Mt. Apo View'));

    $this->put(route('admin.tourism.update', $tourismSpot), [
        'name' => 'Mt. Apo Viewpoint',
        'slug' => 'mt-apo-view',
        'description' => 'An updated scenic viewpoint.',
        'category' => 'Adventure',
        'latitude' => 6.6500,
        'longitude' => 125.2000,
        'order' => 2,
        'is_active' => true,
        'image' => UploadedFile::fake()->image('replacement.jpg'),
        'images' => [UploadedFile::fake()->image('gallery-three.jpg')],
        'remove_images' => [$galleryImages->first()->id],
    ])->assertRedirect(route('admin.tourism.index'));

    $tourismSpot->refresh();

    expect($tourismSpot->name)->toBe('Mt. Apo Viewpoint');
    expect($tourismSpot->slug)->toBe('mt-apo-view');
    expect($tourismSpot->latitude)->toBe('6.6500000');
    expect($tourismSpot->longitude)->toBe('125.2000000');
    Storage::disk('public')->assertMissing($originalImage);
    Storage::disk('public')->assertExists($tourismSpot->image);

    $removedGalleryImage = $galleryImages->first();
    $remainingGalleryImage = $galleryImages->last();

    expect($tourismSpot->images()->count())->toBe(2);
    expect(TourismSpotImage::query()->find($removedGalleryImage->id))->toBeNull();
    expect(Storage::disk('public')->exists($removedGalleryImage->image_path))->toBeFalse();
    expect(TourismSpotImage::query()->find($remainingGalleryImage->id))->not->toBeNull();
    Storage::disk('public')->assertExists($remainingGalleryImage->image_path);

    $addedGalleryImage = $tourismSpot->images()->where('order', 3)->firstOrFail();
    Storage::disk('public')->assertExists($addedGalleryImage->image_path);

    $this->delete(route('admin.tourism.images.destroy', $remainingGalleryImage))
        ->assertRedirect();

    expect(TourismSpotImage::query()->find($remainingGalleryImage->id))->toBeNull();
    expect(Storage::disk('public')->exists($remainingGalleryImage->image_path))->toBeFalse();
    expect($tourismSpot->images()->count())->toBe(1);

    $replacementImage = $tourismSpot->image;
    $galleryPaths = $tourismSpot->images()->pluck('image_path')->all();

    $this->delete(route('admin.tourism.destroy', $tourismSpot))
        ->assertRedirect(route('admin.tourism.index'));

    $this->assertDatabaseMissing('tourism_spots', ['id' => $tourismSpot->id]);
    $this->assertDatabaseCount('tourism_spot_images', 0);
    Storage::disk('public')->assertMissing($replacementImage);

    foreach ($galleryPaths as $galleryPath) {
        Storage::disk('public')->assertMissing($galleryPath);
    }
});

it('updates a tourism spot without uploading a new main image', function () {
    Storage::fake('public');
    $this->actingAs(superAdminUser());

    $this->post(route('admin.tourism.store'), [
        'name' => 'Lawayan Falls',
        'slug' => 'lawayan-falls',
        'description' => 'A natural waterfall in Kiblawan.',
        'category' => 'Waterfalls',
        'image' => UploadedFile::fake()->image('lawayan.jpg'),
        'order' => 1,
        'is_active' => true,
    ])->assertRedirect(route('admin.tourism.index'));

    $tourismSpot = TourismSpot::query()->firstOrFail();
    $originalImage = $tourismSpot->image;

    $this->put(route('admin.tourism.update', $tourismSpot), [
        'name' => 'Lawayan Falls Updated',
        'slug' => 'lawayan-falls',
        'description' => 'An updated natural waterfall in Kiblawan.',
        'category' => 'Waterfalls',
        'image' => null,
        'order' => 2,
        'is_active' => true,
    ])->assertRedirect(route('admin.tourism.index'));

    $tourismSpot->refresh();

    expect($tourismSpot->name)->toBe('Lawayan Falls Updated');
    expect($tourismSpot->image)->toBe($originalImage);
});

it('creates updates and deletes emergency contacts shown on the home page', function () {
    $this->actingAs(superAdminUser());

    $this->post(route('admin.emergency-contacts.store'), [
        'name' => 'Police Station',
        'phone' => '911',
        'icon' => 'shield',
        'description' => 'Emergency police assistance.',
        'order' => 1,
        'is_active' => true,
    ])->assertRedirect(route('admin.emergency-contacts.index'));

    $emergencyContact = EmergencyContact::query()->firstOrFail();
    $this->assertModelExists($emergencyContact);

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/home')
            ->where('emergencyContacts.0.name', 'Police Station'));

    $this->put(route('admin.emergency-contacts.update', $emergencyContact), [
        'name' => 'Fire Station',
        'phone' => '911',
        'icon' => 'flame',
        'description' => 'Emergency fire assistance.',
        'order' => 0,
        'is_active' => false,
    ])->assertRedirect(route('admin.emergency-contacts.index'));

    $emergencyContact->refresh();

    expect($emergencyContact->name)->toBe('Fire Station');
    expect($emergencyContact->is_active)->toBeFalse();

    $this->delete(route('admin.emergency-contacts.destroy', $emergencyContact))
        ->assertRedirect(route('admin.emergency-contacts.index'));

    $this->assertDatabaseMissing('emergency_contacts', ['id' => $emergencyContact->id]);
});

it('requires an image and unique slug when creating a tourism spot', function () {
    $this->actingAs(superAdminUser());

    TourismSpot::query()->create([
        'name' => 'Existing Spot',
        'slug' => 'existing-spot',
        'description' => 'Existing description.',
        'image' => 'tourism/existing-spot.jpg',
        'order' => 1,
        'is_active' => true,
    ]);

    $this->post(route('admin.tourism.store'), [
        'name' => 'Existing Spot',
        'slug' => 'existing-spot',
        'description' => 'Another description.',
        'category' => 'Nature',
        'order' => 2,
    ])->assertSessionHasErrors([
        'image' => 'The image field is required.',
        'slug' => 'The slug has already been taken.',
    ]);

    $this->assertDatabaseCount('tourism_spots', 1);
});

it('forbids editors from managing tourism and emergency contacts', function () {
    $this->seed(RolePermissionSeeder::class);

    $editor = User::factory()->create();
    $editor->assignRole('editor');

    $this->actingAs($editor)
        ->get(route('admin.tourism.index'))
        ->assertForbidden();

    $this->get(route('admin.emergency-contacts.index'))
        ->assertForbidden();
});
