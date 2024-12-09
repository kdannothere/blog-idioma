<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubscriberController;
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

Route::resource('posts', PostController::class)->except(['index', 'indexUser', 'show']);

Route::get('/users/{user}/posts', [PostController::class, 'indexUser'])->name('posts.user');

Route::get('posts/{post}', [PostController::class, 'show'])->name('posts.show');
// Route::post('posts/{post}', [PostController::class, 'update'])->name('posts.update');

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::post('/users/{user}/subscribe', [SubscriberController::class, 'subscribe'])->name('user.subscribe');
Route::post('/users/{user}/unsubscribe', [SubscriberController::class, 'unsubscribe'])->name('user.unsubscribe');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::fallback(function () {
    return inertia('NotFound');
})->name('404');

require __DIR__ . '/auth.php';
