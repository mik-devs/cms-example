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
                'kicker' => 'The Friendly and Disciplined Municipality',
                'title' => 'Welcome to the Municipality of Kiblawan',
                'title_emphasis' => 'Municipality, Kiblawan',
                'subtitle' => 'Home to a united, disciplined, and hospitable community driving toward sustainable progress.',
                'image' => '/images/kib.png',
                'cta_text' => 'Explore Services',
                'cta_link' => '/services',
                'order' => 1,
            ],
            [
                'kicker' => 'Tourism',
                'title' => 'Discover the Beauty of Kiblawan',
                'title_emphasis' => 'Beauty, Kiblawan',
                'subtitle' => 'From lush mountains to serene waterfalls, Kiblawan offers unforgettable natural wonders and rich agricultural heritage.',
                'image' => '/tourism/spot.png',
                'cta_text' => 'Plan Your Visit',
                'cta_link' => '/tourism',
                'order' => 2,
            ],
            [
                'kicker' => 'Araw ng Kiblawan',
                'title' => 'Celebrate the Town\'s Heritage',
                'title_emphasis' => 'Town, Heritage',
                'subtitle' => 'A grand showcase of unity, rich traditions, and a bountiful harvest at the Kastifun Festival.',
                'image' => '/images/araw.png',
                'cta_text' => 'View Events',
                'cta_link' => '/events/araw-ng-kiblawan',
                'order' => 3,
            ],
            [
                'kicker' => 'Award & Recognition',
                'title' => 'Kiblawan Achieves IDEAL Level of Functionality',
                'title_emphasis' => 'Kiblawan, IDEAL',
                'subtitle' => 'Congratulations to the Municipal Council for the Protection of Children for this outstanding achievement.',
                'image' => '/images/award/ideal.png',
                'cta_text' => 'View Achievements',
                'cta_link' => '/achievements',
                'order' => 4,
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
