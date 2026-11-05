<?php

namespace Database\Seeders;

use App\Models\Official;
use Illuminate\Database\Seeder;

class OfficialSeeder extends Seeder
{
    public function run(): void
    {
        $officials = [
            [
                'name' => 'Hon. Carl Jason R. Rama',
                'position' => 'Municipal Mayor',
                'committee' => null,
                'order' => 1,
            ],
            [
                'name' => 'Hon. Joel D. Calma',
                'position' => 'Municipal Vice Mayor',
                'committee' => null,
                'order' => 2,
            ],
            [
                'name' => 'Hon. Maria Clara Santos',
                'position' => 'Sangguniang Bayan Member',
                'committee' => 'Committee on Finance',
                'order' => 3,
            ],
            [
                'name' => 'Hon. Roberto G. Dela Cruz',
                'position' => 'Sangguniang Bayan Member',
                'committee' => 'Committee on Education',
                'order' => 4,
            ],
            [
                'name' => 'Hon. Elena M. Bautista',
                'position' => 'Sangguniang Bayan Member',
                'committee' => 'Committee on Health',
                'order' => 5,
            ],
            [
                'name' => 'Hon. Danilo P. Reyes',
                'position' => 'Sangguniang Bayan Member',
                'committee' => 'Committee on Agriculture',
                'order' => 6,
            ],
            [
                'name' => 'Hon. Carmela T. Aquino',
                'position' => 'Sangguniang Bayan Member',
                'committee' => 'Committee on Infrastructure',
                'order' => 7,
            ],
            [
                'name' => 'Hon. Juanito V. Mendoza',
                'position' => 'Sangguniang Bayan Member',
                'committee' => 'Committee on Peace and Order',
                'order' => 8,
            ],
        ];

        foreach ($officials as $official) {
            Official::updateOrCreate(
                ['name' => $official['name']],
                $official,
            );
        }
    }
}
