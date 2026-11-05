<?php

namespace Database\Seeders;

use App\Models\OfficialVideo;
use Illuminate\Database\Seeder;

class OfficialVideoSeeder extends Seeder
{
    public function run(): void
    {
        $videos = [
            [
                'title' => 'Kiblawan Hymn',
                'video_file' => '/video/kiblawan-hymn.mp4',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Kiblawan, Ikaw ang BIDA!',
                'video_file' => '/video/bida.mp4',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Araw ng Kiblawan',
                'video_file' => '/video/araw-vid.mp4',
                'order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($videos as $video) {
            OfficialVideo::query()->updateOrCreate(
                ['title' => $video['title']],
                $video,
            );
        }
    }
}
