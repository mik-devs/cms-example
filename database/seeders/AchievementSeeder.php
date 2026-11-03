<?php

namespace Database\Seeders;

use App\Models\Achievement;
use Illuminate\Database\Seeder;

class AchievementSeeder extends Seeder
{
    public function run(): void
    {
        $images = ['/images/award/ideal.png', '/images/kib.png', '/tourism/spot.png', '/images/araw.png'];

        $achievements = [
            ['title' => '2025 LCPC Functionality Assessment - IDEAL Level of Functionality', 'description' => 'Congratulations to the Municipal Council for the Protection of Children for this outstanding achievement.', 'badge_year' => '2025'],
            ['title' => 'Seal of Good Local Governance', 'description' => 'Recognized for excellence in local governance, transparency, and public service.', 'badge_year' => '2026'],
            ['title' => '100% Barangay Connectivity', 'description' => 'Reached all barangays through the Serbisyo Caravan program.', 'badge_year' => '2025'],
            ['title' => 'Best Tourism Award', 'description' => 'Awarded for promoting sustainable and inclusive tourism in the region.', 'badge_year' => '2024'],
            ['title' => 'Green LGU Award', 'description' => 'Recognized for outstanding environmental protection and sustainability initiatives.', 'badge_year' => '2023'],
            ['title' => 'Top Performing LGU', 'description' => 'Awarded for high revenue collection efficiency and fiscal management.', 'badge_year' => '2022'],
            ['title' => 'Child-Friendly LGU', 'description' => "Committed to upholding children's rights and welfare programs.", 'badge_year' => '2021'],
        ];

        foreach ($achievements as $index => $achievement) {
            Achievement::query()->updateOrCreate(
                ['title' => $achievement['title']],
                $achievement + [
                    'image' => $images[$index % count($images)],
                    'order' => $index + 1,
                    'is_active' => true,
                ],
            );
        }
    }
}
