<?php

namespace App\Http\Controllers;

use App\Models\Barbershop;
use App\Models\BarbershopSchedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Inertia\Inertia;

class SettingsController extends Controller
{
    /**
     * Mostrar página de configuración
     */
    public function index()
    {
        $barbershopId = session('selected_barbershop_id');
        $barbershop = Barbershop::with('schedules')->findOrFail($barbershopId);
        
        // Organizar horarios por día
        $schedulesByDay = [];
        foreach ($barbershop->schedules as $schedule) {
            if (!isset($schedulesByDay[$schedule->day_of_week])) {
                $schedulesByDay[$schedule->day_of_week] = [];
            }
            $schedulesByDay[$schedule->day_of_week][] = [
                'id' => $schedule->id,
                'start' => $schedule->start_time,
                'end' => $schedule->end_time,
            ];
        }

        return Inertia::render('Admin/Settings/Index', [
            'schedulesByDay' => $schedulesByDay,
        ]);
    }

    /**
     * Actualizar información del perfil de la barbería
     */
    public function updateProfile(Request $request)
    {
        $barbershopId = session('selected_barbershop_id');
        $barbershop = Barbershop::findOrFail($barbershopId);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $logoName = time() . '_' . $request->file('logo')->getClientOriginalName();
            $request->file('logo')->move(public_path('logos'), $logoName);
            $validated['logo'] = 'logos/' . $logoName;
        }

        $barbershop->update($validated);

        return redirect()->route('admin.settings.index')
            ->with('success', '¡Perfil actualizado exitosamente!');
    }

    /**
     * Actualizar horarios de atención
     */
    public function updateSchedules(Request $request)
    {
        $barbershopId = session('selected_barbershop_id');
        $barbershop = Barbershop::findOrFail($barbershopId);

        $validated = $request->validate([
            'schedules' => 'required|array',
        ]);

        // Eliminar horarios actuales
        $barbershop->schedules()->delete();

        // Guardar nuevos horarios
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

        return redirect()->route('admin.settings.index')
            ->with('success', '¡Horarios actualizados exitosamente!');
    }

    /**
     * Enviar link de recuperación de contraseña
     */
    public function sendPasswordReset(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return back()->with('success', '¡Link de recuperación enviado a tu correo!');
        }

        return back()->withErrors(['email' => __($status)]);
    }
}
