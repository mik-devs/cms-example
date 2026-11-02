<?php

use App\Models\User;
use Database\Seeders\RolePermissionSeeder;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;

it('seeds the configured roles and permissions without creating users', function () {
    $this->seed(RolePermissionSeeder::class);

    $allPermissions = [
        'manage achievements',
        'manage bids',
        'manage emergency',
        'manage hero',
        'manage jobs',
        'manage news',
        'manage officials',
        'manage reports',
        'manage services',
        'manage settings',
        'manage stats',
        'manage tourism',
        'manage users',
    ];

    $this->assertDatabaseCount('permissions', 13);
    $this->assertDatabaseCount('roles', 3);

    expect(Role::findByName('super_admin', 'web')->permissions->pluck('name')->sort()->values()->all())
        ->toBe($allPermissions);
    expect(Role::findByName('admin', 'web')->permissions->pluck('name')->sort()->values()->all())
        ->toBe(array_values(array_diff($allPermissions, ['manage users'])));
    expect(Role::findByName('editor', 'web')->permissions->pluck('name')->sort()->values()->all())
        ->toBe(['manage achievements', 'manage news']);

    $this->assertDatabaseMissing('users', ['email' => 'admin@kiblawan.gov.ph']);
    $this->assertDatabaseMissing('users', ['email' => 'admin2@kiblawan.gov.ph']);
    $this->assertDatabaseMissing('users', ['email' => 'lgu@kiblawan.gov.ph']);
});

it('shares authorization data and enforces editor permissions on admin routes', function () {
    $this->seed(RolePermissionSeeder::class);

    $editor = User::factory()->create();
    $editor->assignRole('editor');

    $this->actingAs($editor)
        ->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('auth.user.roles', ['editor'])
            ->has('auth.user.permissions', 2)
            ->where('auth.user.permissions.0', 'manage achievements')
            ->where('auth.user.permissions.1', 'manage news'));

    $this->get(route('admin.news.index'))->assertOk();
    $this->get(route('admin.achievements.index'))->assertOk();
    $this->get(route('admin.services.index'))->assertForbidden();
    $this->get(route('admin.barangays.index'))->assertForbidden();
});
