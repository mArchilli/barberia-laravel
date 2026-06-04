<?php

namespace Database\Seeders;

use App\Models\Barbershop;
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
        // 1) Barbería principal
        $barbershop = Barbershop::firstOrCreate(
            ['name' => 'Barbería Central'],
            [
                'address' => 'Av. Siempre Viva 742',
                'phone' => '1122334455',
                'opening_time' => '09:00',
                'closing_time' => '20:00',
                'accent_color' => '#1f2937',
            ]
        );

        // Horarios de atención (lunes a sábado)
        $days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        if ($barbershop->schedules()->count() === 0) {
            foreach ($days as $day) {
                $barbershop->schedules()->create([
                    'day_of_week' => $day,
                    'start_time' => '09:00',
                    'end_time' => '20:00',
                ]);
            }
        }

        // 2) Usuario Admin (Dueño de la barbería)
        User::firstOrCreate(
            ['email' => 'admin@barberia.com'],
            [
                'name' => 'Admin Barbería',
                'password' => bcrypt('admin123'),
                'role' => User::ROLE_ADMIN,
                'barbershop_id' => $barbershop->id,
                'email_verified_at' => now(),
            ]
        );

        // 3) Barberos vinculados a la barbería
        User::firstOrCreate(
            ['email' => 'carlos@barberia.com'],
            [
                'name' => 'Carlos Gómez',
                'password' => bcrypt('barbero123'),
                'role' => User::ROLE_BARBER,
                'barbershop_id' => $barbershop->id,
                'email_verified_at' => now(),
            ]
        );

        User::firstOrCreate(
            ['email' => 'martin@barberia.com'],
            [
                'name' => 'Martín Pérez',
                'password' => bcrypt('barbero123'),
                'role' => User::ROLE_BARBER,
                'barbershop_id' => $barbershop->id,
                'email_verified_at' => now(),
            ]
        );

        // 4) Servicios, métodos de pago y cortes de ejemplo
        $this->call([
            ServiceSeeder::class,
            PaymentMethodSeeder::class,
            CutSeeder::class,
        ]);

        $this->command->info('Seed completo: admin, barbería, 2 barberos, servicios y cortes de ejemplo.');
    }
}
