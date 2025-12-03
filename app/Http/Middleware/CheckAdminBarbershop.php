<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckAdminBarbershop
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Solo aplicar para admins
        if ($user && $user->isAdmin()) {
            $barbershopCount = \App\Models\Barbershop::count();

            // Si no hay barberías, redirigir a crear la primera
            if ($barbershopCount === 0 && !$request->routeIs('admin.barbershops.create-first') && !$request->routeIs('admin.barbershops.store-first')) {
                return redirect()->route('admin.barbershops.create-first');
            }

            // Si hay barberías pero no hay una seleccionada en sesión
            if ($barbershopCount > 0 && !session('selected_barbershop_id') && !$request->routeIs('admin.barbershops.*')) {
                return redirect()->route('admin.barbershops.index');
            }
        }

        return $next($request);
    }
}
