<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Barbershop;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    /**
     * Mostrar lista de servicios de la barbería actual
     */
    public function index()
    {
        $barbershopId = session('selected_barbershop_id');
        
        $services = Service::where('barbershop_id', $barbershopId)
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/Services/Index', [
            'services' => $services,
        ]);
    }

    /**
     * Mostrar formulario para crear servicio
     */
    public function create()
    {
        return Inertia::render('Admin/Services/Create');
    }

    /**
     * Guardar nuevo servicio
     */
    public function store(Request $request)
    {
        $barbershopId = session('selected_barbershop_id');

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'duration' => 'required|integer|min:5|max:480',
            'price' => 'required|numeric|min:0',
            'is_active' => 'boolean',
        ]);

        Service::create([
            'barbershop_id' => $barbershopId,
            'name' => $validated['name'],
            'duration' => $validated['duration'],
            'price' => $validated['price'],
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return redirect()->route('admin.services.index')
            ->with('success', '¡Servicio creado exitosamente!');
    }

    /**
     * Mostrar formulario para editar servicio
     */
    public function edit($id)
    {
        $barbershopId = session('selected_barbershop_id');
        $barbershop = Barbershop::findOrFail($barbershopId);
        
        $service = Service::where('barbershop_id', $barbershopId)
            ->findOrFail($id);

        return Inertia::render('Admin/Services/Edit', [
            'barbershop' => $barbershop,
            'service' => $service,
        ]);
    }

    /**
     * Actualizar servicio
     */
    public function update(Request $request, $id)
    {
        $barbershopId = session('selected_barbershop_id');
        
        $service = Service::where('barbershop_id', $barbershopId)
            ->findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'duration' => 'required|integer|min:5|max:480',
            'price' => 'required|numeric|min:0',
            'is_active' => 'boolean',
        ]);

        $service->update($validated);

        return redirect()->route('admin.services.index')
            ->with('success', '¡Servicio actualizado exitosamente!');
    }

    /**
     * Eliminar servicio
     */
    public function destroy($id)
    {
        $barbershopId = session('selected_barbershop_id');
        
        $service = Service::where('barbershop_id', $barbershopId)
            ->findOrFail($id);

        $service->delete();

        return redirect()->route('admin.services.index')
            ->with('success', 'Servicio eliminado exitosamente');
    }
}
