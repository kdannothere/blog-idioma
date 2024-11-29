<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware(['auth', 'verified'])
        ];
    }

    public function index()
    {
        $posts = Auth::user()->posts()->latest()->with('user')->paginate(6);
        // $posts = Post::where('user_id', Auth::id())->latest()->paginate(6);

        return inertia('Dashboard', ['posts' => $posts]);
    }
}
