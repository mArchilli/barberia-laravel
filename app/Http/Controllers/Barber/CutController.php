<?php

namespace App\Http\Controllers\Barber;

use App\Http\Controllers\Controller;
use App\Models\Cut;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CutController extends Controller
{
    public function index()
    {
        $barber = Auth::user();
        $barbershop = $barber->barbershop;
        
        // Obtener cortes del barbero con relaciones
        $cuts = Cut::where('barber_id', $barber->id)
            ->with(['service', 'paymentMethod'])
            ->orderBy('service_date', 'desc')
            ->get();

        // Estadísticas
        $totalCuts = $cuts->count();
        $totalEarnings = $cuts->sum('final_price');
        
        // Cortes del mes actual
        $cutsThisMonth = Cut::where('barber_id', $barber->id)
            ->whereYear('service_date', now()->year)
            ->whereMonth('service_date', now()->month)
            ->count();
        
        $earningsThisMonth = Cut::where('barber_id', $barber->id)
            ->whereYear('service_date', now()->year)
            ->whereMonth('service_date', now()->month)
            ->sum('final_price');
        
        // Cortes del día
        $cutsToday = Cut::where('barber_id', $barber->id)
            ->whereDate('service_date', today())
            ->count();
        
        $earningsToday = Cut::where('barber_id', $barber->id)
            ->whereDate('service_date', today())
            ->sum('final_price');

        // Obtener servicios y métodos de pago para la modal
        $services = Service::where('barbershop_id', $barbershop->id)
            ->where('is_active', true)
            ->orderBy('name')
            ->get();

        $paymentMethods = \App\Models\PaymentMethod::where('barbershop_id', $barbershop->id)
            ->where('is_active', true)
            ->orderBy('name')
            ->get();

        return Inertia::render('Barber/Cuts/Index', [
            'cuts' => $cuts,
            'services' => $services,
            'paymentMethods' => $paymentMethods,
            'stats' => [
                'total_cuts' => $totalCuts,
                'total_earnings' => $totalEarnings,
                'cuts_this_month' => $cutsThisMonth,
                'earnings_this_month' => $earningsThisMonth,
                'cuts_today' => $cutsToday,
                'earnings_today' => $earningsToday,
            ],
        ]);
    }

    public function create()
    {
        $barber = Auth::user();
        $barbershop = $barber->barbershop;
        
        // Obtener servicios activos de la barbería
        $services = Service::where('barbershop_id', $barbershop->id)
            ->where('is_active', true)
            ->orderBy('name')
            ->get();

        // Obtener métodos de pago activos de la barbería
        $paymentMethods = \App\Models\PaymentMethod::where('barbershop_id', $barbershop->id)
            ->where('is_active', true)
            ->orderBy('name')
            ->get();

        return Inertia::render('Barber/Cuts/Create', [
            'services' => $services,
            'paymentMethods' => $paymentMethods,
            'barbershop' => $barbershop,
        ]);
    }

    public function store(Request $request)
    {
        $barber = Auth::user();
        
        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
            'payment_method_id' => 'required|exists:payment_methods,id',
            'client_name' => 'required|string|max:255',
            'service_date' => 'required|date',
            'final_price' => 'required|numeric|min:0',
        ]);

        Cut::create([
            'barber_id' => $barber->id,
            'service_id' => $validated['service_id'],
            'payment_method_id' => $validated['payment_method_id'],
            'client_name' => $validated['client_name'],
            'service_date' => $validated['service_date'],
            'final_price' => $validated['final_price'],
        ]);

        return redirect()->route('barber.cuts.index')
            ->with('success', 'Corte registrado correctamente');
    }

    public function getStats()
    {
        $barber = Auth::user();
        
        // Estadísticas para el dashboard
        $totalCuts = Cut::where('barber_id', $barber->id)->count();
        $totalEarnings = Cut::where('barber_id', $barber->id)->sum('final_price');
        
        $cutsThisMonth = Cut::where('barber_id', $barber->id)
            ->whereYear('service_date', now()->year)
            ->whereMonth('service_date', now()->month)
            ->count();
        
        $earningsThisMonth = Cut::where('barber_id', $barber->id)
            ->whereYear('service_date', now()->year)
            ->whereMonth('service_date', now()->month)
            ->sum('final_price');
        
        $cutsToday = Cut::where('barber_id', $barber->id)
            ->whereDate('service_date', today())
            ->count();
        
        $earningsToday = Cut::where('barber_id', $barber->id)
            ->whereDate('service_date', today())
            ->sum('final_price');

        return [
            'total_cuts' => $totalCuts,
            'total_earnings' => $totalEarnings,
            'cuts_this_month' => $cutsThisMonth,
            'earnings_this_month' => $earningsThisMonth,
            'cuts_today' => $cutsToday,
            'earnings_today' => $earningsToday,
        ];
    }
}
