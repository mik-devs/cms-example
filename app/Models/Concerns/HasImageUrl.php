<?php

namespace App\Models\Concerns;

use Illuminate\Support\Facades\Storage;

trait HasImageUrl
{
    public function getImageUrlAttribute(): ?string
    {
        $image = $this->getAttribute('image');

        if (blank($image)) {
            return null;
        }

        if (str_starts_with($image, '/') || str_starts_with($image, 'http')) {
            return $image;
        }

        return Storage::url($image);
    }
}
