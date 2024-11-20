<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller implements HasMiddleware
{

    // Middleware
    public static function middleware(): array
    {
        return [new Middleware('auth', except: ['index'])];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::latest()->paginate(6);

        return inertia('Home', ['posts' => $posts]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('post/CreatePost');
    }

    /**as
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'title' => ['required', 'min:1', 'max:255'],
            'body' => ['required', 'min:1', 'max:40000']
        ]);

        Auth::user()->posts()->create($fields);

        return redirect(route('posts.index'))->with('message', 'Created post successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return inertia('post/PostDetails', ['post' => $post]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return inertia('post/EditPost', ['post' => $post]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $fields = $request->validate([
            'title' => ['required', 'min:1', 'max:255'],
            'body' => ['required', 'min:1', 'max:40000']
        ]);

        $post->update($fields);

        return redirect(route('posts.index'))->with('message', 'Edited post successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return redirect(route('posts.index'))->with('message', 'Deleted post successfully');
    }
}
