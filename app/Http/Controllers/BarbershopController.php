<?php

namespace App\Http\Controllers;

use App\Models\Barbershop;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BarbershopController extends Controller
{
    /**
     * Mostrar formulario para crear primera barbería
     */
    public function createFirst()
    {
        return Inertia::render('Admin/Barbershops/CreateFirst');
    }

    /**
     * Guardar la primera barbería
     */
    public function storeFirst(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'schedules' => 'required|array',
        ]);

        // Guardar logo si existe
        if ($request->hasFile('logo')) {
            $logoName = time() . '_' . $request->file('logo')->getClientOriginalName();
            $request->file('logo')->move(public_path('logos'), $logoName);
            $validated['logo'] = 'logos/' . $logoName;
        }

        // Crear la barbería
        $barbershop = Barbershop::create([
            'name' => $validated['name'],
            'address' => $validated['address'],
            'phone' => $validated['phone'],
            'logo' => $validated['logo'] ?? null,
            'opening_time' => '09:00', // Valores por defecto
            'closing_time' => '20:00',
        ]);

        // Guardar los horarios
        foreach ($validated['schedules'] as $day => $slots) {
            if (is_array($slots) && count($slots) > 0) {
                foreach ($slots as $slot) {
                    $barbershop->schedules()->create([
                        'day_of_week' => $day,
                        'start_time' => $slot['start'],
                        'end_time' => $slot['end'],
                    ]);
                }
            }
        }

        // Redirigir al panel de barberías
        return redirect()->route('admin.barbershops.index')
            ->with('success', '¡Barbería creada exitosamente!');
    }

    /**
     * Listar todas las barberías del admin
     */
    public function index()
    {
        $barbershops = Barbershop::withCount(['barbers', 'services'])->get();

        return Inertia::render('Admin/Barbershops/Index', [
            'barbershops' => $barbershops,
        ]);
    }

    /**
     * Seleccionar una barbería y redirigir a su dashboard
     */
    public function select($id)
    {
        $barbershop = Barbershop::findOrFail($id);

        // Guardar en sesión la barbería seleccionada
        session(['selected_barbershop_id' => $barbershop->id]);

        return redirect()->route('admin.dashboard')
            ->with('success', "Barbería '{$barbershop->name}' seleccionada");
    }

    /**
     * Mostrar formulario para crear nueva barbería
     */
    public function create()
    {
        return Inertia::render('Admin/Barbershops/Create');
    }

    /**
     * Guardar nueva barbería
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'opening_time' => 'required|date_format:H:i',
            'closing_time' => 'required|date_format:H:i',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $logoName = time() . '_' . $request->file('logo')->getClientOriginalName();
            $request->file('logo')->move(public_path('logos'), $logoName);
            $validated['logo'] = 'logos/' . $logoName;
        }

        Barbershop::create($validated);

        return redirect()->route('admin.barbershops.index')
            ->with('success', 'Barbería creada exitosamente');
    }
}
