<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller implements HasMiddleware
{

    // Middleware
    public static function middleware(): array
    {
        return [new Middleware('auth', except: ['index', 'indexUser', 'show'])];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::latest()->with('user')->paginate(6);

        return inertia('Home', ['posts' => $posts]);
    }

    /**
     * Display a User's listing of the resource.
     */
    public function indexUser(User $user)
    {
        $posts = $user->posts()->latest()->with('user')->paginate(6);

        return inertia('post/UserPosts', ['posts' => $posts, 'author' => $user->name]);
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

        return redirect(route('dashboard'))->with('message', 'Created post successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {

        $user = $post->user;

        $action = ['edit' => false, 'delete' => false];

        // check if the user is the post's owner
        if ($post->isOwner()) {
            $action = ['edit' => true, 'delete' => true];
        };

        return inertia('post/PostDetails', ['post' => $post, 'user' => $user, 'action' => $action]);
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

        return redirect(route('dashboard'))->with('message', 'Updated post successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return redirect(route('dashboard'))->with('message', 'Deleted post successfully');
    }
}
