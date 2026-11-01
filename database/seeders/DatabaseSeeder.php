<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->call([
            SettingSeeder::class,
            HeroSlideSeeder::class,
            StatSeeder::class,
            ServiceSeeder::class,
            BarangaySeeder::class,
            TourismSpotSeeder::class,
            AchievementSeeder::class,
            NewsSeeder::class,
            JobSeeder::class,
            EmergencyContactSeeder::class,
            BidSeeder::class,
            AnnualReportSeeder::class,
        ]);
    }
}
