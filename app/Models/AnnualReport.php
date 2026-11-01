<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnnualReport extends Model
{
    protected $fillable = [
        'title',
        'category',
        'pdf_path',
        'year',
        'date_posted',
    ];

    protected function casts(): array
    {
        return [
            'year' => 'integer',
            'date_posted' => 'date',
        ];
    }
}
