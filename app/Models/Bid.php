<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Bid extends Model
{
    protected $appends = ['pdf_url'];

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

    public function getPdfUrlAttribute(): ?string
    {
        return filled($this->pdf_path)
            ? Storage::disk('public')->url($this->pdf_path)
            : null;
    }
}
