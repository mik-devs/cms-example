<?php

namespace App\Actions;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use JsonException;

class StorePageBlocks
{
    /**
     * Persist validated content blocks as JSON and store any uploaded images.
     *
     * @param  array<int, array<string, mixed>>  $blocks
     *
     * @throws JsonException
     */
    public function handle(string $slug, array $blocks): string
    {
        $directory = 'pages/'.$slug;
        $normalized = [];

        foreach (array_values($blocks) as $block) {
            $normalized[] = [
                'image' => $this->resolveImage($block, $directory),
                'kicker' => $this->cleanText($block['kicker'] ?? ''),
                'title' => $this->cleanText($block['title'] ?? ''),
                'subtitle' => $this->cleanText($block['subtitle'] ?? ''),
                'body' => $this->cleanText($block['body'] ?? ''),
                'image_position' => ($block['image_position'] ?? 'left') === 'right' ? 'right' : 'left',
            ];
        }

        return json_encode(
            $normalized,
            JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE,
        );
    }

    /**
     * Store the uploaded image, otherwise keep the block's existing image path.
     *
     * @param  array<string, mixed>  $block
     */
    private function resolveImage(array $block, string $directory): string
    {
        $upload = $block['image'] ?? null;

        if ($upload instanceof UploadedFile) {
            $this->deleteManagedImage($block['existing_image'] ?? null, $directory);

            return '/storage/'.$upload->store($directory, 'public');
        }

        return is_string($block['existing_image'] ?? null) ? $block['existing_image'] : '';
    }

    /**
     * Delete a replaced image, but only when it lives in this page's upload directory.
     */
    private function deleteManagedImage(mixed $path, string $directory): void
    {
        if (! is_string($path) || $path === '') {
            return;
        }

        $relative = preg_replace('#^/storage/#', '', $path) ?? '';

        if (! str_starts_with($relative, $directory.'/')) {
            return;
        }

        Storage::disk('public')->delete($relative);
    }

    private function cleanText(mixed $value): string
    {
        return trim(strip_tags((string) $value));
    }
}
