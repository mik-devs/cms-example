<?php

namespace Database\Seeders;

use App\Models\TourismSpot;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TourismSpotSeeder extends Seeder
{
    public function run(): void
    {
        $spots = [
            ['name' => 'Majestic Waterfalls', 'description' => 'Experience the cool waters and lush forests.', 'image' => '/tourism/spot.png', 'category' => 'Nature'],
            ['name' => 'Mt. Apo Foothills', 'description' => 'Breathtaking trails and panoramic views.', 'image' => '/images/kib.png', 'category' => 'Adventure'],
            ['name' => 'Rich Culture', 'description' => 'Vibrant festivals and warm hospitality.', 'image' => '/images/araw.png', 'category' => 'Culture'],
        ];

        foreach ($spots as $index => $spot) {
            TourismSpot::query()->updateOrCreate(
                ['slug' => Str::slug($spot['name'])],
                [
                    'name' => $spot['name'],
                    'slug' => Str::slug($spot['name']),
                    'description' => $spot['description'],
                    'image' => $spot['image'],
                    'category' => $spot['category'],
                    'order' => $index + 1,
                    'is_active' => true,
                ],
            );
        }
    }
}
