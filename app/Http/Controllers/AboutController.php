<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function history(): Response
    {
        return $this->renderPage('history', 'public/about/history');
    }

    public function demographic(): Response
    {
        return $this->renderPage('demographic', 'public/about/demographic');
    }

    public function socioEconomic(): Response
    {
        return $this->renderPage('socio-economic', 'public/about/socio-economic');
    }

    public function geography(): Response
    {
        return $this->renderPage('geography', 'public/about/geography');
    }

    private function renderPage(string $slug, string $component): Response
    {
        return Inertia::render($component, [
            'page' => Page::query()
                ->where('slug', $slug)
                ->first(),
        ]);
    }
}
