<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/users/index', [
            'users' => User::query()
                ->whereDoesntHave('roles', function ($query): void {
                    $query->where('name', 'super_admin');
                })
                ->with('roles:id,name')
                ->orderBy('name')
                ->get(),
            'roles' => Role::query()
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/users/create', [
            'roles' => Role::query()
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $user = User::query()->create([
            'name' => $request->string('name')->toString(),
            'email' => $request->string('email')->toString(),
            'password' => Hash::make($request->string('password')->toString()),
            'email_verified_at' => now(),
        ]);

        $user->syncRoles([$request->string('role')->toString()]);

        return to_route('admin.users.index')->with('success', 'User created successfully.');
    }

    public function edit(User $user): Response
    {
        return Inertia::render('admin/users/edit', [
            'user' => $user->loadMissing('roles:id,name'),
            'roles' => Role::query()
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $data = [
            'name' => $request->string('name')->toString(),
            'email' => $request->string('email')->toString(),
        ];

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->string('password')->toString());
        }

        $user->update($data);
        $user->syncRoles([$request->string('role')->toString()]);

        return to_route('admin.users.index')->with('success', 'User updated successfully.');
    }

    public function destroy(Request $request, User $user): RedirectResponse
    {
        if ($user->id === $request->user()?->id) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        $user->delete();

        return to_route('admin.users.index')->with('success', 'User deleted successfully.');
    }
}
