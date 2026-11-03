<?php

namespace App\Http\Controllers;

use App\Models\TourismSpot;
use Inertia\Inertia;
use Inertia\Response;

class TourismController extends Controller
{
    public function index(): Response
    {
        $spots = TourismSpot::query()
            ->where('is_active', true)
            ->orderBy('order')
            ->get();

        return Inertia::render('public/tourism/index', [
            'spots' => $spots,
        ]);
    }

    public function show(string $slug): Response
    {
        $spot = TourismSpot::query()
            ->with('images')
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return Inertia::render('public/tourism/show', [
            'spot' => $spot,
        ]);
    }
}
