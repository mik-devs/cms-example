<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Bid;
use App\Models\JobPosting;
use App\Models\News;
use App\Models\Official;
use App\Models\TourismSpot;
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
        $upcomingJobs = JobPosting::query()
            ->whereNotNull('deadline')
            ->where('deadline', '>=', now()->toDateString())
            ->orderBy('deadline')
            ->take(5)
            ->get()
            ->map(fn (JobPosting $job) => [
                'title' => $job->title,
                'date' => $job->deadline?->toDateString(),
                'type' => 'Job Deadline',
            ]);

        $upcomingNews = News::query()
            ->whereNotNull('published_at')
            ->where('published_at', '>=', now())
            ->orderBy('published_at')
            ->take(5)
            ->get()
            ->map(fn (News $news) => [
                'title' => $news->title,
                'date' => $news->published_at?->toDateString(),
                'type' => 'News Publish',
            ]);

        $upcomingEvents = $upcomingJobs
            ->concat($upcomingNews)
            ->sortBy('date')
            ->take(8)
            ->values();

        $recentActivity = collect()
            ->concat(
                News::query()->latest()->take(5)->get()->map(fn (News $item) => [
                    'type' => 'News',
                    'title' => $item->title,
                    'created_at' => $item->created_at?->toDateTimeString(),
                ]),
            )
            ->concat(
                JobPosting::query()->latest()->take(5)->get()->map(fn (JobPosting $item) => [
                    'type' => 'Job',
                    'title' => $item->title,
                    'created_at' => $item->created_at?->toDateTimeString(),
                ]),
            )
            ->concat(
                TourismSpot::query()->latest()->take(5)->get()->map(fn (TourismSpot $item) => [
                    'type' => 'Tourism',
                    'title' => $item->name,
                    'created_at' => $item->created_at?->toDateTimeString(),
                ]),
            )
            ->sortByDesc('created_at')
            ->take(5)
            ->values();

        return Inertia::render('dashboard', [
            'stats' => [
                'news' => News::query()->count(),
                'jobs' => JobPosting::query()->count(),
                'bids' => Bid::query()->count(),
                'officials' => Official::query()->count(),
                'tourism' => TourismSpot::query()->count(),
            ],
            'upcomingEvents' => $upcomingEvents,
            'recentActivity' => $recentActivity,
        ]);
    }
}
