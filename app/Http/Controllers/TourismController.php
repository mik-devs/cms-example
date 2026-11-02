<?php

namespace App\Http\Controllers;

use App\Models\TourismSpot;
use Inertia\Inertia;
use Inertia\Response;

class TourismController extends Controller
{
    public function show(string $slug): Response
    {
        $spot = TourismSpot::query()
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return Inertia::render('public/tourism/show', [
            'spot' => $spot,
        ]);
    }
}
