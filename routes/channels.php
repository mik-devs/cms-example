<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('chat.{userId}', function ($user, int $userId): bool {
    return (int) $user->getKey() === $userId;
});
