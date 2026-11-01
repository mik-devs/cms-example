<?php

namespace App\Http\Controllers;

use App\Models\Barangay;
use Inertia\Inertia;
use Inertia\Response;

class BarangayController extends Controller
{
    public function show(string $slug): Response
    {
        $barangay = Barangay::query()
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('public/barangays/show', [
            'barangay' => $barangay,
        ]);
    }
}
