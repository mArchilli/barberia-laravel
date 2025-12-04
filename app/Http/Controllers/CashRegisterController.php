<?php

namespace App\Http\Controllers;

use App\Models\Cut;
use App\Models\Barbershop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CashRegisterController extends Controller
{
    public function index()
    {
        $barbershopId = session('selected_barbershop_id');
        $barbershop = Barbershop::findOrFail($barbershopId);
        
        // Obtener todos los cortes del día de la barbería
        $cutsToday = Cut::whereDate('service_date', today())
            ->whereHas('barber', function($query) use ($barbershopId) {
                $query->where('barbershop_id', $barbershopId);
            })
            ->with(['service', 'barber', 'paymentMethod'])
            ->orderBy('service_date', 'desc')
            ->get();

        // Total de cortes del día
        $totalCuts = $cutsToday->count();
        
        // Total facturado del día
        $totalRevenue = $cutsToday->sum('final_price');
        
        // Agrupar por método de pago
        $revenueByPaymentMethod = $cutsToday->groupBy('payment_method_id')->map(function($cuts) {
            return [
                'payment_method' => $cuts->first()->paymentMethod ? $cuts->first()->paymentMethod->name : 'Sin especificar',
                'total' => $cuts->sum('final_price'),
                'count' => $cuts->count(),
            ];
        })->values();
        
        // Calcular totales por tipo de pago específico
        $cashTotal = 0;
        $cardTotal = 0;
        $transferTotal = 0;
        
        foreach ($revenueByPaymentMethod as $payment) {
            $method = strtolower($payment['payment_method']);
            if (str_contains($method, 'efectivo') || str_contains($method, 'cash')) {
                $cashTotal += $payment['total'];
            } elseif (str_contains($method, 'tarjeta') || str_contains($method, 'card')) {
                $cardTotal += $payment['total'];
            } elseif (str_contains($method, 'transferencia') || str_contains($method, 'transfer')) {
                $transferTotal += $payment['total'];
            }
        }

        return Inertia::render('Admin/CashRegister/Index', [
            'barbershop' => $barbershop,
            'cuts' => $cutsToday,
            'stats' => [
                'total_cuts' => $totalCuts,
                'total_revenue' => $totalRevenue,
                'cash_total' => $cashTotal,
                'card_total' => $cardTotal,
                'transfer_total' => $transferTotal,
            ],
            'revenueByPaymentMethod' => $revenueByPaymentMethod,
        ]);
    }
}
