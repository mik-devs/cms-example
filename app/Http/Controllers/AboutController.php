<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(?string $section = null): Response
    {
        return Inertia::render('public/about', [
            'settings' => Setting::query()
                ->pluck('value', 'key')
                ->toArray(),
            'section' => $section,
        ]);
    }
}
