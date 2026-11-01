<?php

namespace App\Http\Controllers;

use App\Models\AnnualReport;
use App\Models\Bid;
use Inertia\Inertia;
use Inertia\Response;

class TransparencyController extends Controller
{
    public function index(): Response
    {
        return $this->render();
    }

    public function bids(): Response
    {
        return $this->render('bids');
    }

    public function reports(): Response
    {
        return $this->render('reports');
    }

    private function render(?string $tab = null): Response
    {
        return Inertia::render('public/transparency', [
            'bids' => Bid::query()
                ->orderByDesc('date_posted')
                ->get(),
            'annualReports' => AnnualReport::query()
                ->orderByDesc('year')
                ->orderByDesc('date_posted')
                ->get(),
            'tab' => $tab,
        ]);
    }
}
