<?php

namespace Database\Seeders;

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
        $this->call([
            RolePermissionSeeder::class,
            SettingSeeder::class,
            OfficialSeeder::class,
            CitizenCharterSeeder::class,
            OfficeSeeder::class,
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
