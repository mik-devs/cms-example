<?php

namespace Database\Seeders;

use App\Models\EmergencyContact;
use Illuminate\Database\Seeder;

class EmergencyContactSeeder extends Seeder
{
    public function run(): void
    {
        $contacts = [
            ['name' => 'Office of the Municipal Mayor', 'phone' => '(082) 000-0000', 'icon' => 'Building2'],
            ['name' => 'PNP Kiblawan', 'phone' => '(0917) 000-0000', 'icon' => 'Shield'],
            ['name' => 'Kiblawan Rescue / MDRRMO', 'phone' => '(0917) 000-0000', 'icon' => 'Ambulance'],
        ];

        foreach ($contacts as $index => $contact) {
            EmergencyContact::query()->updateOrCreate(
                ['name' => $contact['name']],
                $contact + ['description' => null, 'order' => $index + 1, 'is_active' => true],
            );
        }
    }
}
