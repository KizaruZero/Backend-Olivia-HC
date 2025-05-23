<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\FaseNifasSeeder;
use Database\Seeders\NifasTaskSeeder;
use Database\Seeders\NifasSeeder;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Kizaru',
            'email' => 'kizarukaede@gmail.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        $this->call([
            UserSeeder::class,
            FaseNifasSeeder::class,
            NifasTaskSeeder::class,
            NifasSeeder::class,
        ]);
    }
}
