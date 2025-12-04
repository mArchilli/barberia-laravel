<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PaymentMethod;
use App\Models\Barbershop;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtener todas las barberías
        $barbershops = Barbershop::all();

        // Métodos de pago predeterminados
        $paymentMethods = [
            ['name' => 'Efectivo', 'is_active' => true],
            ['name' => 'Transferencia', 'is_active' => true],
            ['name' => 'Débito/Crédito', 'is_active' => true],
        ];

        // Crear métodos de pago para cada barbería
        foreach ($barbershops as $barbershop) {
            foreach ($paymentMethods as $method) {
                PaymentMethod::create([
                    'barbershop_id' => $barbershop->id,
                    'name' => $method['name'],
                    'is_active' => $method['is_active'],
                ]);
            }
        }
    }
}
