<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class AnnualReport extends Model
{
    protected $appends = ['pdf_url'];

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

    public function getPdfUrlAttribute(): ?string
    {
        return filled($this->pdf_path)
            ? Storage::disk('public')->url($this->pdf_path)
            : null;
    }
}
