<?php

namespace App\Models;

use App\Models\Concerns\HasImageUrl;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TourismSpot extends Model
{
    use HasImageUrl;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'image',
        'category',
        'latitude',
        'longitude',
        'order',
        'is_active',
    ];

    protected $appends = ['image_url'];

    protected function casts(): array
    {
        return [
            'latitude' => 'decimal:7',
            'longitude' => 'decimal:7',
            'order' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function images(): HasMany
    {
        return $this->hasMany(TourismSpotImage::class)->orderBy('order');
    }
}
