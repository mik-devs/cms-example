<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreOfficialVideoRequest;
use App\Http\Requests\Admin\UpdateOfficialVideoRequest;
use App\Models\OfficialVideo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use RuntimeException;

class OfficialVideoController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/videos/index', [
            'videos' => OfficialVideo::query()
                ->orderBy('order')
                ->orderBy('id')
                ->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/videos/create');
    }

    public function store(StoreOfficialVideoRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $videoPath = Storage::disk('public')->putFile('videos', $request->file('video_file'));

        if ($videoPath === false) {
            throw new RuntimeException('The video file could not be stored.');
        }

        $validated['video_file'] = $videoPath;
        OfficialVideo::query()->create($validated);

        return to_route('admin.videos.index')->with('success', 'Official video created');
    }

    public function edit(OfficialVideo $video): Response
    {
        return Inertia::render('admin/videos/edit', [
            'video' => $video,
        ]);
    }

    public function update(
        UpdateOfficialVideoRequest $request,
        OfficialVideo $video,
    ): RedirectResponse {
        $validated = $request->validated();
        $previousVideo = $video->video_file;

        if ($request->hasFile('video_file')) {
            $videoPath = Storage::disk('public')->putFile('videos', $request->file('video_file'));

            if ($videoPath === false) {
                throw new RuntimeException('The video file could not be stored.');
            }

            $validated['video_file'] = $videoPath;
        } else {
            unset($validated['video_file']);
        }

        $video->update($validated);

        if (
            $request->hasFile('video_file')
            && Storage::disk('public')->exists($previousVideo)
            && ! Storage::disk('public')->delete($previousVideo)
        ) {
            throw new RuntimeException('The previous video file could not be deleted.');
        }

        return to_route('admin.videos.index')->with('success', 'Official video updated');
    }

    public function destroy(OfficialVideo $video): RedirectResponse
    {
        $videoFile = $video->video_file;
        $video->delete();

        if (
            $videoFile
            && Storage::disk('public')->exists($videoFile)
            && ! Storage::disk('public')->delete($videoFile)
        ) {
            throw new RuntimeException('The video file could not be deleted.');
        }

        return to_route('admin.videos.index')->with('success', 'Official video deleted');
    }
}
