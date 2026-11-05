<?php

namespace Database\Factories;

use App\Models\OfficialVideo;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<OfficialVideo>
 */
class OfficialVideoFactory extends Factory
{
    protected $model = OfficialVideo::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'video_file' => 'videos/sample.mp4',
            'order' => fake()->numberBetween(1, 10),
            'is_active' => true,
        ];
    }
}
