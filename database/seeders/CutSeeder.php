<?php

namespace Database\Seeders;

use App\Models\Barbershop;
use App\Models\Cut;
use App\Models\PaymentMethod;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $barbershop = Barbershop::first();

        if (!$barbershop) {
            $this->command->warn('No hay barberías creadas. Crea una barbería primero.');
            return;
        }

        // Profesionales que registran cortes: admin + barberos de la barbería
        $barbers = User::where('barbershop_id', $barbershop->id)
            ->whereIn('role', [User::ROLE_ADMIN, User::ROLE_BARBER])
            ->get();

        $services = Service::where('barbershop_id', $barbershop->id)->get();
        $paymentMethods = PaymentMethod::where('barbershop_id', $barbershop->id)->get();

        if ($barbers->isEmpty() || $services->isEmpty() || $paymentMethods->isEmpty()) {
            $this->command->warn('Faltan barberos, servicios o métodos de pago para generar cortes.');
            return;
        }

        // Evitar duplicar cortes si el seeder se ejecuta varias veces
        if (Cut::query()->exists()) {
            $this->command->info('Ya existen cortes registrados, se omite la generación.');
            return;
        }

        $clientNames = [
            'Juan Rodríguez', 'Lucas Fernández', 'Mateo López', 'Santiago Díaz',
            'Tomás Ruiz', 'Nicolás Sosa', 'Bruno Castro', 'Facundo Romero',
            'Ramiro Acosta', 'Iván Molina', 'Joaquín Herrera', 'Agustín Vega',
            'Federico Cabrera', 'Gonzalo Ramírez', 'Emiliano Suárez',
        ];

        $cutsToCreate = [];

        // Generar cortes para los últimos 90 días (incluido hoy)
        for ($daysAgo = 90; $daysAgo >= 0; $daysAgo--) {
            $date = now()->subDays($daysAgo);

            // Domingo cerrado
            if ($date->isSunday()) {
                continue;
            }

            foreach ($barbers as $barber) {
                // Entre 1 y 5 cortes por barbero por día
                $cutsPerDay = random_int(1, 5);

                for ($i = 0; $i < $cutsPerDay; $i++) {
                    $service = $services->random();

                    // Hora de atención entre las 9 y las 19 hs
                    $serviceDate = $date->copy()->setTime(random_int(9, 19), [0, 15, 30, 45][random_int(0, 3)]);

                    // El precio final parte del precio del servicio con una
                    // pequeña variación para reflejar adicionales/descuentos
                    $basePrice = (float) $service->price;
                    $finalPrice = $basePrice + (random_int(-1, 2) * 500);

                    $cutsToCreate[] = [
                        'barber_id' => $barber->id,
                        'service_id' => $service->id,
                        'payment_method_id' => $paymentMethods->random()->id,
                        'client_name' => $clientNames[array_rand($clientNames)],
                        'service_date' => $serviceDate->format('Y-m-d H:i:s'),
                        'final_price' => max(0, $finalPrice),
                        'created_at' => $serviceDate->format('Y-m-d H:i:s'),
                        'updated_at' => $serviceDate->format('Y-m-d H:i:s'),
                    ];
                }
            }
        }

        // Inserción por lotes para mayor rendimiento
        foreach (array_chunk($cutsToCreate, 200) as $chunk) {
            Cut::insert($chunk);
        }

        $this->command->info('Cortes de ejemplo generados: ' . count($cutsToCreate));
    }
}
