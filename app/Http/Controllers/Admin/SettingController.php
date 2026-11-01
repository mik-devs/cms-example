<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    private const array EDITABLE_SETTINGS = [
        'site_name',
        'tagline',
        'address',
        'phone',
        'email',
        'office_hours',
        'map_embed',
    ];

    public function index(): Response
    {
        return Inertia::render('admin/settings/index', [
            'settings' => Setting::query()
                ->whereIn('key', self::EDITABLE_SETTINGS)
                ->pluck('value', 'key'),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'site_name' => ['required', 'string', 'max:255'],
            'tagline' => ['required', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'office_hours' => ['nullable', 'string', 'max:255'],
            'map_embed' => [
                'nullable',
                'url',
                'regex:/^https:\/\/(?:(?:www\.)?google\.com|maps\.google\.com)\/maps\/embed(?:[?#]|$)/i',
                'max:2048',
            ],
        ]);

        foreach ($validated as $key => $value) {
            Setting::query()->updateOrCreate(
                ['key' => $key],
                ['value' => $value],
            );
        }

        return to_route('admin.settings.index')->with('success', 'Settings updated');
    }
}
