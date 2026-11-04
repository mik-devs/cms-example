<?php

namespace Database\Seeders;

use App\Models\CitizenCharter;
use Illuminate\Database\Seeder;

class CitizenCharterSeeder extends Seeder
{
    public function run(): void
    {
        CitizenCharter::query()->updateOrCreate(
            ['title' => "Municipality of Kiblawan Citizen's Charter"],
            [
                'description' => 'Official Citizen’s Charter for public transactions and service delivery.',
                'file_path' => 'charters/dummy-citizens-charter.pdf',
                'order' => 1,
            ],
        );
    }
}
