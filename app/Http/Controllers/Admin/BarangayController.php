<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreBarangayRequest;
use App\Http\Requests\Admin\UpdateBarangayRequest;
use App\Models\Barangay;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class BarangayController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/barangays/index', [
            'barangays' => Barangay::query()
                ->orderBy('order')
                ->orderBy('id')
                ->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/barangays/create');
    }

    public function store(StoreBarangayRequest $request): RedirectResponse
    {
        Barangay::query()->create($request->validated());

        return to_route('admin.barangays.index')->with('success', 'Barangay created');
    }

    public function edit(Barangay $barangay): Response
    {
        return Inertia::render('admin/barangays/edit', [
            'barangay' => $barangay,
        ]);
    }

    public function update(
        UpdateBarangayRequest $request,
        Barangay $barangay,
    ): RedirectResponse {
        $barangay->update($request->validated());

        return to_route('admin.barangays.index')->with('success', 'Barangay updated');
    }

    public function destroy(Barangay $barangay): RedirectResponse
    {
        $barangay->delete();

        return to_route('admin.barangays.index')->with('success', 'Barangay deleted');
    }
}
