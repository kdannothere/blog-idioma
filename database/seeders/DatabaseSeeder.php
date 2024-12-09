<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(1)->create([
            'name' => 'user 1',
            'email' => 'user1@user.com',
            'password' => '12345678',
        ]);
        
        User::factory(1)->create([
            'name' => 'user 2',
            'email' => 'user2@user.com',
            'password' => '12345678',
        ]);

        Post::factory(100)->create([
            'user_id' => 1,
            'title' => fake()->sentence(),
            'body' => fake()->paragraph(20),
        ]);

        Post::factory(100)->create([
            'user_id' => 2,
            'title' => fake()->sentence(),
            'body' => fake()->paragraph(20),
        ]);
    }
}
