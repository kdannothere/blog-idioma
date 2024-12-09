<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subscriber extends Model
{
    protected $fillable = [
        'email'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
