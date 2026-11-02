<?php

namespace App\Http\Requests\Admin;

use App\Models\TourismSpot;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UpdateTourismRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $tourismSpot = $this->route('tourism');

        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('tourism_spots', 'slug')->ignore(
                    $tourismSpot instanceof TourismSpot ? $tourismSpot->getKey() : null,
                ),
            ],
            'description' => ['required', 'string'],
            'image' => ['nullable', 'image', 'max:5120'],
            'category' => ['nullable', 'string', 'max:255'],
            'order' => ['required', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ];
    }

    protected function prepareForValidation(): void
    {
        if (! $this->has('is_active')) {
            $this->merge(['is_active' => false]);
        }

        if (blank($this->input('slug'))) {
            $tourismSpot = $this->route('tourism');
            $slug = $tourismSpot instanceof TourismSpot
                ? $tourismSpot->slug
                : Str::slug((string) $this->input('name'));

            $this->merge(['slug' => $slug !== '' ? $slug : 'tourism-'.Str::random(8)]);
        }
    }
}
