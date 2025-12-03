<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Barbershop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class BarberController extends Controller
{
    /**
     * Mostrar lista de barberos de la barbería actual
     */
    public function index()
    {
        $barbershopId = session('selected_barbershop_id');
        $barbershop = Barbershop::findOrFail($barbershopId);
        
        // Obtener todos los barberos vinculados a esta barbería + el dueño
        $barbers = User::where('barbershop_id', $barbershopId)
            ->where('role', User::ROLE_BARBER)
            ->get();
        
        // Obtener el admin (dueño) que también puede actuar como barbero
        $admin = auth()->user();

        return Inertia::render('Admin/Barbers/Index', [
            'barbershop' => $barbershop,
            'barbers' => $barbers,
            'admin' => $admin,
        ]);
    }

    /**
     * Mostrar lista de barberos disponibles para vincular
     */
    public function create()
    {
        $barbershopId = session('selected_barbershop_id');
        $barbershop = Barbershop::findOrFail($barbershopId);
        
        // Obtener todos los barberos que NO están vinculados a esta barbería
        $availableBarbers = User::where('role', User::ROLE_BARBER)
            ->where(function($query) use ($barbershopId) {
                $query->whereNull('barbershop_id')
                      ->orWhere('barbershop_id', '!=', $barbershopId);
            })
            ->get();

        return Inertia::render('Admin/Barbers/Create', [
            'barbershop' => $barbershop,
            'availableBarbers' => $availableBarbers,
        ]);
    }
    
    /**
     * Mostrar formulario para crear nuevo usuario barbero
     */
    public function createNew()
    {
        $barbershopId = session('selected_barbershop_id');
        $barbershop = Barbershop::findOrFail($barbershopId);

        return Inertia::render('Admin/Barbers/CreateNew', [
            'barbershop' => $barbershop,
        ]);
    }

    /**
     * Vincular un barbero existente a la barbería
     */
    public function store(Request $request)
    {
        $barbershopId = session('selected_barbershop_id');

        $validated = $request->validate([
            'barber_id' => 'required|exists:users,id',
        ]);

        $barber = User::findOrFail($validated['barber_id']);
        
        // Verificar que sea un barbero
        if ($barber->role !== User::ROLE_BARBER) {
            return back()->withErrors(['barber_id' => 'El usuario seleccionado no es un barbero.']);
        }

        // Vincular a la barbería
        $barber->update(['barbershop_id' => $barbershopId]);

        return redirect()->route('admin.barbers.index')
            ->with('success', '¡Barbero vinculado exitosamente!');
    }
    
    /**
     * Crear nuevo usuario barbero y vincularlo
     */
    public function storeNew(Request $request)
    {
        $barbershopId = session('selected_barbershop_id');

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'nullable|string|max:20',
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => User::ROLE_BARBER,
            'barbershop_id' => $barbershopId,
        ]);

        return redirect()->route('admin.barbers.index')
            ->with('success', '¡Barbero creado y vinculado exitosamente!');
    }

    /**
     * Desvincular un barbero de la barbería
     */
    public function destroy($id)
    {
        $barber = User::findOrFail($id);
        
        // Verificar que sea un barbero y pertenezca a la barbería actual
        if ($barber->role !== User::ROLE_BARBER || $barber->barbershop_id !== session('selected_barbershop_id')) {
            abort(403);
        }

        // Desvincular (no eliminar el usuario, solo quitar la relación)
        $barber->update(['barbershop_id' => null]);

        return redirect()->route('admin.barbers.index')
            ->with('success', 'Barbero desvinculado exitosamente');
    }
}
