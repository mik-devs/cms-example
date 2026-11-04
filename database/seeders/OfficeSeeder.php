<?php

namespace Database\Seeders;

use App\Models\Office;
use Illuminate\Database\Seeder;

class OfficeSeeder extends Seeder
{
    public function run(): void
    {
        $offices = [
            ['name' => 'Office of the Municipal Mayor', 'head' => 'Municipal Mayor', 'contact_number' => '(082) 000-0000', 'email' => 'mayor@kiblawan.example.gov.ph', 'location' => 'Kiblawan Municipal Hall', 'order' => 1],
            ['name' => "Treasurer's Office", 'head' => 'Municipal Treasurer', 'contact_number' => '(082) 000-0001', 'email' => 'treasurer@kiblawan.example.gov.ph', 'location' => 'Kiblawan Municipal Hall', 'order' => 2],
            ['name' => 'Municipal Disaster Risk Reduction and Management Office (MDRRMO)', 'head' => 'MDRRMO Officer', 'contact_number' => '(082) 000-0002', 'email' => 'mdrrmo@kiblawan.example.gov.ph', 'location' => 'Kiblawan Municipal Hall', 'order' => 3],
            ['name' => 'Municipal Health Office', 'head' => 'Municipal Health Officer', 'contact_number' => '(082) 000-0003', 'email' => 'mho@kiblawan.example.gov.ph', 'location' => 'Kiblawan Municipal Health Office', 'order' => 4],
        ];

        foreach ($offices as $office) {
            Office::query()->updateOrCreate(
                ['name' => $office['name']],
                $office + ['is_active' => true],
            );
        }
    }
}
