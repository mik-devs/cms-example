<?php

use App\Models\User;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;

it('seeds the configured roles, permissions, and department test users', function () {
    $this->seed(RolePermissionSeeder::class);

    $allPermissions = [
        'access internal chat',
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
        'manage transparency',
        'manage users',
    ];

    $this->assertDatabaseCount('permissions', 15);
    $this->assertDatabaseCount('roles', 6);

    expect(Role::findByName('super_admin', 'web')->permissions->pluck('name')->sort()->values()->all())
        ->toBe($allPermissions);
    expect(Role::findByName('admin', 'web')->permissions->pluck('name')->sort()->values()->all())
        ->toBe($allPermissions);
    expect(Role::findByName('editor', 'web')->permissions->pluck('name')->sort()->values()->all())
        ->toBe(['manage achievements', 'manage news']);
    expect(Role::findByName('department', 'web')->permissions->pluck('name')->sort()->values()->all())
        ->toBe(['access internal chat', 'manage news', 'manage transparency']);
    expect(Role::findByName('hr', 'web')->permissions->pluck('name')->sort()->values()->all())
        ->toBe(['access internal chat', 'manage jobs']);
    expect(Role::findByName('legislative', 'web')->permissions->pluck('name')->sort()->values()->all())
        ->toBe(['access internal chat', 'manage jobs', 'manage transparency']);

    $dept = User::query()->where('email', 'dept@kiblawan.gov.ph')->firstOrFail();
    $hr = User::query()->where('email', 'hr@kiblawan.gov.ph')->firstOrFail();
    $sb = User::query()->where('email', 'sb@kiblawan.gov.ph')->firstOrFail();

    expect($dept->hasRole('department'))->toBeTrue();
    expect($hr->hasRole('hr'))->toBeTrue();
    expect($sb->hasRole('legislative'))->toBeTrue();

    expect($dept->email_verified_at)->not->toBeNull();
    expect(Hash::check('password', $dept->password))->toBeTrue();
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

it('enforces department role permissions on admin routes', function () {
    $this->withoutVite();
    $this->seed(RolePermissionSeeder::class);

    $dept = User::query()->where('email', 'dept@kiblawan.gov.ph')->firstOrFail();

    $this->actingAs($dept);

    $this->get(route('admin.news.index'))->assertOk();
    $this->get(route('admin.bids.index'))->assertOk();
    $this->get(route('admin.annual-reports.index'))->assertOk();
    $this->get(route('admin.chat.index'))->assertOk();
    $this->get(route('admin.jobs.index'))->assertForbidden();
});

it('enforces hr and legislative role permissions on admin routes', function () {
    $this->withoutVite();
    $this->seed(RolePermissionSeeder::class);

    $hr = User::query()->where('email', 'hr@kiblawan.gov.ph')->firstOrFail();

    $this->actingAs($hr);
    $this->get(route('admin.jobs.index'))->assertOk();
    $this->get(route('admin.chat.index'))->assertOk();
    $this->get(route('admin.news.index'))->assertForbidden();
    $this->get(route('admin.bids.index'))->assertForbidden();

    $sb = User::query()->where('email', 'sb@kiblawan.gov.ph')->firstOrFail();

    $this->actingAs($sb);
    $this->get(route('admin.jobs.index'))->assertOk();
    $this->get(route('admin.bids.index'))->assertOk();
    $this->get(route('admin.annual-reports.index'))->assertOk();
    $this->get(route('admin.chat.index'))->assertOk();
    $this->get(route('admin.news.index'))->assertForbidden();
});
