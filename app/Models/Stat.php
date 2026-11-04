<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stat extends Model
{
    protected $fillable = [
        'label',
        'value',
        'suffix',
        'icon',
        'order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'value' => 'float',
            'order' => 'integer',
            'is_active' => 'boolean',
        ];
    }
}
