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
                'name' => 'Afeitado Premium',
                'duration' => 45,
                'price' => 35.00,
                'is_active' => true,
            ],
            [
                'barbershop_id' => $barbershop->id,
                'name' => 'Barba & Bigote',
                'duration' => 25,
                'price' => 20.00,
                'is_active' => true,
            ],
            [
                'barbershop_id' => $barbershop->id,
                'name' => 'Corte + Barba',
                'duration' => 60,
                'price' => 40.00,
                'is_active' => true,
            ],
            [
                'barbershop_id' => $barbershop->id,
                'name' => 'Tratamiento Capilar',
                'duration' => 40,
                'price' => 30.00,
                'is_active' => true,
            ],
            [
                'barbershop_id' => $barbershop->id,
                'name' => 'Diseño Artístico',
                'duration' => 20,
                'price' => 15.00,
                'is_active' => true,
            ],
            [
                'barbershop_id' => $barbershop->id,
                'name' => 'Corte Infantil',
                'duration' => 25,
                'price' => 18.00,
                'is_active' => true,
            ],
            [
                'barbershop_id' => $barbershop->id,
                'name' => 'Tinte de Barba',
                'duration' => 35,
                'price' => 28.00,
                'is_active' => true,
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }

        $this->command->info('Servicios precargados exitosamente.');
    }
}
