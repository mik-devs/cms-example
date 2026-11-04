<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use Inertia\Inertia;
use Inertia\Response;

class AchievementController extends Controller
{
    public function index(): Response
    {
        $achievements = Achievement::query()
            ->where('is_active', true)
            ->orderBy('order')
            ->get();

        return Inertia::render('public/achievements/index', [
            'achievements' => $achievements,
        ]);
    }

    public function show(int $id): Response
    {
        $achievement = Achievement::query()
            ->where('is_active', true)
            ->findOrFail($id);

        return Inertia::render('public/achievements/show', [
            'achievement' => $achievement,
        ]);
    }
}
