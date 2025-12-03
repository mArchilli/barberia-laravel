<?php

namespace App\Http\Controllers\Barber;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        return Inertia::render('Barber/Settings/Index', [
            'user' => $user,
        ]);
    }

    public function updateProfile(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $user->update([
            'name' => $validated['name'],
        ]);

        return redirect()->route('barber.settings.index')
            ->with('success', 'Perfil actualizado correctamente');
    }

    public function sendPasswordReset(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? back()->with('success', 'Link de recuperación enviado a tu correo')
            : back()->withErrors(['email' => __($status)]);
    }
}
