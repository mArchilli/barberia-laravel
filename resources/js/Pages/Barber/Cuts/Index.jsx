import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, cuts, stats }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Mis Cortes" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                Mis Cortes
                            </h1>
                            <p className="mt-2 text-white/70">
                                Historial de servicios realizados
                            </p>
                        </div>
                        <Link
                            href={route('barber.cuts.create')}
                            className="px-6 py-3 bg-white text-black font-bold hover:bg-white/90 transition inline-block"
                        >
                            + Registrar Corte
                        </Link>
                    </div>

                    {/* Estadísticas */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        {/* Hoy */}
                        <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-6">
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
                        <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-6">
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
                        <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-6">
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
                    <div className="border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                        <div className="p-6 border-b border-white/10">
                            <h2 className="text-xl font-bold text-white">Historial de Cortes</h2>
                        </div>
                        
                        {cuts.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="border-b border-white/10">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-white/70 font-semibold">Cliente</th>
                                            <th className="px-6 py-4 text-left text-white/70 font-semibold">Servicio</th>
                                            <th className="px-6 py-4 text-left text-white/70 font-semibold">Fecha y Hora</th>
                                            <th className="px-6 py-4 text-left text-white/70 font-semibold">Precio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cuts.map((cut, index) => (
                                            <tr 
                                                key={cut.id} 
                                                className={`${
                                                    index !== cuts.length - 1 ? 'border-b border-white/10' : ''
                                                } hover:bg-white/5 transition`}
                                            >
                                                <td className="px-6 py-4 text-white">{cut.client_name}</td>
                                                <td className="px-6 py-4 text-white">{cut.service.name}</td>
                                                <td className="px-6 py-4 text-white/70 text-sm">
                                                    {formatDate(cut.service_date)}
                                                </td>
                                                <td className="px-6 py-4 text-white font-semibold">
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
                                    Comienza a registrar tus servicios realizados
                                </p>
                                <Link
                                    href={route('barber.cuts.create')}
                                    className="inline-block px-6 py-3 bg-white text-black font-bold hover:bg-white/90 transition"
                                >
                                    Registrar Primer Corte
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
