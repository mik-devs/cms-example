<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function history(): Response
    {
        return Inertia::render('public/about/history');
    }

    public function demographic(): Response
    {
        return Inertia::render('public/about/demographic');
    }

    public function socioEconomic(): Response
    {
        return Inertia::render('public/about/socio-economic');
    }

    public function geography(): Response
    {
        return Inertia::render('public/about/geography');
    }
}
