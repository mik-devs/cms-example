<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('public/contact', [
            'settings' => Setting::query()
                ->pluck('value', 'key')
                ->toArray(),
        ]);
    }
}
