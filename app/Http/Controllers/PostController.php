<?php

namespace App\Http\Controllers;

use App\Mail\Post\NewPostMail;
use App\Models\Post;
use App\Models\Subscriber;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

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
        $currentUser = Auth::user();
        $posts = $user->posts()->latest()->with('user')->paginate(6);
        $isSubscribed = false;
        $isAuthor = false;

        if ($currentUser && $currentUser->id === $user->id) {
            $isAuthor = true;
        }

        if ($currentUser && !$isAuthor) {
            $isSubscribed = Subscriber::where('email', $currentUser->email)
                ->where('user_id', $user->id)
                ->first() && true;
        }

        return inertia('post/UserPosts', ['posts' => $posts, 'user' => $user, 'isSubscribed' => $isSubscribed, 'isAuthor' => $isAuthor]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('post/CreatePost');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate
        $request->validate([
            'title' => ['required', 'min:1', 'max:255'],
            'body' => ['required', 'min:1', 'max:40000'],
            'image' => ['nullable', 'file', 'max:1000', 'mimes:webp,jpg,png'],
        ]);

        // Store post image if exists
        $path = null;
        if ($request->hasFile('image')) {
            $path = Storage::disk('public')->put('posts_images', $request->image);
        }

        $user = Auth::user();

        // Create a post
        $post = $user->posts()->create([
            'title' => $request->title,
            'body' => $request->body,
            'image' => $path,
        ]);

        $postUrl = url()->route('posts.show', $post);
        
        $subscribers = Subscriber::where('user_id', $user->id);
        
        $subscribers->each(function ($subscriber) use ($post, $postUrl) {
            Mail::to($subscriber->email)->send(new NewPostMail($post, $postUrl));
        });

        // Redirect back to dashboard with a message
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
        // Authorizing the action
        Gate::authorize('modify', $post);

        return inertia('post/EditPost', ['currentPost' => $post]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        // Authorizing the action
        Gate::authorize('modify', $post);

        $request->validate([
            'title' => ['required', 'min:1', 'max:255'],
            'body' => ['required', 'min:1', 'max:40000'],
            'image' => ['nullable', 'file', 'max:2048', 'mimes:webp,jpg,png'],
        ]);

        // Store post image if exists
        $path = $post->image ?? null;
        if ($request->hasFile('image')) {
            // Delete previous post image if exists
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }
            $path = Storage::disk('public')->put('posts_images', $request->image);
        } else {
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
                $path = null;
            }
        }

        $post->update([
            'title' => $request->title,
            'body' => $request->body,
            'image' => $path,
        ]);

        return redirect(route('dashboard'))->with('message', 'Updated post successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        // Authorizing the action
        Gate::authorize('modify', $post);

        // Delete post image if exists
        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }
        $post->delete();

        return redirect(route('dashboard'))->with('message', 'Deleted post successfully');
    }
}
