<?php

namespace Database\Seeders;

use App\Models\Barangay;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BarangaySeeder extends Seeder
{
    public function run(): void
    {
        $barangays = [
            'Abnate',
            'Bagong Negros',
            'Bagong Silang',
            'Bagumbayan',
            'Balasiao',
            'Bonifacio',
            'Bunot',
            'Cogon-Bacaca',
            'Dapok',
            'Ihan',
            'Kibongbong',
            'Kimlawis',
            'Kisulan',
            'Lati-an',
            'Manual',
            'Maraga-a',
            'Molopolo',
            'New Sibonga',
            'Panaglib',
            'Pasig',
            'Poblacion',
            'Pocaleel',
            'San Isidro',
            'San Jose',
            'San Pedro',
            'Santo Niño',
            'Tacub',
            'Tacul',
            'Waterfall',
            'Bulol-Salo',
        ];

        foreach ($barangays as $index => $name) {
            Barangay::query()->updateOrCreate(
                ['slug' => Str::slug($name)],
                [
                    'name' => $name,
                    'population' => null,
                    'captain' => null,
                    'contact' => null,
                    'latitude' => null,
                    'longitude' => null,
                    'order' => $index + 1,
                ],
            );
        }
    }
}
