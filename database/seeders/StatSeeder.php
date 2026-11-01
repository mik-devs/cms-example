<?php

namespace Database\Seeders;

use App\Models\Stat;
use Illuminate\Database\Seeder;

class StatSeeder extends Seeder
{
    public function run(): void
    {
        $stats = [
            ['label' => 'Population', 'value' => 52400, 'suffix' => null],
            ['label' => 'Barangays', 'value' => 30, 'suffix' => null],
            ['label' => 'Land Area (km²)', 'value' => 293, 'suffix' => null],
            ['label' => 'Public Services', 'value' => 12, 'suffix' => null],
        ];

        foreach ($stats as $index => $stat) {
            Stat::query()->updateOrCreate(
                ['label' => $stat['label']],
                $stat + ['icon' => null, 'order' => $index + 1, 'is_active' => true],
            );
        }
    }
}
