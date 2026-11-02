<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class StoreTourismRequest extends FormRequest
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
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:tourism_spots,slug'],
            'description' => ['required', 'string'],
            'image' => ['required', 'image', 'max:5120'],
            'category' => ['nullable', 'string', 'max:255'],
            'order' => ['required', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ];
    }

    protected function prepareForValidation(): void
    {
        if (! $this->has('is_active')) {
            $this->merge(['is_active' => true]);
        }

        if (blank($this->input('slug'))) {
            $slug = Str::slug((string) $this->input('name'));

            $this->merge(['slug' => $slug !== '' ? $slug : 'tourism-'.Str::random(8)]);
        }
    }
}
