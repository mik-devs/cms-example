<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bid extends Model
{
    protected $fillable = [
        'title',
        'pdf_path',
        'date_posted',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'date_posted' => 'date',
        ];
    }
}
