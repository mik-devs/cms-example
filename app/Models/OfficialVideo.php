<?php

namespace App\Models;

use Database\Factories\OfficialVideoFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class OfficialVideo extends Model
{
    /** @use HasFactory<OfficialVideoFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'video_file',
        'order',
        'is_active',
    ];

    protected $appends = [
        'video_url',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'order' => 'integer',
        ];
    }

    public function getVideoUrlAttribute(): ?string
    {
        if (blank($this->video_file)) {
            return null;
        }

        if (str_starts_with($this->video_file, 'http://') || str_starts_with($this->video_file, 'https://')) {
            return $this->video_file;
        }

        if (str_starts_with($this->video_file, '/') || str_starts_with($this->video_file, 'video/')) {
            return str_starts_with($this->video_file, '/') ? $this->video_file : '/'.$this->video_file;
        }

        return Storage::disk('public')->url($this->video_file);
    }
}
