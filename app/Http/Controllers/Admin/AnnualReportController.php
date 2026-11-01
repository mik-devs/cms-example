<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAnnualReportRequest;
use App\Http\Requests\Admin\UpdateAnnualReportRequest;
use App\Models\AnnualReport;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use RuntimeException;

class AnnualReportController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/annual-reports/index', [
            'annualReports' => AnnualReport::query()
                ->orderByDesc('year')
                ->orderByDesc('date_posted')
                ->orderByDesc('id')
                ->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/annual-reports/create');
    }

    public function store(StoreAnnualReportRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $pdfPath = Storage::disk('public')->putFile('reports', $request->file('pdf_path'));

        if ($pdfPath === false) {
            throw new RuntimeException('The annual report could not be stored.');
        }

        $validated['pdf_path'] = $pdfPath;
        AnnualReport::query()->create($validated);

        return to_route('admin.annual-reports.index')->with('success', 'Annual report created');
    }

    public function edit(AnnualReport $annualReport): Response
    {
        return Inertia::render('admin/annual-reports/edit', [
            'annualReport' => $annualReport,
        ]);
    }

    public function update(
        UpdateAnnualReportRequest $request,
        AnnualReport $annualReport,
    ): RedirectResponse {
        $validated = $request->validated();
        $previousPdf = $annualReport->pdf_path;

        if ($request->hasFile('pdf_path')) {
            $pdfPath = Storage::disk('public')->putFile('reports', $request->file('pdf_path'));

            if ($pdfPath === false) {
                throw new RuntimeException('The annual report could not be stored.');
            }

            $validated['pdf_path'] = $pdfPath;
        } else {
            unset($validated['pdf_path']);
        }

        $annualReport->update($validated);

        if (
            $request->hasFile('pdf_path')
            && filled($previousPdf)
            && Storage::disk('public')->exists($previousPdf)
            && ! Storage::disk('public')->delete($previousPdf)
        ) {
            throw new RuntimeException('The previous annual report could not be deleted.');
        }

        return to_route('admin.annual-reports.index')->with('success', 'Annual report updated');
    }

    public function destroy(AnnualReport $annualReport): RedirectResponse
    {
        $pdfPath = $annualReport->pdf_path;
        $annualReport->delete();

        if (
            filled($pdfPath)
            && Storage::disk('public')->exists($pdfPath)
            && ! Storage::disk('public')->delete($pdfPath)
        ) {
            throw new RuntimeException('The annual report could not be deleted.');
        }

        return to_route('admin.annual-reports.index')->with('success', 'Annual report deleted');
    }
}
