<?php

use App\Models\CitizenCharter;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

it('creates updates and deletes citizen charter PDF documents', function () {
    Storage::fake('public');
    $this->actingAs(superAdminUser());

    $this->post(route('admin.citizen-charters.store'), [
        'title' => "Mayor's Citizen Charter",
        'description' => 'Official Citizen’s Charter for transacting with the LGU.',
        'file_path' => UploadedFile::fake()->create('charter.pdf', 120, 'application/pdf'),
        'order' => 1,
    ])->assertRedirect(route('admin.citizen-charters.index'));

    $charter = CitizenCharter::query()->firstOrFail();
    $originalFile = $charter->file_path;

    expect($charter->file_path)->toStartWith('charters/');
    Storage::disk('public')->assertExists($originalFile);

    $this->get(route('admin.citizen-charters.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/citizen-charters/index'));

    $this->get(route('admin.citizen-charters.create'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/citizen-charters/create'));

    $this->get(route('admin.citizen-charters.edit', $charter))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/citizen-charters/edit'));

    $this->put(route('admin.citizen-charters.update', $charter), [
        'title' => 'Updated Citizen Charter',
        'description' => 'An updated charter for the municipality.',
        'file_path' => null,
        'order' => 2,
    ])->assertRedirect(route('admin.citizen-charters.index'));

    $charter->refresh();

    expect($charter->title)->toBe('Updated Citizen Charter');
    expect($charter->file_path)->toBe($originalFile);
    expect($charter->order)->toBe(2);

    $this->delete(route('admin.citizen-charters.destroy', $charter))
        ->assertRedirect(route('admin.citizen-charters.index'));

    $this->assertDatabaseMissing('citizen_charters', ['id' => $charter->id]);
    Storage::disk('public')->assertMissing($originalFile);
});

it('requires a pdf when creating a citizen charter', function () {
    Storage::fake('public');
    $this->actingAs(superAdminUser());

    $this->post(route('admin.citizen-charters.store'), [
        'title' => 'Missing Document',
        'description' => 'Requires a PDF.',
        'order' => 1,
    ])->assertSessionHasErrors([
        'file_path' => 'The file path field is required.',
    ]);

    $this->assertDatabaseCount('citizen_charters', 0);
});
