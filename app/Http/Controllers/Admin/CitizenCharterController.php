<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCitizenCharterRequest;
use App\Http\Requests\Admin\UpdateCitizenCharterRequest;
use App\Models\CitizenCharter;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use RuntimeException;

class CitizenCharterController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/citizen-charters/index', [
            'citizenCharters' => CitizenCharter::query()
                ->orderBy('order')
                ->orderBy('id')
                ->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/citizen-charters/create');
    }

    public function store(StoreCitizenCharterRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $filePath = Storage::disk('public')->putFile('charters', $request->file('file_path'));

        if ($filePath === false) {
            throw new RuntimeException('The citizen charter could not be stored.');
        }

        $validated['file_path'] = $filePath;
        CitizenCharter::query()->create($validated);

        return to_route('admin.citizen-charters.index')->with('success', 'Citizen Charter created');
    }

    public function edit(CitizenCharter $citizenCharter): Response
    {
        return Inertia::render('admin/citizen-charters/edit', [
            'citizenCharter' => $citizenCharter,
        ]);
    }

    public function update(
        UpdateCitizenCharterRequest $request,
        CitizenCharter $citizenCharter,
    ): RedirectResponse {
        $validated = $request->validated();
        $previousFile = $citizenCharter->file_path;

        if ($request->hasFile('file_path')) {
            $filePath = Storage::disk('public')->putFile('charters', $request->file('file_path'));

            if ($filePath === false) {
                throw new RuntimeException('The citizen charter could not be stored.');
            }

            $validated['file_path'] = $filePath;
        } else {
            unset($validated['file_path']);
        }

        $citizenCharter->update($validated);

        if (
            $request->hasFile('file_path')
            && filled($previousFile)
            && Storage::disk('public')->exists($previousFile)
            && ! Storage::disk('public')->delete($previousFile)
        ) {
            throw new RuntimeException('The previous citizen charter could not be deleted.');
        }

        return to_route('admin.citizen-charters.index')->with('success', 'Citizen Charter updated');
    }

    public function destroy(CitizenCharter $citizenCharter): RedirectResponse
    {
        $filePath = $citizenCharter->file_path;
        $citizenCharter->delete();

        if (
            filled($filePath)
            && Storage::disk('public')->exists($filePath)
            && ! Storage::disk('public')->delete($filePath)
        ) {
            throw new RuntimeException('The citizen charter could not be deleted.');
        }

        return to_route('admin.citizen-charters.index')->with('success', 'Citizen Charter deleted');
    }
}
