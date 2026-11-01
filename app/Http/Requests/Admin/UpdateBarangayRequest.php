<?php

namespace App\Http\Requests\Admin;

use App\Models\Barangay;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UpdateBarangayRequest extends FormRequest
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
        $barangay = $this->route('barangay');

        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('barangays', 'slug')->ignore(
                    $barangay instanceof Barangay ? $barangay->getKey() : null,
                ),
            ],
            'population' => ['nullable', 'integer'],
            'captain' => ['nullable', 'string', 'max:255'],
            'contact' => ['nullable', 'string', 'max:255'],
            'latitude' => ['nullable', 'numeric'],
            'longitude' => ['nullable', 'numeric'],
            'order' => ['required', 'integer', 'min:0'],
        ];
    }

    protected function prepareForValidation(): void
    {
        if (blank($this->input('slug'))) {
            $barangay = $this->route('barangay');
            $slug = $barangay instanceof Barangay
                ? $barangay->slug
                : Str::slug((string) $this->input('name'));

            $this->merge([
                'slug' => $slug !== '' ? $slug : 'barangay-'.Str::random(8),
            ]);
        }
    }
}
