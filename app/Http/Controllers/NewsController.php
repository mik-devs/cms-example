<?php

namespace App\Http\Controllers;

use App\Models\News;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('public/news/index', [
            'news' => News::query()
                ->where('status', 'published')
                ->whereNotNull('published_at')
                ->orderByDesc('published_at')
                ->paginate(9),
        ]);
    }

    public function show(string $slug): Response
    {
        $news = News::query()
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        return Inertia::render('public/news/show', [
            'news' => $news,
        ]);
    }
}
