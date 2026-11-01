<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use App\Models\AnnualReport;
use App\Models\Barangay;
use App\Models\Bid;
use App\Models\EmergencyContact;
use App\Models\HeroSlide;
use App\Models\JobPosting;
use App\Models\MayorMessage;
use App\Models\News;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Stat;
use App\Models\TourismSpot;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('public/home', [
            'settings' => Setting::query()
                ->pluck('value', 'key')
                ->toArray(),
            'heroSlides' => HeroSlide::query()
                ->where('is_active', true)
                ->orderBy('order')
                ->get(),
            'stats' => Stat::query()
                ->where('is_active', true)
                ->orderBy('order')
                ->get(),
            'services' => Service::query()
                ->where('is_active', true)
                ->orderBy('order')
                ->get(),
            'latestNews' => News::query()
                ->where('status', 'published')
                ->whereNotNull('published_at')
                ->orderByDesc('published_at')
                ->take(4)
                ->get(),
            'achievements' => Achievement::query()
                ->where('is_active', true)
                ->orderBy('order')
                ->get(),
            'barangays' => Barangay::query()
                ->orderBy('order')
                ->orderBy('name')
                ->get(),
            'tourismSpots' => TourismSpot::query()
                ->where('is_active', true)
                ->orderBy('order')
                ->get(),
            'latestJobs' => JobPosting::query()
                ->where('status', 'open')
                ->orderByDesc('created_at')
                ->take(3)
                ->get(),
            'emergencyContacts' => EmergencyContact::query()
                ->where('is_active', true)
                ->orderBy('order')
                ->get(),
            'bids' => Bid::query()
                ->orderByDesc('date_posted')
                ->take(2)
                ->get(),
            'annualReports' => AnnualReport::query()
                ->orderByDesc('year')
                ->orderByDesc('date_posted')
                ->take(4)
                ->get(),
            'mayorMessages' => MayorMessage::query()
                ->published()
                ->orderByDesc('published_at')
                ->orderByDesc('id')
                ->take(10)
                ->get(),
        ]);
    }
}
