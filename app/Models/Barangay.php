<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Barangay extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'population',
        'captain',
        'contact',
        'latitude',
        'longitude',
        'order',
    ];

    protected function casts(): array
    {
        return [
            'population' => 'integer',
            'latitude' => 'decimal:7',
            'longitude' => 'decimal:7',
            'order' => 'integer',
        ];
    }
}
