<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAchievementRequest;
use App\Http\Requests\Admin\UpdateAchievementRequest;
use App\Models\Achievement;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use RuntimeException;

class AchievementController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/achievements/index', [
            'achievements' => Achievement::query()->orderBy('order')->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/achievements/create');
    }

    public function store(StoreAchievementRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $imagePath = Storage::disk('public')->putFile('achievements', $request->file('image'));

            if ($imagePath === false) {
                throw new RuntimeException('The achievement image could not be stored.');
            }

            $validated['image'] = $imagePath;
        }

        Achievement::query()->create($validated);

        return to_route('admin.achievements.index')->with('success', 'Achievement created');
    }

    public function edit(Achievement $achievement): Response
    {
        return Inertia::render('admin/achievements/edit', [
            'achievement' => $achievement,
        ]);
    }

    public function update(
        UpdateAchievementRequest $request,
        Achievement $achievement,
    ): RedirectResponse {
        $validated = $request->validated();
        $previousImage = $achievement->image;

        if ($request->hasFile('image')) {
            $imagePath = Storage::disk('public')->putFile('achievements', $request->file('image'));

            if ($imagePath === false) {
                throw new RuntimeException('The achievement image could not be stored.');
            }

            $validated['image'] = $imagePath;
        }

        $achievement->update($validated);

        if (
            $request->hasFile('image')
            && $previousImage !== null
            && Storage::disk('public')->exists($previousImage)
            && ! Storage::disk('public')->delete($previousImage)
        ) {
            throw new RuntimeException('The previous achievement image could not be deleted.');
        }

        return to_route('admin.achievements.index')->with('success', 'Achievement updated');
    }

    public function destroy(Achievement $achievement): RedirectResponse
    {
        $image = $achievement->image;
        $achievement->delete();

        if (
            $image !== null
            && Storage::disk('public')->exists($image)
            && ! Storage::disk('public')->delete($image)
        ) {
            throw new RuntimeException('The achievement image could not be deleted.');
        }

        return to_route('admin.achievements.index')->with('success', 'Achievement deleted');
    }
}
