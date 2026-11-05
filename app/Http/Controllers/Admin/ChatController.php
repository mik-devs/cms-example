<?php

namespace App\Http\Controllers\Admin;

use App\Events\MessageSent;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreMessageRequest;
use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ChatController extends Controller
{
    public function index(Request $request): Response
    {
        $currentUser = $request->user();

        $users = User::query()
            ->whereKeyNot($currentUser->getKey())
            ->orderBy('name')
            ->get(['id', 'name', 'email']);

        $activeUser = null;
        $messages = collect();

        if ($request->filled('user_id')) {
            $activeUser = User::query()
                ->whereKeyNot($currentUser->getKey())
                ->findOrFail($request->integer('user_id'));

            $messages = Message::query()
                ->with('sender:id,name')
                ->where(function (Builder $query) use ($currentUser, $activeUser): void {
                    $query->where(function (Builder $conversation) use ($currentUser, $activeUser): void {
                        $conversation->where('sender_id', $currentUser->getKey())
                            ->where('receiver_id', $activeUser->getKey());
                    })->orWhere(function (Builder $conversation) use ($currentUser, $activeUser): void {
                        $conversation->where('sender_id', $activeUser->getKey())
                            ->where('receiver_id', $currentUser->getKey());
                    });
                })
                ->orderBy('created_at')
                ->orderBy('id')
                ->get();
        }

        return Inertia::render('admin/chat/index', [
            'users' => $users,
            'activeUserId' => $activeUser?->getKey(),
            'messages' => $messages,
        ]);
    }

    public function store(StoreMessageRequest $request): RedirectResponse
    {
        $message = Message::query()->create([
            'sender_id' => $request->user()->getKey(),
            'receiver_id' => $request->integer('receiver_id'),
            'message' => $request->string('message')->toString(),
        ]);

        MessageSent::dispatch($message->loadMissing('sender'));

        return back();
    }
}
