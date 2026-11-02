<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = collect([
            'manage users',
            'manage settings',
            'manage news',
            'manage officials',
            'manage bids',
            'manage reports',
            'manage tourism',
            'manage jobs',
            'manage services',
            'manage hero',
            'manage stats',
            'manage emergency',
            'manage achievements',
        ])->map(fn (string $name): Permission => Permission::findOrCreate($name, 'web'));

        $rolePermissions = [
            'super_admin' => $permissions,
            'admin' => $permissions->reject(fn (Permission $permission): bool => $permission->name === 'manage users'),
            'editor' => $permissions->filter(
                fn (Permission $permission): bool => in_array($permission->name, ['manage news', 'manage achievements'], true),
            ),
        ];

        foreach ($rolePermissions as $roleName => $rolePermissionSet) {
            Role::findOrCreate($roleName, 'web')
                ->syncPermissions($rolePermissionSet);
        }
    }
}
