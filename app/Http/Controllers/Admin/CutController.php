<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Cut;
use App\Models\Service;
use App\Models\PaymentMethod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CutController extends Controller
{
    public function index()
    {
        $admin = Auth::user();
        $barbershopId = session('selected_barbershop_id');
        
        // Obtener cortes del admin con relaciones
        $cuts = Cut::where('barber_id', $admin->id)
            ->with(['service', 'paymentMethod'])
            ->orderBy('service_date', 'desc')
            ->get();

        // Estadísticas
        $totalCuts = $cuts->count();
        $totalEarnings = $cuts->sum('final_price');
        
        // Cortes del mes actual
        $cutsThisMonth = Cut::where('barber_id', $admin->id)
            ->whereYear('service_date', now()->year)
            ->whereMonth('service_date', now()->month)
            ->count();
        
        $earningsThisMonth = Cut::where('barber_id', $admin->id)
            ->whereYear('service_date', now()->year)
            ->whereMonth('service_date', now()->month)
            ->sum('final_price');
        
        // Cortes del día
        $cutsToday = Cut::where('barber_id', $admin->id)
            ->whereDate('service_date', today())
            ->count();
        
        $earningsToday = Cut::where('barber_id', $admin->id)
            ->whereDate('service_date', today())
            ->sum('final_price');

        // Obtener servicios y métodos de pago para la modal
        $services = Service::where('barbershop_id', $barbershopId)
            ->where('is_active', true)
            ->orderBy('name')
            ->get();

        $paymentMethods = PaymentMethod::where('barbershop_id', $barbershopId)
            ->where('is_active', true)
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/MyCuts/Index', [
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

    public function store(Request $request)
    {
        $admin = Auth::user();
        
        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
            'payment_method_id' => 'required|exists:payment_methods,id',
            'client_name' => 'required|string|max:255',
            'service_date' => 'required|date',
            'final_price' => 'required|numeric|min:0',
        ]);

        Cut::create([
            'barber_id' => $admin->id,
            'service_id' => $validated['service_id'],
            'payment_method_id' => $validated['payment_method_id'],
            'client_name' => $validated['client_name'],
            'service_date' => $validated['service_date'],
            'final_price' => $validated['final_price'],
        ]);

        return redirect()->route('admin.my-cuts.index')
            ->with('success', 'Corte registrado correctamente');
    }

    public function getStats()
    {
        $admin = Auth::user();
        
        // Estadísticas para el dashboard
        $totalCuts = Cut::where('barber_id', $admin->id)->count();
        $totalEarnings = Cut::where('barber_id', $admin->id)->sum('final_price');
        
        $cutsThisMonth = Cut::where('barber_id', $admin->id)
            ->whereYear('service_date', now()->year)
            ->whereMonth('service_date', now()->month)
            ->count();
        
        $earningsThisMonth = Cut::where('barber_id', $admin->id)
            ->whereYear('service_date', now()->year)
            ->whereMonth('service_date', now()->month)
            ->sum('final_price');
        
        $cutsToday = Cut::where('barber_id', $admin->id)
            ->whereDate('service_date', today())
            ->count();
        
        $earningsToday = Cut::where('barber_id', $admin->id)
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
