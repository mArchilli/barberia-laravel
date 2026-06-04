<?php

namespace App\Http\Controllers\Barber;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CustomizationController extends Controller
{
    public function index()
    {
        $barbershop = Auth::user()->barbershop;

        return Inertia::render('Barber/Customization/Index', [
            'barbershop' => $barbershop,
            'accentColor' => $barbershop->accent_color ?? '#ffffff',
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'accent_color' => 'required|regex:/^#[0-9A-Fa-f]{6}$/',
        ]);

        $barbershop = Auth::user()->barbershop;

        $barbershop->update([
            'accent_color' => $request->accent_color,
        ]);

        return redirect()->route('barber.customization.index')->with('success', 'Color de acento actualizado correctamente');
    }
}
