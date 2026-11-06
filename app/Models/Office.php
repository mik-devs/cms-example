<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Office extends Model
{
    protected $fillable = [
        'name',
        'head',
        'contact_number',
        'email',
        'location',
        'order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'order' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    /**
     * @param Builder<static> $query
     * @return static
     */
    /**
 * @param \Illuminate\Database\Eloquent\Builder<static> $query
 * @return \Illuminate\Database\Eloquent\Builder<static>
 */
public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }
}
