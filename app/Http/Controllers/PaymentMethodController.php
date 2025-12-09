<?php

namespace App\Http\Controllers;

use App\Models\PaymentMethod;
use App\Models\Barbershop;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentMethodController extends Controller
{
    /**
     * Mostrar lista de medios de pago de la barbería actual
     */
    public function index()
    {
        $barbershopId = session('selected_barbershop_id');
        
        $paymentMethods = PaymentMethod::where('barbershop_id', $barbershopId)
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/PaymentMethods/Index', [
            'paymentMethods' => $paymentMethods,
        ]);
    }

    /**
     * Mostrar formulario para crear un nuevo medio de pago
     */
    public function create()
    {
        $barbershopId = session('selected_barbershop_id');
        $barbershop = Barbershop::findOrFail($barbershopId);

        return Inertia::render('Admin/PaymentMethods/Form', [
            'barbershop' => $barbershop,
            'paymentMethod' => null,
        ]);
    }

    /**
     * Guardar un nuevo medio de pago
     */
    public function store(Request $request)
    {
        $barbershopId = session('selected_barbershop_id');

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'is_active' => 'boolean',
        ]);

        PaymentMethod::create([
            'barbershop_id' => $barbershopId,
            'name' => $validated['name'],
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return redirect()->route('admin.payment-methods.index')
            ->with('success', 'Medio de pago creado correctamente.');
    }

    /**
     * Mostrar formulario para editar un medio de pago
     */
    public function edit(PaymentMethod $paymentMethod)
    {
        $barbershopId = session('selected_barbershop_id');
        
        // Verificar que el medio de pago pertenece a la barbería actual
        if ($paymentMethod->barbershop_id !== $barbershopId) {
            abort(403, 'No tienes permiso para editar este medio de pago.');
        }

        $barbershop = Barbershop::findOrFail($barbershopId);

        return Inertia::render('Admin/PaymentMethods/Form', [
            'barbershop' => $barbershop,
            'paymentMethod' => $paymentMethod,
        ]);
    }

    /**
     * Actualizar un medio de pago existente
     */
    public function update(Request $request, PaymentMethod $paymentMethod)
    {
        $barbershopId = session('selected_barbershop_id');
        
        // Verificar que el medio de pago pertenece a la barbería actual
        if ($paymentMethod->barbershop_id !== $barbershopId) {
            abort(403, 'No tienes permiso para actualizar este medio de pago.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'is_active' => 'boolean',
        ]);

        $paymentMethod->update($validated);

        return redirect()->route('admin.payment-methods.index')
            ->with('success', 'Medio de pago actualizado correctamente.');
    }

    /**
     * Eliminar un medio de pago
     */
    public function destroy(PaymentMethod $paymentMethod)
    {
        $barbershopId = session('selected_barbershop_id');
        
        // Verificar que el medio de pago pertenece a la barbería actual
        if ($paymentMethod->barbershop_id !== $barbershopId) {
            abort(403, 'No tienes permiso para eliminar este medio de pago.');
        }

        $paymentMethod->delete();

        return redirect()->route('admin.payment-methods.index')
            ->with('success', 'Medio de pago eliminado correctamente.');
    }
}
