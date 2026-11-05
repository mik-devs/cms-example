<?php

namespace App\Http\Controllers\Admin;

use App\Actions\SanitizePageContent;
use App\Actions\StorePageBlocks;
use App\Actions\StoreStructuredPage;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdatePageRequest;
use App\Models\Page;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/pages/index', [
            'pages' => Page::query()
                ->orderBy('id')
                ->get(),
        ]);
    }

    public function edit(string $slug): Response
    {
        return Inertia::render('admin/pages/edit', [
            'page' => Page::query()
                ->where('slug', $slug)
                ->firstOrFail(),
        ]);
    }

    public function update(
        UpdatePageRequest $request,
        string $slug,
        SanitizePageContent $sanitizer,
        StorePageBlocks $blockStore,
        StoreStructuredPage $structuredStore,
    ): RedirectResponse {
        $page = Page::query()
            ->where('slug', $slug)
            ->firstOrFail();

        $validated = $request->validated();

        if (in_array($slug, ['demographic', 'socio-economic', 'geography'], true)) {
            $content = $structuredStore->handle($slug, $validated);
        } elseif (($validated['mode'] ?? 'html') === 'blocks') {
            $content = $blockStore->handle($slug, $validated['blocks']);
        } else {
            $content = $sanitizer->handle($validated['content'] ?? '');
        }

        $page->update([
            'title' => $validated['title'],
            'content' => $content,
        ]);

        return to_route('admin.pages.index')->with('success', 'Page updated');
    }
}
