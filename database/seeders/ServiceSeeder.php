<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            ['title' => 'Business Permits', 'description' => 'New & renewal of business licenses', 'icon' => 'Briefcase'],
            ['title' => 'Civil Registry', 'description' => 'Birth, marriage, and death certificates', 'icon' => 'FileText'],
            ['title' => 'Property & Tax', 'description' => 'Real property tax and assessment', 'icon' => 'Home'],
            ['title' => 'Health Services', 'description' => 'Medical assistance and check-ups', 'icon' => 'HeartPulse'],
            ['title' => 'Social Welfare', 'description' => 'Senior, PWD, and indigency aid', 'icon' => 'HeartHandshake'],
            ['title' => 'Agriculture', 'description' => 'Seeds, fertilizers, and farmer support', 'icon' => 'Sprout'],
            ['title' => 'Land & Building', 'description' => 'Construction permits and zoning', 'icon' => 'HardHat'],
            ['title' => 'Certificates', 'description' => 'Residency, indigency, clearances', 'icon' => 'Award'],
        ];

        foreach ($services as $index => $service) {
            Service::query()->updateOrCreate(
                ['title' => $service['title']],
                $service + ['link' => null, 'order' => $index + 1, 'is_active' => true],
            );
        }
    }
}
