<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Post::factory(10)->create([
            'user_id' => 1,
            'title' => fake()->sentence(),
            'body' => fake()->paragraph(20),
        ]);
    }
}
