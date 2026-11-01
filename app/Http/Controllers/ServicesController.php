<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class ServicesController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('public/services', [
            'services' => Service::query()
                ->where('is_active', true)
                ->orderBy('order')
                ->get(),
        ]);
    }
}
