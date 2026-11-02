<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreEmergencyContactRequest;
use App\Http\Requests\Admin\UpdateEmergencyContactRequest;
use App\Models\EmergencyContact;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class EmergencyContactController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/emergency-contacts/index', [
            'emergencyContacts' => EmergencyContact::query()
                ->orderBy('order')
                ->orderBy('id')
                ->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/emergency-contacts/create');
    }

    public function store(StoreEmergencyContactRequest $request): RedirectResponse
    {
        EmergencyContact::query()->create($request->validated());

        return to_route('admin.emergency-contacts.index')->with('success', 'Emergency contact created');
    }

    public function edit(EmergencyContact $emergencyContact): Response
    {
        return Inertia::render('admin/emergency-contacts/edit', [
            'emergencyContact' => $emergencyContact,
        ]);
    }

    public function update(
        UpdateEmergencyContactRequest $request,
        EmergencyContact $emergencyContact,
    ): RedirectResponse {
        $emergencyContact->update($request->validated());

        return to_route('admin.emergency-contacts.index')->with('success', 'Emergency contact updated');
    }

    public function destroy(EmergencyContact $emergencyContact): RedirectResponse
    {
        $emergencyContact->delete();

        return to_route('admin.emergency-contacts.index')->with('success', 'Emergency contact deleted');
    }
}
