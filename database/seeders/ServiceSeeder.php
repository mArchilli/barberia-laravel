<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\Barbershop;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtener la primera barbería (debes tener al menos una creada)
        $barbershop = Barbershop::first();

        if (!$barbershop) {
            $this->command->warn('No hay barberías creadas. Crea una barbería primero.');
            return;
        }

        $services = [
            [
                'barbershop_id' => $barbershop->id,
                'name' => 'Corte Clásico',
                'duration' => 30,
                'price' => 25.00,
                'is_active' => true,
            ],
            [
                'barbershop_id' => $barbershop->id,
                'name' => 'Claritos',
                'duration' => 45,
                'price' => 35.00,
                'is_active' => true,
            ],
            [
                'barbershop_id' => $barbershop->id,
                'name' => 'Corte + Barba',
                'duration' => 60,
                'price' => 40.00,
                'is_active' => true,
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }

        $this->command->info('Servicios precargados exitosamente.');
    }
}
