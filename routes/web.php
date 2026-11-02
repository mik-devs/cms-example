<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\Admin\AchievementController;
use App\Http\Controllers\Admin\AnnualReportController;
use App\Http\Controllers\Admin\BarangayController;
use App\Http\Controllers\Admin\BidController;
use App\Http\Controllers\Admin\HeroSlideController;
use App\Http\Controllers\Admin\JobController;
use App\Http\Controllers\Admin\MayorMessageController;
use App\Http\Controllers\Admin\OfficialController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\StatController;
use App\Http\Controllers\BarangayController as PublicBarangayController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\GovernmentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\TourismController;
use App\Http\Controllers\TransparencyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::inertia('/welcome', 'welcome')->name('welcome');

Route::redirect('/about', '/about/history')->name('about');
Route::get('/about/history', [AboutController::class, 'history'])->name('about.history');
Route::get('/about/demographic', [AboutController::class, 'demographic'])->name('about.demographic');
Route::get('/about/socio-economic', [AboutController::class, 'socioEconomic'])->name('about.socio-economic');
Route::get('/about/geography', [AboutController::class, 'geography'])->name('about.geography');

Route::get('/government', [GovernmentController::class, 'index'])->name('government');
Route::get('/government/vision-mission', [GovernmentController::class, 'index'])
    ->defaults('tab', 'vision-mission')
    ->name('government.vision-mission');
Route::get('/government/officials', [GovernmentController::class, 'officials'])
    ->name('government.officials');
Route::get('/government/sangguniang-bayan', [GovernmentController::class, 'index'])
    ->defaults('tab', 'sangguniang-bayan')
    ->name('government.sangguniang-bayan');
Route::get('/government/citizens-charter', [GovernmentController::class, 'index'])
    ->defaults('tab', 'citizens-charter')
    ->name('government.citizens-charter');
Route::get('/government/directories', [GovernmentController::class, 'index'])
    ->defaults('tab', 'directories')
    ->name('government.directories');

Route::get('/services', [ServicesController::class, 'index'])->name('services');

Route::get('/transparency', [TransparencyController::class, 'index'])->name('transparency');
Route::get('/transparency/bids', [TransparencyController::class, 'bids'])
    ->name('transparency.bids');
Route::get('/transparency/reports', [TransparencyController::class, 'reports'])
    ->name('transparency.reports');

Route::get('/contact', [ContactController::class, 'index'])->name('contact');

Route::get('/news', [NewsController::class, 'index'])->name('news.index');
Route::get('/news/{slug}', [NewsController::class, 'show'])->name('news.show');

Route::get('/careers', fn () => Inertia::render('public/coming-soon', ['title' => 'Careers']))
    ->name('careers');
Route::get('/tourism', fn () => Inertia::render('public/coming-soon', ['title' => 'Tourism']))
    ->name('tourism');
Route::get('/tourism/{slug}', [TourismController::class, 'show'])
    ->name('tourism.show');
Route::get('/achievements', fn () => Inertia::render('public/coming-soon', ['title' => 'Achievements']))
    ->name('achievements');
Route::get('/barangays', fn () => Inertia::render('public/coming-soon', ['title' => 'Barangays']))
    ->name('barangays');
Route::get('/barangays/{slug}', [PublicBarangayController::class, 'show'])
    ->name('barangays.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::prefix('admin')
    ->name('admin.')
    ->middleware(['auth', 'verified'])
    ->group(function () {
        Route::middleware('can:manage news')->group(function () {
            Route::resource('news', App\Http\Controllers\Admin\NewsController::class)
                ->except('show');
        });
        Route::middleware('can:manage services')->group(function () {
            Route::resource('services', ServiceController::class)
                ->except('show');
        });
        Route::middleware('can:manage achievements')->group(function () {
            Route::resource('achievements', AchievementController::class)
                ->except('show');
        });
        Route::middleware('can:manage jobs')->group(function () {
            Route::resource('jobs', JobController::class)
                ->except('show');
        });
        Route::middleware('can:manage bids')->group(function () {
            Route::resource('bids', BidController::class)
                ->except('show');
        });
        Route::middleware('can:manage reports')->group(function () {
            Route::resource('annual-reports', AnnualReportController::class)
                ->except('show');
        });
        Route::middleware('can:manage officials')->group(function () {
            Route::resource('officials', OfficialController::class)
                ->except('show');
            Route::resource('mayor-messages', MayorMessageController::class)
                ->except('show');
        });
        Route::middleware('can:manage settings')->group(function () {
            Route::resource('barangays', BarangayController::class)
                ->except('show');
            Route::get('settings', [SettingController::class, 'index'])
                ->name('settings.index');
            Route::put('settings', [SettingController::class, 'update'])
                ->name('settings.update');
        });
        Route::middleware('can:manage hero')->group(function () {
            Route::resource('hero-slides', HeroSlideController::class)
                ->except('show');
        });
        Route::middleware('can:manage stats')->group(function () {
            Route::resource('stats', StatController::class)
                ->except('show');
        });
    });

require __DIR__.'/settings.php';
