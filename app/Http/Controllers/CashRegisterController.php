<?php

namespace App\Http\Controllers;

use App\Models\Cut;
use App\Models\Barbershop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CashRegisterController extends Controller
{
    public function index(Request $request)
    {
        $barbershopId = session('selected_barbershop_id');
        $barbershop = Barbershop::findOrFail($barbershopId);
        $adminId = Auth::id();
        
        // Determinar el rango de fechas según los parámetros
        $startDate = null;
        $endDate = null;
        
        if ($request->has('date')) {
            // Día específico
            $startDate = $request->date;
            $endDate = $request->date;
        } elseif ($request->has('start_date') && $request->has('end_date')) {
            // Rango de fechas
            $startDate = $request->start_date;
            $endDate = $request->end_date;
        } else {
            // Por defecto: hoy
            $startDate = today()->toDateString();
            $endDate = today()->toDateString();
        }
        
        // Obtener todos los cortes del rango de fechas de la barbería (barberos + admin)
        $cuts = Cut::whereDate('service_date', '>=', $startDate)
            ->whereDate('service_date', '<=', $endDate)
            ->where(function($query) use ($barbershopId, $adminId) {
                $query->whereHas('barber', function($q) use ($barbershopId) {
                    $q->where('barbershop_id', $barbershopId);
                })->orWhere('barber_id', $adminId);
            })
            ->with(['service', 'barber', 'paymentMethod'])
            ->orderBy('service_date', 'desc')
            ->get();

        // Total de cortes
        $totalCuts = $cuts->count();
        
        // Total facturado
        $totalRevenue = $cuts->sum('final_price');
        
        // Agrupar por método de pago
        $revenueByPaymentMethod = $cuts->groupBy('payment_method_id')->map(function($cuts) {
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
            'cuts' => $cuts,
            'stats' => [
                'total_cuts' => $totalCuts,
                'total_revenue' => $totalRevenue,
                'cash_total' => $cashTotal,
                'card_total' => $cardTotal,
                'transfer_total' => $transferTotal,
            ],
            'revenueByPaymentMethod' => $revenueByPaymentMethod,
            'accentColor' => $barbershop->accent_color ?? '#ffffff',
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ],
        ]);
    }
}
