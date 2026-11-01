<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreBidRequest;
use App\Http\Requests\Admin\UpdateBidRequest;
use App\Models\Bid;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use RuntimeException;

class BidController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/bids/index', [
            'bids' => Bid::query()->orderByDesc('date_posted')->orderByDesc('id')->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/bids/create');
    }

    public function store(StoreBidRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        if ($request->hasFile('pdf_path')) {
            $pdfPath = Storage::disk('public')->putFile('bids', $request->file('pdf_path'));

            if ($pdfPath === false) {
                throw new RuntimeException('The bid document could not be stored.');
            }

            $validated['pdf_path'] = $pdfPath;
        }

        Bid::query()->create($validated);

        return to_route('admin.bids.index')->with('success', 'Bid created');
    }

    public function edit(Bid $bid): Response
    {
        return Inertia::render('admin/bids/edit', ['bid' => $bid]);
    }

    public function update(UpdateBidRequest $request, Bid $bid): RedirectResponse
    {
        $validated = $request->validated();
        $previousPdf = $bid->pdf_path;

        if ($request->hasFile('pdf_path')) {
            $pdfPath = Storage::disk('public')->putFile('bids', $request->file('pdf_path'));

            if ($pdfPath === false) {
                throw new RuntimeException('The bid document could not be stored.');
            }

            $validated['pdf_path'] = $pdfPath;
        } else {
            unset($validated['pdf_path']);
        }

        $bid->update($validated);

        if (
            $request->hasFile('pdf_path')
            && filled($previousPdf)
            && Storage::disk('public')->exists($previousPdf)
            && ! Storage::disk('public')->delete($previousPdf)
        ) {
            throw new RuntimeException('The previous bid document could not be deleted.');
        }

        return to_route('admin.bids.index')->with('success', 'Bid updated');
    }

    public function destroy(Bid $bid): RedirectResponse
    {
        $pdfPath = $bid->pdf_path;
        $bid->delete();

        if (
            filled($pdfPath)
            && Storage::disk('public')->exists($pdfPath)
            && ! Storage::disk('public')->delete($pdfPath)
        ) {
            throw new RuntimeException('The bid document could not be deleted.');
        }

        return to_route('admin.bids.index')->with('success', 'Bid deleted');
    }
}
