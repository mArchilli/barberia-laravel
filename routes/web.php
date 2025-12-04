<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BarbershopController;
use App\Models\Barbershop;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('LandingPage');
})->name('landing');

// Redirección inteligente después del login
Route::get('/dashboard', function () {
    /** @var \App\Models\User $user */
    $user = Auth::user();
    
    if ($user->isAdmin()) {
        return redirect()->route('admin.dashboard');
    }
    
    if ($user->isBarber()) {
        return redirect()->route('barber.dashboard');
    }
    
    abort(403, 'Rol no reconocido');
})->middleware(['auth', 'verified'])->name('dashboard');

// Rutas de Barberías (solo admin)
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin/barbershops')->name('admin.barbershops.')->group(function () {
    Route::get('/create-first', [BarbershopController::class, 'createFirst'])->name('create-first');
    Route::post('/create-first', [BarbershopController::class, 'storeFirst'])->name('store-first');
    Route::get('/', [BarbershopController::class, 'index'])->name('index');
    Route::get('/create', [BarbershopController::class, 'create'])->name('create');
    Route::post('/', [BarbershopController::class, 'store'])->name('store');
    Route::get('/{id}/select', [BarbershopController::class, 'select'])->name('select');
});

// Dashboard Admin (con middleware de barbershop)
Route::middleware(['auth', 'verified', 'role:admin', 'admin.barbershop'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', function () {
        $barbershop = null;
        $services = collect();
        $paymentMethods = collect();
        
        if (session('selected_barbershop_id')) {
            $barbershopId = session('selected_barbershop_id');
            $barbershop = Barbershop::find($barbershopId);
            
            // Obtener servicios y métodos de pago para la modal
            $services = \App\Models\Service::where('barbershop_id', $barbershopId)
                ->where('is_active', true)
                ->orderBy('name')
                ->get();

            $paymentMethods = \App\Models\PaymentMethod::where('barbershop_id', $barbershopId)
                ->where('is_active', true)
                ->orderBy('name')
                ->get();
        }
        
        return Inertia::render('Dashboard', [
            'barbershop' => $barbershop,
            'services' => $services,
            'paymentMethods' => $paymentMethods,
            'accentColor' => $barbershop?->accent_color ?? '#ffffff',
        ]);
    })->name('dashboard');
    
    // Rutas de gestión de barberos
    Route::prefix('barbers')->name('barbers.')->group(function () {
        Route::get('/', [\App\Http\Controllers\BarberController::class, 'index'])->name('index');
        Route::get('/create', [\App\Http\Controllers\BarberController::class, 'create'])->name('create');
        Route::get('/create-new', [\App\Http\Controllers\BarberController::class, 'createNew'])->name('create-new');
        Route::post('/', [\App\Http\Controllers\BarberController::class, 'store'])->name('store');
        Route::post('/store-new', [\App\Http\Controllers\BarberController::class, 'storeNew'])->name('store-new');
        Route::delete('/{id}', [\App\Http\Controllers\BarberController::class, 'destroy'])->name('destroy');
    });
    
    // Rutas de gestión de servicios
    Route::prefix('services')->name('services.')->group(function () {
        Route::get('/', [\App\Http\Controllers\ServiceController::class, 'index'])->name('index');
        Route::get('/create', [\App\Http\Controllers\ServiceController::class, 'create'])->name('create');
        Route::post('/', [\App\Http\Controllers\ServiceController::class, 'store'])->name('store');
        Route::get('/{id}/edit', [\App\Http\Controllers\ServiceController::class, 'edit'])->name('edit');
        Route::put('/{id}', [\App\Http\Controllers\ServiceController::class, 'update'])->name('update');
        Route::delete('/{id}', [\App\Http\Controllers\ServiceController::class, 'destroy'])->name('destroy');
    });
    
    // Rutas de configuración
    Route::prefix('settings')->name('settings.')->group(function () {
        Route::get('/', [\App\Http\Controllers\SettingsController::class, 'index'])->name('index');
        Route::post('/update-profile', [\App\Http\Controllers\SettingsController::class, 'updateProfile'])->name('update-profile');
        Route::post('/update-schedules', [\App\Http\Controllers\SettingsController::class, 'updateSchedules'])->name('update-schedules');
        Route::post('/send-password-reset', [\App\Http\Controllers\SettingsController::class, 'sendPasswordReset'])->name('send-password-reset');
    });
    
    // Rutas de medios de pago
    Route::resource('payment-methods', \App\Http\Controllers\PaymentMethodController::class)->except(['show']);
    
    // Ruta de caja
    Route::get('/cash-register', [\App\Http\Controllers\CashRegisterController::class, 'index'])->name('cash-register.index');
    
    // Rutas de mi rendimiento (cortes del admin)
    Route::prefix('my-cuts')->name('my-cuts.')->group(function () {
        Route::get('/', [\App\Http\Controllers\Admin\CutController::class, 'index'])->name('index');
        Route::post('/', [\App\Http\Controllers\Admin\CutController::class, 'store'])->name('store');
    });
    
    // Rutas de personalización
    Route::prefix('customization')->name('customization.')->group(function () {
        Route::get('/', [\App\Http\Controllers\CustomizationController::class, 'index'])->name('index');
        Route::post('/update', [\App\Http\Controllers\CustomizationController::class, 'update'])->name('update');
    });
});

// Dashboard Barbero
Route::middleware(['auth', 'verified', 'role:barber'])->prefix('barber')->name('barber.')->group(function () {
    Route::get('/dashboard', function () {
        $barber = Auth::user();
        $barbershop = $barber->barbershop;
        $cutController = new \App\Http\Controllers\Barber\CutController();
        $stats = $cutController->getStats();
        
        // Obtener servicios y métodos de pago para la modal
        $services = \App\Models\Service::where('barbershop_id', $barbershop->id)
            ->where('is_active', true)
            ->orderBy('name')
            ->get();

        $paymentMethods = \App\Models\PaymentMethod::where('barbershop_id', $barbershop->id)
            ->where('is_active', true)
            ->orderBy('name')
            ->get();
        
        return Inertia::render('Barber/Dashboard', [
            'stats' => $stats,
            'services' => $services,
            'paymentMethods' => $paymentMethods,
        ]);
    })->name('dashboard');
    
    // Rutas de cortes
    Route::prefix('cuts')->name('cuts.')->group(function () {
        Route::get('/', [\App\Http\Controllers\Barber\CutController::class, 'index'])->name('index');
        Route::get('/create', [\App\Http\Controllers\Barber\CutController::class, 'create'])->name('create');
        Route::post('/', [\App\Http\Controllers\Barber\CutController::class, 'store'])->name('store');
    });
    
    // Rutas de configuración
    Route::prefix('settings')->name('settings.')->group(function () {
        Route::get('/', [\App\Http\Controllers\Barber\SettingsController::class, 'index'])->name('index');
        Route::post('/update-profile', [\App\Http\Controllers\Barber\SettingsController::class, 'updateProfile'])->name('update-profile');
        Route::post('/send-password-reset', [\App\Http\Controllers\Barber\SettingsController::class, 'sendPasswordReset'])->name('send-password-reset');
    });
});

// Rutas de perfil (accesibles para todos los usuarios autenticados)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
