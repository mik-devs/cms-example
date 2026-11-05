<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\UploadedFile;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class UpdatePageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'mode' => ['nullable', Rule::in(['blocks', 'html'])],
            'content' => ['nullable', 'string'],
            'blocks' => ['required_if:mode,blocks', 'nullable', 'array', 'min:1', 'max:25'],
            'blocks.*.kicker' => ['required', 'string', 'max:255'],
            'blocks.*.title' => ['required', 'string', 'max:255'],
            'blocks.*.subtitle' => ['required', 'string', 'max:255'],
            'blocks.*.body' => ['required', 'string', 'max:5000'],
            'blocks.*.image_position' => ['required', Rule::in(['left', 'right'])],
            'blocks.*.existing_image' => ['nullable', 'string', 'max:1024'],
            'blocks.*.image' => ['nullable', 'file', 'image', 'max:5120'],
            'intro' => ['nullable', 'string', 'max:5000'],
            'intro_text' => ['nullable', 'string', 'max:5000'],
            'stats' => ['nullable', 'array', 'max:25'],
            'stats.*.label' => ['nullable', 'string', 'max:255'],
            'stats.*.value' => ['nullable', 'string', 'max:255'],
            'stats.*.suffix' => ['nullable', 'string', 'max:255'],
            'stat_cards' => ['nullable', 'array', 'max:25'],
            'stat_cards.*.label' => ['nullable', 'string', 'max:255'],
            'stat_cards.*.value' => ['nullable', 'string', 'max:255'],
            'stat_cards.*.suffix' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'file', 'image', 'max:5120'],
            'existing_image' => ['nullable', 'string', 'max:1024'],
            'existing_photo' => ['nullable', 'string', 'max:1024'],
            'sectors' => ['nullable', 'array', 'max:50'],
            'sectors.*.icon' => ['nullable', 'string', 'max:255'],
            'sectors.*.icon_name' => ['nullable', 'string', 'max:255'],
            'sectors.*.title' => ['nullable', 'string', 'max:255'],
            'sectors.*.description' => ['nullable', 'string', 'max:5000'],
            'sectors.*.body' => ['nullable', 'string', 'max:5000'],
            'sectors.*.image' => ['nullable', 'file', 'image', 'max:5120'],
            'sectors.*.existing_image' => ['nullable', 'string', 'max:1024'],
            'cards' => ['nullable', 'array', 'max:50'],
            'sector_cards' => ['nullable', 'array', 'max:50'],
            'left_text' => ['nullable', 'string', 'max:10000'],
            'left' => ['nullable', 'string', 'max:10000'],
            'text' => ['nullable', 'string', 'max:10000'],
            'map_image' => ['nullable', 'file', 'image', 'max:5120'],
            'map' => ['nullable', 'file', 'image', 'max:5120'],
            'existing_map_image' => ['nullable', 'string', 'max:1024'],
            'facts' => ['nullable', 'array', 'max:50'],
            'facts.*.label' => ['nullable', 'string', 'max:255'],
            'facts.*.value' => ['nullable', 'string', 'max:255'],
            'geographical_facts' => ['nullable', 'array', 'max:50'],
            'geographical_facts.*.label' => ['nullable', 'string', 'max:255'],
            'geographical_facts.*.value' => ['nullable', 'string', 'max:255'],
            'facts_list' => ['nullable', 'array', 'max:50'],
        ];
    }

    /**
     * Get the after validation hooks for the request.
     *
     * @return array<int, callable(Validator): void>
     */
    public function after(): array
    {
        return [
            function (Validator $validator): void {
                $slug = (string) $this->route('slug');
                $structuredSlugs = ['demographic', 'socio-economic', 'geography'];
                $blocks = $this->input('blocks');

                if (! in_array($slug, $structuredSlugs, true)
                    && $this->input('mode') !== 'blocks'
                    && trim((string) $this->input('content')) === '') {
                    $validator->errors()->add('content', 'The content field is required.');
                }

                if (is_array($blocks)) {
                    $uploads = $this->file('blocks');

                    foreach ($blocks as $index => $block) {
                        $existingImage = is_array($block)
                            ? trim((string) ($block['existing_image'] ?? ''))
                            : '';
                        $hasUpload = data_get($uploads, "{$index}.image") instanceof UploadedFile;

                        if ($existingImage !== ''
                            && preg_match('#^/[A-Za-z0-9._\-/]+$#', $existingImage) !== 1) {
                            $validator->errors()->add(
                                "blocks.{$index}.existing_image",
                                'The image path must start with "/" and contain only letters, numbers, dots, dashes, underscores, and slashes.',
                            );
                        }

                        if ($existingImage === '' && ! $hasUpload) {
                            $validator->errors()->add(
                                "blocks.{$index}.image",
                                'Upload an image for this block or keep an existing image path.',
                            );
                        }
                    }
                }

                if ($slug === 'demographic') {
                    $stats = $this->input('stats') ?? $this->input('stat_cards');

                    if (! is_array($stats) || count($stats) === 0) {
                        $validator->errors()->add('stats', 'At least one stat card is required.');
                    }

                    $existingImage = trim((string) ($this->input('existing_image') ?? $this->input('existing_photo') ?? ''));
                    $hasUpload = $this->file('image') instanceof UploadedFile;

                    if ($existingImage !== ''
                        && preg_match('#^/[A-Za-z0-9._\-/]+$#', $existingImage) !== 1) {
                        $validator->errors()->add('existing_image', 'The image path must start with "/" and contain only letters, numbers, dots, dashes, underscores, and slashes.');
                    }

                    if ($existingImage === '' && ! $hasUpload) {
                        $validator->errors()->add('image', 'Upload an image or keep an existing image path.');
                    }
                }

                if ($slug === 'socio-economic') {
                    $sectors = $this->input('sectors') ?? $this->input('cards') ?? $this->input('sector_cards');

                    if (! is_array($sectors) || count($sectors) === 0) {
                        $validator->errors()->add('sectors', 'At least one sector card is required.');
                    }
                }

                if ($slug === 'geography') {
                    $facts = $this->input('facts') ?? $this->input('geographical_facts') ?? $this->input('facts_list');

                    if (! is_array($facts) || count($facts) === 0) {
                        $validator->errors()->add('facts', 'At least one geographical fact is required.');
                    }

                    $existingImage = trim((string) ($this->input('existing_map_image') ?? $this->input('existing_image') ?? $this->input('existing_photo') ?? ''));
                    $hasUpload = ($this->file('map_image') ?? $this->file('map') ?? $this->file('image')) instanceof UploadedFile;

                    if ($existingImage !== ''
                        && preg_match('#^/[A-Za-z0-9._\-/]+$#', $existingImage) !== 1) {
                        $validator->errors()->add('existing_map_image', 'The image path must start with "/" and contain only letters, numbers, dots, dashes, underscores, and slashes.');
                    }

                    if ($existingImage === '' && ! $hasUpload) {
                        $validator->errors()->add('map_image', 'Upload a map image or keep an existing image path.');
                    }
                }
            },
        ];
    }
}
