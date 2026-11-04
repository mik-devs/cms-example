<?php

namespace App\Models;

use App\Models\Concerns\HasImageUrl;
use Illuminate\Database\Eloquent\Model;

class Achievement extends Model
{
    use HasImageUrl;

    protected $fillable = [
        'title',
        'description',
        'image',
        'badge_year',
        'facebook_url',
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
