<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTourismRequest;
use App\Http\Requests\Admin\UpdateTourismRequest;
use App\Models\TourismSpot;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use RuntimeException;

class TourismController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/tourism/index', [
            'tourismSpots' => TourismSpot::query()
                ->orderBy('order')
                ->orderBy('id')
                ->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/tourism/create');
    }

    public function store(StoreTourismRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $imagePath = Storage::disk('public')->putFile('tourism', $request->file('image'));

        if ($imagePath === false) {
            throw new RuntimeException('The tourism spot image could not be stored.');
        }

        $validated['image'] = $imagePath;
        TourismSpot::query()->create($validated);

        return to_route('admin.tourism.index')->with('success', 'Tourism spot created');
    }

    public function edit(TourismSpot $tourism): Response
    {
        return Inertia::render('admin/tourism/edit', [
            'tourismSpot' => $tourism,
        ]);
    }

    public function update(
        UpdateTourismRequest $request,
        TourismSpot $tourism,
    ): RedirectResponse {
        $validated = $request->validated();
        $previousImage = $tourism->image;

        if ($request->hasFile('image')) {
            $imagePath = Storage::disk('public')->putFile('tourism', $request->file('image'));

            if ($imagePath === false) {
                throw new RuntimeException('The tourism spot image could not be stored.');
            }

            $validated['image'] = $imagePath;
        }

        $tourism->update($validated);

        if (
            $request->hasFile('image')
            && filled($previousImage)
            && Storage::disk('public')->exists($previousImage)
            && ! Storage::disk('public')->delete($previousImage)
        ) {
            throw new RuntimeException('The previous tourism spot image could not be deleted.');
        }

        return to_route('admin.tourism.index')->with('success', 'Tourism spot updated');
    }

    public function destroy(TourismSpot $tourism): RedirectResponse
    {
        $image = $tourism->image;
        $tourism->delete();

        if (
            filled($image)
            && Storage::disk('public')->exists($image)
            && ! Storage::disk('public')->delete($image)
        ) {
            throw new RuntimeException('The tourism spot image could not be deleted.');
        }

        return to_route('admin.tourism.index')->with('success', 'Tourism spot deleted');
    }
}
