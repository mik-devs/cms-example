<?php

use App\Models\Office;
use Inertia\Testing\AssertableInertia as Assert;

it('creates updates and deletes offices shown on the directories page', function () {
    $this->actingAs(superAdminUser());

    $this->post(route('admin.offices.store'), [
        'name' => 'Office of the Municipal Mayor',
        'head' => 'Municipal Mayor',
        'contact_number' => '(082) 000-0000',
        'email' => 'mayor@kiblawan.example.gov.ph',
        'location' => 'Kiblawan Municipal Hall',
        'order' => 1,
        'is_active' => true,
    ])->assertRedirect(route('admin.offices.index'));

    $office = Office::query()->firstOrFail();

    expect($office->name)->toBe('Office of the Municipal Mayor')
        ->and($office->is_active)->toBeTrue();

    $this->get(route('admin.offices.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/offices/index'));
    $this->get(route('admin.offices.create'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/offices/create'));
    $this->get(route('admin.offices.edit', $office))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/offices/edit'));

    $this->put(route('admin.offices.update', $office), [
        'name' => "Treasurer's Office",
        'head' => 'Municipal Treasurer',
        'contact_number' => '(082) 000-0001',
        'email' => 'treasurer@kiblawan.example.gov.ph',
        'location' => 'Kiblawan Municipal Hall',
        'order' => 2,
        'is_active' => false,
    ])->assertRedirect(route('admin.offices.index'));

    $office->refresh();

    expect($office->name)->toBe("Treasurer's Office")
        ->and($office->is_active)->toBeFalse()
        ->and($office->order)->toBe(2);

    $this->delete(route('admin.offices.destroy', $office))
        ->assertRedirect(route('admin.offices.index'));

    $this->assertDatabaseMissing('offices', ['id' => $office->id]);
});

it('requires an office name and valid email', function () {
    $this->actingAs(superAdminUser());

    $this->post(route('admin.offices.store'), [
        'name' => '',
        'head' => 'Municipal Mayor',
        'email' => 'not-an-email',
        'order' => 1,
    ])->assertSessionHasErrors([
        'name' => 'The name field is required.',
        'email' => 'The email field must be a valid email address.',
    ]);

    $this->assertDatabaseCount('offices', 0);
});
