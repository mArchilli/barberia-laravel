import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import RegisterCutModal from '@/Components/RegisterCutModal';
import { useState } from 'react';

export default function Index({ auth, cuts, stats, services, paymentMethods }) {
    const [showModal, setShowModal] = useState(false);

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const dateStr = date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
        const timeStr = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        return `${dateStr} · ${timeStr}`;
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Mi Rendimiento" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Botón volver */}
                    <a
                        href={route('admin.dashboard')}
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white transition mb-6"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Volver al Dashboard
                    </a>

                    {/* Header */}
                    <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                Mi Rendimiento
                            </h1>
                            <p className="mt-2 text-white/70">
                                Historial de servicios que he realizado
                            </p>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="px-6 py-3 bg-white text-black font-bold hover:bg-white/90 transition rounded-xl"
                        >
                            + Registrar Corte
                        </button>
                    </div>

                    {/* Estadísticas */}
                    <div className="grid md:grid-cols-3 gap-3 mb-3">
                        {/* Hoy */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-white/70 font-semibold">Hoy</h3>
                                <span className="text-2xl">📅</span>
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">
                                {stats.cuts_today}
                            </div>
                            <div className="text-white/50 text-sm">
                                Cortes realizados
                            </div>
                            <div className="text-xl font-semibold text-white mt-3">
                                ${parseFloat(stats.earnings_today).toFixed(2)}
                            </div>
                            <div className="text-white/50 text-sm">
                                Dinero acumulado
                            </div>
                        </div>

                        {/* Este Mes */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-white/70 font-semibold">Este Mes</h3>
                                <span className="text-2xl">📊</span>
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">
                                {stats.cuts_this_month}
                            </div>
                            <div className="text-white/50 text-sm">
                                Cortes realizados
                            </div>
                            <div className="text-xl font-semibold text-white mt-3">
                                ${parseFloat(stats.earnings_this_month).toFixed(2)}
                            </div>
                            <div className="text-white/50 text-sm">
                                Dinero acumulado
                            </div>
                        </div>

                        {/* Total */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-white/70 font-semibold">Total</h3>
                                <span className="text-2xl">💰</span>
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">
                                {stats.total_cuts}
                            </div>
                            <div className="text-white/50 text-sm">
                                Cortes realizados
                            </div>
                            <div className="text-xl font-semibold text-white mt-3">
                                ${parseFloat(stats.total_earnings).toFixed(2)}
                            </div>
                            <div className="text-white/50 text-sm">
                                Dinero acumulado
                            </div>
                        </div>
                    </div>

                    {/* Tabla de Cortes */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                        <div className="p-6 border-b border-white/10">
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
                                <div className="text-6xl mb-4">✂️</div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    No hay cortes registrados
                                </h3>
                                <p className="text-white/60 mb-6">
                                    Comienza a registrar los servicios que realizas
                                </p>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="inline-block px-6 py-3 bg-white text-black font-bold hover:bg-white/90 transition rounded-xl"
                                >
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
