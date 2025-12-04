import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, barbershop, cuts, stats, revenueByPaymentMethod }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (amount) => {
        return `$${parseFloat(amount).toFixed(2)}`;
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Caja del Día" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white">
                            Caja del Día
                        </h1>
                        <p className="mt-2 text-white/70">
                            {barbershop.name} - {new Date().toLocaleDateString('es-ES', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}
                        </p>
                    </div>

                    {/* Estadísticas principales */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {/* Total de cortes */}
                        <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-white/70 font-semibold">Total de Cortes Hoy</h3>
                                <span className="text-3xl">✂️</span>
                            </div>
                            <div className="text-5xl font-bold text-white">
                                {stats.total_cuts}
                            </div>
                            <div className="text-white/50 text-sm mt-2">
                                Servicios realizados
                            </div>
                        </div>

                        {/* Total facturado */}
                        <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-white/70 font-semibold">Total Facturado Hoy</h3>
                                <span className="text-3xl">💰</span>
                            </div>
                            <div className="text-5xl font-bold text-white">
                                {formatCurrency(stats.total_revenue)}
                            </div>
                            <div className="text-white/50 text-sm mt-2">
                                Ingresos del día
                            </div>
                        </div>
                    </div>

                    {/* Tabla de servicios */}
                    <div className="border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden mb-8">
                        <div className="p-6 border-b border-white/10">
                            <h2 className="text-xl font-bold text-white">Detalle de Servicios del Día</h2>
                        </div>
                        
                        {cuts.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="border-b border-white/10">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-white/70 font-semibold">Hora</th>
                                            <th className="px-6 py-4 text-left text-white/70 font-semibold">Servicio</th>
                                            <th className="px-6 py-4 text-left text-white/70 font-semibold">Cliente</th>
                                            <th className="px-6 py-4 text-left text-white/70 font-semibold">Barbero</th>
                                            <th className="px-6 py-4 text-left text-white/70 font-semibold">Método de Pago</th>
                                            <th className="px-6 py-4 text-right text-white/70 font-semibold">Importe</th>
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
                                                <td className="px-6 py-4 text-white/70 text-sm">
                                                    {formatDate(cut.service_date)}
                                                </td>
                                                <td className="px-6 py-4 text-white">{cut.service.name}</td>
                                                <td className="px-6 py-4 text-white">{cut.client_name}</td>
                                                <td className="px-6 py-4 text-white">{cut.barber.name}</td>
                                                <td className="px-6 py-4 text-white/70">
                                                    {cut.payment_method ? cut.payment_method.name : 'Sin especificar'}
                                                </td>
                                                <td className="px-6 py-4 text-white font-semibold text-right">
                                                    {formatCurrency(cut.final_price)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-12 text-center">
                                <div className="text-6xl mb-4">📊</div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    No hay servicios registrados hoy
                                </h3>
                                <p className="text-white/60">
                                    Los servicios realizados aparecerán aquí
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Resumen por método de pago */}
                    <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Resumen por Método de Pago</h2>
                        
                        <div className="grid md:grid-cols-3 gap-6 mb-6">
                            {/* Efectivo */}
                            <div className="border border-white/10 bg-white/5 p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-white/70 font-semibold">Efectivo</h3>
                                    <span className="text-2xl">💵</span>
                                </div>
                                <div className="text-3xl font-bold text-white">
                                    {formatCurrency(stats.cash_total)}
                                </div>
                            </div>

                            {/* Tarjeta */}
                            <div className="border border-white/10 bg-white/5 p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-white/70 font-semibold">Tarjeta</h3>
                                    <span className="text-2xl">💳</span>
                                </div>
                                <div className="text-3xl font-bold text-white">
                                    {formatCurrency(stats.card_total)}
                                </div>
                            </div>

                            {/* Transferencia */}
                            <div className="border border-white/10 bg-white/5 p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-white/70 font-semibold">Transferencia</h3>
                                    <span className="text-2xl">🔄</span>
                                </div>
                                <div className="text-3xl font-bold text-white">
                                    {formatCurrency(stats.transfer_total)}
                                </div>
                            </div>
                        </div>

                        {/* Total general */}
                        <div className="border-t border-white/10 pt-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold text-white">TOTAL FACTURADO</h3>
                                <div className="text-4xl font-bold text-white">
                                    {formatCurrency(stats.total_revenue)}
                                </div>
                            </div>
                        </div>

                        {/* Detalle de todos los métodos */}
                        {revenueByPaymentMethod.length > 0 && (
                            <div className="mt-6 border-t border-white/10 pt-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Detalle completo</h3>
                                <div className="space-y-3">
                                    {revenueByPaymentMethod.map((payment, index) => (
                                        <div key={index} className="flex justify-between items-center text-white/70">
                                            <span>{payment.payment_method} ({payment.count} {payment.count === 1 ? 'servicio' : 'servicios'})</span>
                                            <span className="font-semibold text-white">{formatCurrency(payment.total)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
