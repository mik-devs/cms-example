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
                'order' => 1,
            ],
            [
                'name' => 'Hon. Joel D. Calma',
                'position' => 'Municipal Vice Mayor',
                'order' => 2,
            ],
        ];

        foreach ($officials as $official) {
            Official::updateOrCreate(
                ['position' => $official['position']],
                $official,
            );
        }
    }
}
