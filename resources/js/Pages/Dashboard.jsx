import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import RegisterCutModal from '@/Components/RegisterCutModal';
import { useState } from 'react';

export default function Dashboard({ auth, barbershop, services, paymentMethods }) {
    const [showBalance, setShowBalance] = useState(true);
    const [showModal, setShowModal] = useState(false);
    
    // Color de acento personalizado
    const accentColor = barbershop?.accent_color || '#ffffff';
    
    // Obtener fecha actual
    const today = new Date();
    const dayName = today.toLocaleDateString('es-ES', { weekday: 'long' });
    const dateFormatted = today.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    
    // Datos de ejemplo (estos deberían venir del backend)
    const totalBalance = 45750.50;
    const lastIncome = 1200.00;
    const lastExpense = 350.00;
    const cutsToday = 15;
    const cutsComparison = 22; // % comparación con mes anterior
    const appointmentsToday = 8;
    
    // Rendimiento de barberos (ejemplo - debería venir del backend)
    const barbersPerformance = [
        {
            id: 1,
            name: 'Carlos Méndez',
            services: [
                { type: 'Cortes', count: 8 },
                { type: 'Cortes con barba', count: 2 },
                { type: 'Claritos', count: 1 },
                { type: 'Globales', count: 2 }
            ]
        },
        {
            id: 2,
            name: 'Javier Rodríguez',
            services: [
                { type: 'Cortes', count: 5 },
                { type: 'Cortes con barba', count: 3 },
                { type: 'Globales', count: 1 }
            ]
        },
        {
            id: 3,
            name: 'Miguel Ángel',
            services: [
                { type: 'Cortes', count: 6 },
                { type: 'Claritos', count: 2 }
            ]
        }
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard Admin" />

            <div className="min-h-screen bg-black pt-6 pb-12">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Bienvenida */}
                    <h3 className="text-3xl font-bold text-white mb-6">
                        Bienvenido, {auth.user.name}
                    </h3>

                    {/* Card Principal - Caja de Hoy */}
                    <div className="mb-3 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md p-8 shadow-2xl shadow-black/50">
                        <div className="mb-6">
                            <p className="text-white/60 text-sm uppercase tracking-wider mb-1">
                                Saldo total: {dayName}
                            </p>
                            <p className="text-white/40 text-xs">
                                {dateFormatted}
                            </p>
                        </div>

                        <div className="mb-6 flex items-center gap-3">
                            <h2 className="text-5xl font-bold text-white">
                                {showBalance ? `$${Math.round(totalBalance).toLocaleString('es-AR')}` : '$ ***'}
                            </h2>
                            <button
                                onClick={() => setShowBalance(!showBalance)}
                                className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                            >
                                {showBalance ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <Link 
                            href={route('admin.cash-register.index')}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors border border-white/20"
                        >
                            Ver detalles de caja →
                        </Link>
                    </div>

                    {/* Cards de Cortes y Citas */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        {/* Servicios del día */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <p className="text-white/60 text-sm mb-3">Servicios del día</p>
                            <div className="flex items-center gap-3 mb-3">
                                <h3 className="text-5xl font-bold text-white">{cutsToday}</h3>
                                <div>
                                    <svg className="w-8 h-8" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                                    </svg>
                                </div>
                            </div>
                            <Link 
                                href={route('admin.my-cuts.index')}
                                className="text-white/70 hover:text-white text-sm transition-colors inline-flex items-center gap-1"
                            >
                                Ver mi rendimiento →
                            </Link>
                        </div>

                        {/* Citas de hoy */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <p className="text-white/60 text-sm mb-3">Próximas citas</p>
                            <div className="flex items-center gap-3 mb-3">
                                <h3 className="text-5xl font-bold text-white">{appointmentsToday}</h3>
                                <div>
                                    <svg className="w-8 h-8" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                            <Link 
                                href="#"
                                className="text-white/70 hover:text-white text-sm transition-colors inline-flex items-center gap-1"
                            >
                                Ver calendario de hoy →
                            </Link>
                        </div>
                    </div>

                    {/* Botón Registrar Corte */}
                    <button
                        onClick={() => setShowModal(true)}
                        className="w-full mb-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3">
                    
                        <svg className="w-6 h-6" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-xl font-bold text-white">Registrar Corte</span>
                    </button>

                    {/* Rendimiento de Barberos */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                        <div className="mb-6">
                            <p className="text-white/60 text-sm mb-3">Rendimiento de los barberos</p>
                            <div className="flex items-center gap-3">
                                <div>
                                    <svg className="w-8 h-8" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 mb-6">
                            {barbersPerformance.map((barber) => (
                                <div key={barber.id} className="pb-4 border-b border-white/10 last:border-b-0 last:pb-0">
                                    <h5 className="text-lg font-semibold text-white mb-2">{barber.name}</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {barber.services.map((service, index) => (
                                            <div key={index} className="bg-white/5 px-3 py-1 rounded-lg border border-white/10">
                                                <span className="text-white font-semibold text-xs">{service.count}</span>
                                                <span className="text-white/50 ml-1 text-xs">{service.type}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link 
                            href="#"
                            className="text-white/70 hover:text-white text-sm transition-colors inline-flex items-center gap-1 font-medium"
                        >
                            Ver detalles de rendimiento →
                        </Link>
                    </div>
                </div>
            </div>

            {/* Modal de Registro de Corte */}
            <RegisterCutModal 
                show={showModal}
                onClose={() => setShowModal(false)}
                services={services}
                paymentMethods={paymentMethods}
                storeRoute="admin.my-cuts.store"
            />
        </AuthenticatedLayout>
    );
}
