<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Usuario Admin (Dueño de la barbería)
        User::create([
            'name' => 'Admin Barbería',
            'email' => 'admin@barberia.com',
            'password' => bcrypt('admin123'),
            'role' => User::ROLE_ADMIN,
            'email_verified_at' => now(),
        ]);

        // Usuario Barbero (Empleado)
        User::create([
            'name' => 'Carlos Barbero',
            'email' => 'barbero@barberia.com',
            'password' => bcrypt('barbero123'),
            'role' => User::ROLE_BARBER,
            'email_verified_at' => now(),
        ]);

        // Llamar al ServiceSeeder
        $this->call([
            ServiceSeeder::class,
        ]);
    }
}
