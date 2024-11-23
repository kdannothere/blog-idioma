<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

/* 

tasks:

add attachments
create emails notifications
add notification settings

bugs:

msg visible after creating post - go to dashboard - go to post - go to dashboard.
Possible solutions: make more complicated msg by attaching msgId, save it in cache or db

*/


Route::get('/', [PostController::class, 'index'])->name('home');

Route::get('/users/{user}/posts', [PostController::class, 'indexUser'])->name('posts.user');

Route::resource('posts', PostController::class)->except(['index', 'indexUser']);

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::fallback(function () {
    return inertia('NotFound');
});

require __DIR__ . '/auth.php';
