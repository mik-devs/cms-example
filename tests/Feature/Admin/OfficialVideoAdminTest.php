<?php

use App\Models\OfficialVideo;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

it('requires authentication and permission to access official videos CMS', function () {
    $this->get('/admin/videos')->assertRedirect(route('login'));

    $this->actingAs(User::factory()->unverified()->create())
        ->get('/admin/videos')
        ->assertRedirect(route('verification.notice'));

    $userWithoutPermission = User::factory()->create();
    $this->actingAs($userWithoutPermission)
        ->get('/admin/videos')
        ->assertForbidden();
});

it('renders official videos index, create, and edit pages', function () {
    $this->actingAs(superAdminUser());

    $video = OfficialVideo::query()->create([
        'title' => 'Test Video',
        'video_file' => 'videos/test.mp4',
        'order' => 1,
        'is_active' => true,
    ]);

    $this->get(route('admin.videos.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/videos/index'));

    $this->get(route('admin.videos.create'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/videos/create'));

    $this->get(route('admin.videos.edit', $video))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/videos/edit'));
});

it('can store, update, and delete official videos with mp4 file uploads', function () {
    Storage::fake('public');
    $this->actingAs(superAdminUser());

    $file = UploadedFile::fake()->create('sample.mp4', 5000, 'video/mp4');

    $this->post(route('admin.videos.store'), [
        'title' => 'New Promo Video',
        'video_file' => $file,
        'order' => 1,
        'is_active' => true,
    ])->assertRedirect(route('admin.videos.index'));

    $video = OfficialVideo::query()->where('title', 'New Promo Video')->firstOrFail();
    expect($video->order)->toBe(1)
        ->and($video->is_active)->toBeTrue();

    Storage::disk('public')->assertExists($video->video_file);
    $firstVideoPath = $video->video_file;

    // Update without changing video file
    $this->put(route('admin.videos.update', $video), [
        'title' => 'Renamed Promo Video',
        'order' => 2,
        'is_active' => false,
    ])->assertRedirect(route('admin.videos.index'));

    $video->refresh();
    expect($video->title)->toBe('Renamed Promo Video')
        ->and($video->order)->toBe(2)
        ->and($video->is_active)->toBeFalse()
        ->and($video->video_file)->toBe($firstVideoPath);

    // Update with replacement video file
    $replacementFile = UploadedFile::fake()->create('replacement.mp4', 6000, 'video/mp4');
    $this->put(route('admin.videos.update', $video), [
        'title' => 'Replacement Promo Video',
        'video_file' => $replacementFile,
        'order' => 3,
        'is_active' => true,
    ])->assertRedirect(route('admin.videos.index'));

    $video->refresh();
    expect($video->title)->toBe('Replacement Promo Video')
        ->and($video->order)->toBe(3)
        ->and($video->is_active)->toBeTrue();

    Storage::disk('public')->assertMissing($firstVideoPath);
    Storage::disk('public')->assertExists($video->video_file);

    $finalVideoPath = $video->video_file;

    // Delete
    $this->delete(route('admin.videos.destroy', $video))
        ->assertRedirect(route('admin.videos.index'));

    $this->assertDatabaseMissing('official_videos', ['id' => $video->id]);
    Storage::disk('public')->assertMissing($finalVideoPath);
});

it('passes official videos to the public home page', function () {
    OfficialVideo::query()->delete();

    OfficialVideo::query()->create([
        'title' => 'First Active Video',
        'video_file' => '/video/test1.mp4',
        'order' => 2,
        'is_active' => true,
    ]);

    OfficialVideo::query()->create([
        'title' => 'Priority Active Video',
        'video_file' => '/video/test0.mp4',
        'order' => 1,
        'is_active' => true,
    ]);

    OfficialVideo::query()->create([
        'title' => 'Inactive Video',
        'video_file' => '/video/inactive.mp4',
        'order' => 0,
        'is_active' => false,
    ]);

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(
            fn (Assert $page) => $page
                ->component('public/home')
                ->has('officialVideos', 2)
                ->where('officialVideos.0.title', 'Priority Active Video')
                ->where('officialVideos.1.title', 'First Active Video')
        );
});

