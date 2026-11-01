<?php

namespace App\Http\Controllers;

use App\Models\Official;
use App\Models\Setting;
use Inertia\Inertia;
use Inertia\Response;

class GovernmentController extends Controller
{
    public function index(?string $tab = null): Response
    {
        return Inertia::render('public/government', [
            'officials' => Official::query()
                ->orderBy('order')
                ->get(),
            'settings' => Setting::query()
                ->pluck('value', 'key')
                ->toArray(),
            'tab' => $tab,
        ]);
    }

    public function officials(): Response
    {
        return $this->index('officials');
    }
}
