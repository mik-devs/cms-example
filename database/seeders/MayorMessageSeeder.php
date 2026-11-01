<?php

namespace Database\Seeders;

use App\Models\MayorMessage;
use Illuminate\Database\Seeder;

class MayorMessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MayorMessage::query()->updateOrCreate(
            ['title' => "Mayor's Official Portrait"],
            [
                'content' => 'Official portrait of the Municipal Mayor of Kiblawan.',
                'image' => '/images/mayor/mayor.jpg',
                'type' => 'photo_release',
                'published_at' => now(),
            ],
        );
    }
}
