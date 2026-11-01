<?php

use App\Http\Controllers\Api\ChatbotController;
use Illuminate\Support\Facades\Route;

Route::post('/chat', [ChatbotController::class, 'chat'])->middleware('throttle:10,1')->name('api.chat');
