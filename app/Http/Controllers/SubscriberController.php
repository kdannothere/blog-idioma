<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

class SubscriberController extends Controller implements HasMiddleware
{

    // Middleware
    public static function middleware(): array
    {
        return [new Middleware('auth')];
    }

    public function subscribe(User $user)
    {
        $currentUser = Auth::user();
        $subscriber = null;

        if ($currentUser && $currentUser->id !== $user->id) {
            $subscriber = Subscriber::where('email', $currentUser->email)
                ->where('user_id', $user->id)
                ->first();

            if ($subscriber) return;

            // Create a subscriber
            $user->subscribers()->create([
                'email' => $currentUser->email
            ]);
        }
        return back();
    }

    public function unsubscribe(User $user)
    {
        $currentUser = Auth::user();
        $subscriber = null;

        if ($currentUser && $currentUser->id !== $user->id) {
            $subscriber = Subscriber::where('email', $currentUser->email)
                ->where('user_id', $user->id)
                ->first();

                // Delete a subscriber if exists
            if ($subscriber) {
                Subscriber::destroy($subscriber->id);
            };
        }
        return back();
    }
}
