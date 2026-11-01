<?php

namespace App\Models;

use App\Models\Concerns\HasImageUrl;
use Illuminate\Database\Eloquent\Model;

class TourismSpot extends Model
{
    use HasImageUrl;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'image',
        'category',
        'order',
        'is_active',
    ];

    protected $appends = ['image_url'];

    protected function casts(): array
    {
        return [
            'order' => 'integer',
            'is_active' => 'boolean',
        ];
    }
}
