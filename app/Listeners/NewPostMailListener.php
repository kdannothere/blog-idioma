<?php

namespace App\Listeners;

use App\Events\NewPostMailEvent;
use App\Mail\Post\NewPostMail;
use App\Models\Subscriber;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class NewPostMailListener implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(NewPostMailEvent $event): void
    {
        $subscribers = Subscriber::where('user_id', $event->userId)->get();

        foreach ($subscribers as $subscriber) {
            Mail::to($subscriber->email)->send(new NewPostMail($event->post, $event->postUrl));
        }
    }
}
