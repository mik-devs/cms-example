<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\GovernmentController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\TransparencyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::inertia('/welcome', 'welcome')->name('welcome');

Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/about/history', [AboutController::class, 'index'])
    ->defaults('section', 'history')
    ->name('about.history');
Route::get('/about/demographic', [AboutController::class, 'index'])
    ->defaults('section', 'demographic')
    ->name('about.demographic');
Route::get('/about/socio-economic', [AboutController::class, 'index'])
    ->defaults('section', 'socio-economic')
    ->name('about.socio-economic');
Route::get('/about/geography', [AboutController::class, 'index'])
    ->defaults('section', 'geography')
    ->name('about.geography');

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
Route::get('/achievements', fn () => Inertia::render('public/coming-soon', ['title' => 'Achievements']))
    ->name('achievements');
Route::get('/barangays', fn () => Inertia::render('public/coming-soon', ['title' => 'Barangays']))
    ->name('barangays');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
