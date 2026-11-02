<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Bid;
use App\Models\JobPosting;
use App\Models\News;
use App\Models\Official;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return $this->index();
    }

    public function index(): Response
    {
        return Inertia::render('dashboard', [
            'stats' => [
                'news' => News::query()->count(),
                'jobs' => JobPosting::query()->count(),
                'bids' => Bid::query()->count(),
                'officials' => Official::query()->count(),
            ],
        ]);
    }
}
