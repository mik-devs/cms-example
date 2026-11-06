<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreHeroSlideRequest;
use App\Http\Requests\Admin\UpdateHeroSlideRequest;
use App\Models\HeroSlide;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use RuntimeException;

class HeroSlideController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/hero-slides/index', [
            'heroSlides' => HeroSlide::query()
                ->orderBy('order')
                ->orderBy('id')
                ->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/hero-slides/create');
    }

    public function store(StoreHeroSlideRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $imagePath = Storage::disk('public')->putFile('hero', $request->file('image'));

        if ($imagePath === false) {
            throw new RuntimeException('The hero slide image could not be stored.');
        }

        $validated['image'] = $imagePath;
        HeroSlide::query()->create($validated);

        return to_route('admin.hero-slides.index')->with('success', 'Hero slide created');
    }

    public function edit(HeroSlide $heroSlide): Response
    {
        return Inertia::render('admin/hero-slides/edit', [
            'heroSlide' => $heroSlide,
        ]);
    }

    public function update(
        UpdateHeroSlideRequest $request,
        HeroSlide $heroSlide,
    ): RedirectResponse {
        $validated = $request->validated();
        $previousImage = $heroSlide->image;

        if ($request->hasFile('image')) {
            $imagePath = Storage::disk('public')->putFile('hero', $request->file('image'));

            if ($imagePath === false) {
                throw new RuntimeException('The hero slide image could not be stored.');
            }

            $validated['image'] = $imagePath;
        } else {
            unset($validated['image']);
        }

        $heroSlide->update($validated);

        if (
            $request->hasFile('image')
            && Storage::disk('public')->exists($previousImage)
            && ! Storage::disk('public')->delete($previousImage)
        ) {
            throw new RuntimeException('The previous hero slide image could not be deleted.');
        }

        return to_route('admin.hero-slides.index')->with('success', 'Hero slide updated');
    }

    public function destroy(HeroSlide $heroSlide): RedirectResponse
    {
        $image = $heroSlide->image;
        $heroSlide->delete();

        if (
            $image
            && Storage::disk('public')->exists($image)
            && ! Storage::disk('public')->delete($image)
        ) {
            throw new RuntimeException('The hero slide image could not be deleted.');
        }

        return to_route('admin.hero-slides.index')->with('success', 'Hero slide deleted');
    }
}
