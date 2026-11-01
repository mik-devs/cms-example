<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateBidRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'pdf_path' => ['nullable', 'file', 'mimes:pdf', 'max:10240'],
            'date_posted' => ['required', 'date'],
            'status' => ['required', 'in:open,closed'],
        ];
    }
}
