<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class CitizenCharter extends Model
{
    protected $appends = ['file_url'];

    protected $fillable = [
        'title',
        'description',
        'file_path',
        'order',
    ];

    protected function casts(): array
    {
        return [
            'order' => 'integer',
        ];
    }

    public function getFileUrlAttribute(): ?string
    {
        return filled($this->file_path) ? Storage::url($this->file_path) : null;
    }
}
