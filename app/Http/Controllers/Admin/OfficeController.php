<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreOfficeRequest;
use App\Http\Requests\Admin\UpdateOfficeRequest;
use App\Models\Office;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class OfficeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/offices/index', [
            'offices' => Office::query()
                ->orderBy('order')
                ->orderBy('id')
                ->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/offices/create');
    }

    public function store(StoreOfficeRequest $request): RedirectResponse
    {
        Office::query()->create($request->validated());

        return to_route('admin.offices.index')->with('success', 'Office created');
    }

    public function edit(Office $office): Response
    {
        return Inertia::render('admin/offices/edit', [
            'office' => $office,
        ]);
    }

    public function update(
        UpdateOfficeRequest $request,
        Office $office,
    ): RedirectResponse {
        $office->update($request->validated());

        return to_route('admin.offices.index')->with('success', 'Office updated');
    }

    public function destroy(Office $office): RedirectResponse
    {
        $office->delete();

        return to_route('admin.offices.index')->with('success', 'Office deleted');
    }
}
