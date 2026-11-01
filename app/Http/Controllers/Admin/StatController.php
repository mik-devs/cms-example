<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreStatRequest;
use App\Http\Requests\Admin\UpdateStatRequest;
use App\Models\Stat;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class StatController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/stats/index', [
            'stats' => Stat::query()
                ->orderBy('order')
                ->orderBy('id')
                ->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/stats/create');
    }

    public function store(StoreStatRequest $request): RedirectResponse
    {
        Stat::query()->create($request->validated());

        return to_route('admin.stats.index')->with('success', 'Stat created');
    }

    public function edit(Stat $stat): Response
    {
        return Inertia::render('admin/stats/edit', [
            'stat' => $stat,
        ]);
    }

    public function update(UpdateStatRequest $request, Stat $stat): RedirectResponse
    {
        $stat->update($request->validated());

        return to_route('admin.stats.index')->with('success', 'Stat updated');
    }

    public function destroy(Stat $stat): RedirectResponse
    {
        $stat->delete();

        return to_route('admin.stats.index')->with('success', 'Stat deleted');
    }
}
