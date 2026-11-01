<?php

namespace Database\Seeders;

use App\Models\HeroSlide;
use Illuminate\Database\Seeder;

class HeroSlideSeeder extends Seeder
{
    public function run(): void
    {
        $slides = [
            [
                'kicker' => 'Municipality of Kiblawan',
                'title' => 'Serbisyong <em>Mabilis</em>, Bayang <em>Maasahan</em>',
                'title_emphasis' => 'Mabilis',
                'subtitle' => null,
                'image' => '/images/kib.png',
                'cta_text' => null,
                'cta_link' => null,
                'order' => 1,
            ],
            [
                'kicker' => 'Tourism',
                'title' => 'Tuklasin ang <em>Ganda</em> ng Kiblawan',
                'title_emphasis' => 'Ganda',
                'subtitle' => null,
                'image' => '/tourism/spot.png',
                'cta_text' => null,
                'cta_link' => null,
                'order' => 2,
            ],
            [
                'kicker' => 'Araw ng Kiblawan',
                'title' => 'Ipagdiwang ang <em>Araw</em> ng Bayan',
                'title_emphasis' => 'Araw',
                'subtitle' => null,
                'image' => '/images/araw.png',
                'cta_text' => null,
                'cta_link' => null,
                'order' => 3,
            ],
        ];

        foreach ($slides as $slide) {
            HeroSlide::query()->updateOrCreate(
                ['order' => $slide['order']],
                $slide + ['is_active' => true],
            );
        }
    }
}
