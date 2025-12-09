import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import RegisterCutModal from '@/Components/RegisterCutModal';
import { useState } from 'react';

export default function Index({ auth, cuts, stats, services, paymentMethods }) {
    const [showModal, setShowModal] = useState(false);
    const { barbershop } = usePage().props;
    const accentColor = barbershop?.accent_color || '#ffffff';

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const dateStr = date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
        const timeStr = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        return `${dateStr} · ${timeStr}`;
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Mi Rendimiento" />

            <div className="min-h-screen bg-black pt-6 pb-12">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            Mi Rendimiento
                        </h1>
                        <p className="text-white/60 text-sm">
                            Historial de servicios que he realizado
                        </p>
                    </div>

                    {/* Estadísticas */}
                    <div className="grid md:grid-cols-3 gap-3 mb-3">
                        {/* Hoy */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-white/60 text-sm">Hoy</h3>
                                <svg className="w-8 h-8" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="text-4xl font-bold text-white mb-1">
                                {stats.cuts_today}
                            </div>
                            <div className="text-white/50 text-sm mb-4">
                                Cortes realizados
                            </div>
                            <div className="text-2xl font-semibold text-white mb-1">
                                ${parseFloat(stats.earnings_today).toFixed(2)}
                            </div>
                            <div className="text-white/50 text-sm">
                                Dinero acumulado
                            </div>
                        </div>

                        {/* Este Mes */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-white/60 text-sm">Este Mes</h3>
                                <svg className="w-8 h-8" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div className="text-4xl font-bold text-white mb-1">
                                {stats.cuts_this_month}
                            </div>
                            <div className="text-white/50 text-sm mb-4">
                                Cortes realizados
                            </div>
                            <div className="text-2xl font-semibold text-white mb-1">
                                ${parseFloat(stats.earnings_this_month).toFixed(2)}
                            </div>
                            <div className="text-white/50 text-sm">
                                Dinero acumulado
                            </div>
                        </div>

                        {/* Total */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-white/60 text-sm">Total</h3>
                                <svg className="w-8 h-8" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="text-4xl font-bold text-white mb-1">
                                {stats.total_cuts}
                            </div>
                            <div className="text-white/50 text-sm mb-4">
                                Cortes realizados
                            </div>
                            <div className="text-2xl font-semibold text-white mb-1">
                                ${parseFloat(stats.total_earnings).toFixed(2)}
                            </div>
                            <div className="text-white/50 text-sm">
                                Dinero acumulado
                            </div>
                        </div>
                    </div>

                    {/* Botón Registrar Servicio */}
                    <button
                        onClick={() => setShowModal(true)}
                        className="w-full mb-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3">
                        <svg className="w-6 h-6" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-xl font-bold text-white">Registrar Servicio</span>
                    </button>

                    {/* Tabla de Cortes */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                        <div className="p-6 border-b border-white/10 flex items-center gap-3">
                            <svg className="w-6 h-6" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h2 className="text-xl font-bold text-white">Historial de Cortes</h2>
                        </div>
                        
                        {cuts.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="text-left py-3 px-4 text-xs font-semibold text-white/60 uppercase tracking-wider">Fecha/Hora</th>
                                            <th className="text-left py-3 px-4 text-xs font-semibold text-white/60 uppercase tracking-wider">Cliente</th>
                                            <th className="text-left py-3 px-4 text-xs font-semibold text-white/60 uppercase tracking-wider">Servicio</th>
                                            <th className="text-right py-3 px-4 text-xs font-semibold text-white/60 uppercase tracking-wider">Importe</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cuts.map((cut, index) => (
                                            <tr 
                                                key={cut.id} 
                                                className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                            >
                                                <td className="py-3 px-4 text-sm text-white/60">
                                                    {formatDateTime(cut.service_date)}
                                                </td>
                                                <td className="py-3 px-4 text-sm text-white/80">{cut.client_name}</td>
                                                <td className="py-3 px-4 text-sm text-white font-medium">{cut.service.name}</td>
                                                <td className="py-3 px-4 text-sm font-semibold text-right text-white">
                                                    ${parseFloat(cut.final_price).toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-12 text-center">
                                <div className="mb-6 flex justify-center">
                                    <svg className="w-20 h-20" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    No hay cortes registrados
                                </h3>
                                <p className="text-white/60 mb-6">
                                    Comienza a registrar los servicios que realizas
                                </p>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-colors font-medium text-white"
                                    style={{
                                        borderColor: accentColor,
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Registrar Primer Corte
                                </button>
                            </div>
                        )}
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
