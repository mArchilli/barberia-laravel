<?php

namespace App\Http\Controllers;

use App\Models\Barbershop;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomizationController extends Controller
{
    /**
     * Mostrar página de personalización
     */
    public function index()
    {
        $barbershopId = session('selected_barbershop_id');
        $barbershop = Barbershop::findOrFail($barbershopId);
        
        return Inertia::render('Admin/Customization/Index', [
            'barbershop' => $barbershop,
            'accentColor' => $barbershop->accent_color ?? '#ffffff',
        ]);
    }

    /**
     * Actualizar color de acento
     */
    public function update(Request $request)
    {
        $request->validate([
            'accent_color' => 'required|regex:/^#[0-9A-Fa-f]{6}$/',
        ]);

        $barbershopId = session('selected_barbershop_id');
        $barbershop = Barbershop::findOrFail($barbershopId);
        
        $barbershop->update([
            'accent_color' => $request->accent_color,
        ]);

        return redirect()->route('admin.customization.index')->with('success', 'Color de acento actualizado correctamente');
    }
}
