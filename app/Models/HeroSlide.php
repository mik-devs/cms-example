<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSlide extends Model
{
    protected $fillable = [
        'kicker',
        'title',
        'title_emphasis',
        'subtitle',
        'image',
        'cta_text',
        'cta_link',
        'order',
        'is_active',
    ];

    protected $appends = ['image_url'];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'order' => 'integer',
        ];
    }

    public function getImageUrlAttribute(): string
    {
        return $this->image;
    }
}
