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
        // Obtener la primera barbería (creada en DatabaseSeeder)
        $barbershop = Barbershop::first();

        if (!$barbershop) {
            $this->command->warn('No hay barberías creadas. Crea una barbería primero.');
            return;
        }

        $services = [
            [
                'name' => 'Corte con máquina',
                'duration' => 30,
                'price' => 7000.00,
                'is_active' => true,
            ],
            [
                'name' => 'Corte y barba',
                'duration' => 60,
                'price' => 11000.00,
                'is_active' => true,
            ],
        ];

        foreach ($services as $service) {
            Service::firstOrCreate(
                [
                    'barbershop_id' => $barbershop->id,
                    'name' => $service['name'],
                ],
                $service
            );
        }

        $this->command->info('Servicios precargados exitosamente.');
    }
}
