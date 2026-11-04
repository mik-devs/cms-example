<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@kiblawan.gov.ph'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'),
            ],
        );

        if ($admin->email_verified_at === null) {
            $admin->forceFill(['email_verified_at' => now()])->save();
        }

        $superAdminRoleExists = Role::query()
            ->where('name', 'super_admin')
            ->where('guard_name', 'web')
            ->exists();

        if ($superAdminRoleExists && ! $admin->hasRole('super_admin')) {
            $admin->assignRole('super_admin');
        }
    }
}
