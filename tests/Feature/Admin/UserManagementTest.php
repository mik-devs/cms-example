<?php

use App\Models\User;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->withoutVite();
    $this->seed(RolePermissionSeeder::class);
});

it('restricts user management to super_admin', function () {
    $this->get(route('admin.users.index'))->assertRedirect(route('login'));

    $regularUser = User::factory()->create();
    $regularUser->assignRole('editor');

    $this->actingAs($regularUser)
        ->get(route('admin.users.index'))
        ->assertForbidden();

    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $this->actingAs($admin)
        ->get(route('admin.users.index'))
        ->assertForbidden();

    $superAdmin = User::factory()->create();
    $superAdmin->assignRole('super_admin');

    $this->actingAs($superAdmin)
        ->get(route('admin.users.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/users/index')
            ->has('users')
            ->has('roles')
            ->where('users', fn ($users) => collect($users)->every(fn ($u) => $u['id'] !== $superAdmin->id)));
});

it('allows super admin to create a staff user with role', function () {
    $superAdmin = User::factory()->create();
    $superAdmin->assignRole('super_admin');

    $this->actingAs($superAdmin)
        ->get(route('admin.users.create'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/users/create')
            ->has('roles'));

    $this->actingAs($superAdmin)
        ->post(route('admin.users.store'), [
            'name' => 'Maria Makiling',
            'email' => 'maria@kiblawan.gov.ph',
            'password' => 'SecurePass123!',
            'password_confirmation' => 'SecurePass123!',
            'role' => 'tourism',
        ])
        ->assertRedirect(route('admin.users.index'));

    $newUser = User::query()->where('email', 'maria@kiblawan.gov.ph')->firstOrFail();
    expect($newUser->name)->toBe('Maria Makiling')
        ->and(Hash::check('SecurePass123!', $newUser->password))->toBeTrue()
        ->and($newUser->hasRole('tourism'))->toBeTrue();
});

it('allows super admin to edit user and update role and password', function () {
    $superAdmin = User::factory()->create();
    $superAdmin->assignRole('super_admin');

    $staff = User::factory()->create([
        'name' => 'Original Name',
        'email' => 'orig@kiblawan.gov.ph',
        'password' => Hash::make('OldPassword123!'),
    ]);
    $staff->assignRole('department');

    $this->actingAs($superAdmin)
        ->get(route('admin.users.edit', $staff))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/users/edit')
            ->where('user.id', $staff->id)
            ->has('roles'));

    $this->actingAs($superAdmin)
        ->put(route('admin.users.update', $staff), [
            'name' => 'Updated Name',
            'email' => 'updated@kiblawan.gov.ph',
            'password' => 'NewPassword123!',
            'password_confirmation' => 'NewPassword123!',
            'role' => 'hr',
        ])
        ->assertRedirect(route('admin.users.index'));

    $staff->refresh();
    expect($staff->name)->toBe('Updated Name')
        ->and($staff->email)->toBe('updated@kiblawan.gov.ph')
        ->and(Hash::check('NewPassword123!', $staff->password))->toBeTrue()
        ->and($staff->hasRole('hr'))->toBeTrue()
        ->and($staff->hasRole('department'))->toBeFalse();
});

it('prevents super admin from deleting themselves but allows deleting other users', function () {
    $superAdmin = User::factory()->create();
    $superAdmin->assignRole('super_admin');

    $this->actingAs($superAdmin)
        ->delete(route('admin.users.destroy', $superAdmin))
        ->assertRedirect();

    $this->assertDatabaseHas('users', ['id' => $superAdmin->id]);

    $staff = User::factory()->create();
    $staff->assignRole('department');

    $this->actingAs($superAdmin)
        ->delete(route('admin.users.destroy', $staff))
        ->assertRedirect(route('admin.users.index'));

    $this->assertDatabaseMissing('users', ['id' => $staff->id]);
});

it('validates password confirmation on user store and update', function () {
    $superAdmin = User::factory()->create();
    $superAdmin->assignRole('super_admin');

    $this->actingAs($superAdmin)
        ->from(route('admin.users.create'))
        ->post(route('admin.users.store'), [
            'name' => 'Bad Password Confirmation',
            'email' => 'badpass@kiblawan.gov.ph',
            'password' => 'SecurePass123!',
            'password_confirmation' => 'MismatchPass456!',
            'role' => 'editor',
        ])
        ->assertRedirect(route('admin.users.create'))
        ->assertSessionHasErrors(['password']);

    $staff = User::factory()->create();
    $staff->assignRole('editor');

    $this->actingAs($superAdmin)
        ->from(route('admin.users.edit', $staff))
        ->put(route('admin.users.update', $staff), [
            'name' => 'Update With Mismatch',
            'email' => $staff->email,
            'password' => 'NewPassword123!',
            'password_confirmation' => 'DifferentPassword!',
            'role' => 'editor',
        ])
        ->assertRedirect(route('admin.users.edit', $staff))
        ->assertSessionHasErrors(['password']);
});
