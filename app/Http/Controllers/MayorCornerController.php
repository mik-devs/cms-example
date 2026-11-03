<?php

namespace App\Http\Controllers;

use App\Models\MayorMessage;
use Inertia\Inertia;
use Inertia\Response;

class MayorCornerController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('public/mayors-corner', [
            'messages' => MayorMessage::query()
                ->published()
                ->orderByDesc('published_at')
                ->orderByDesc('id')
                ->get(),
        ]);
    }
}
