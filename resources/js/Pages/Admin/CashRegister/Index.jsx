import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Index({ auth, barbershop, cuts, stats, revenueByPaymentMethod, accentColor, filters }) {
    const [filterType, setFilterType] = useState('today'); // today, custom, range
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [customDate, setCustomDate] = useState('');

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (amount) => {
        return `$${Math.round(amount).toLocaleString('es-AR')}`;
    };

    const handleFilterChange = (type) => {
        setFilterType(type);
        if (type === 'today') {
            router.get(route('admin.cash-register.index'));
        }
    };

    const handleCustomDateSubmit = () => {
        if (customDate) {
            router.get(route('admin.cash-register.index', { date: customDate }));
        }
    };

    const handleRangeSubmit = () => {
        if (startDate && endDate) {
            router.get(route('admin.cash-register.index', { start_date: startDate, end_date: endDate }));
        }
    };

    // Obtener la información de fecha a mostrar
    const getDateInfo = () => {
        if (filters.start_date === filters.end_date) {
            // Día único (hoy o día específico)
            const date = new Date(filters.start_date + 'T00:00:00');
            const dayName = date.toLocaleDateString('es-ES', { weekday: 'long' });
            const dateFormatted = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
            return {
                type: 'single',
                dayName: dayName.charAt(0).toUpperCase() + dayName.slice(1),
                dateFormatted
            };
        } else {
            // Rango de fechas
            const startDateObj = new Date(filters.start_date + 'T00:00:00');
            const endDateObj = new Date(filters.end_date + 'T00:00:00');
            const startDayName = startDateObj.toLocaleDateString('es-ES', { weekday: 'long' });
            const endDayName = endDateObj.toLocaleDateString('es-ES', { weekday: 'long' });
            const startFormatted = startDateObj.toLocaleDateString('es-ES', { day: 'numeric', month: 'numeric', year: 'numeric' });
            const endFormatted = endDateObj.toLocaleDateString('es-ES', { day: 'numeric', month: 'numeric', year: 'numeric' });
            return {
                type: 'range',
                rangeLabel: 'RANGO:',
                rangeText: `${startDayName.toUpperCase()} ${startFormatted} - ${endDayName.toUpperCase()} ${endFormatted}`
            };
        }
    };

    const dateInfo = getDateInfo();

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Caja del Día" />

            <div className="min-h-screen bg-black pt-8 pb-12">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Título */}
                    <h1 className="text-3xl font-bold text-white mb-6">Caja del Día</h1>

                    {/* Card Principal - Resumen de Caja */}
                    <div className="mb-3 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md p-8 shadow-2xl shadow-black/50">
                        <div className="mb-6">
                            {dateInfo.type === 'single' ? (
                                <>
                                    <p className="text-white/60 text-sm uppercase tracking-wider mb-1">
                                        {dateInfo.dayName}
                                    </p>
                                    <p className="text-white/40 text-xs">
                                        {dateInfo.dateFormatted}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="text-white/60 text-sm uppercase tracking-wider mb-1">
                                        {dateInfo.rangeLabel}
                                    </p>
                                    <p className="text-white/40 text-xs">
                                        {dateInfo.rangeText}
                                    </p>
                                </>
                            )}
                        </div>

                        <h3 className="text-lg font-semibold text-white mb-4">Métodos de pago</h3>

                        {/* Tres métodos de pago - uno debajo del otro */}
                        <div className="space-y-3 mb-6">
                            {/* Efectivo */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <svg className="w-6 h-6" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span className="text-white font-medium">Efectivo</span>
                                </div>
                                <span className="text-xl font-bold text-white">{formatCurrency(stats.cash_total)}</span>
                            </div>

                            {/* Transferencia */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <svg className="w-6 h-6" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                    </svg>
                                    <span className="text-white font-medium">Transferencia</span>
                                </div>
                                <span className="text-xl font-bold text-white">{formatCurrency(stats.transfer_total)}</span>
                            </div>

                            {/* Tarjeta */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <svg className="w-6 h-6" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                    <span className="text-white font-medium">Tarjeta</span>
                                </div>
                                <span className="text-xl font-bold text-white">{formatCurrency(stats.card_total)}</span>
                            </div>
                        </div>

                        {/* Separador */}
                        <div className="border-t border-white/10 mb-6"></div>

                        {/* Caja Total */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white">CAJA TOTAL</h2>
                            <div className="text-4xl font-bold text-white">
                                {formatCurrency(stats.total_revenue)}
                            </div>
                        </div>
                    </div>

                    {/* Botonera de filtros */}
                    <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Filtrar por fecha</h3>
                        
                        {/* Botones de filtro */}
                        <div className="flex gap-2 mb-4">
                            <button
                                onClick={() => handleFilterChange('today')}
                                className={`px-3 py-2 text-xs rounded-lg font-medium transition ${
                                    filterType === 'today'
                                        ? 'bg-white/20 text-white border-2'
                                        : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
                                }`}
                                style={filterType === 'today' ? { borderColor: accentColor } : {}}
                            >
                                Hoy
                            </button>
                            <button
                                onClick={() => handleFilterChange('custom')}
                                className={`px-3 py-2 text-xs rounded-lg font-medium transition ${
                                    filterType === 'custom'
                                        ? 'bg-white/20 text-white border-2'
                                        : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
                                }`}
                                style={filterType === 'custom' ? { borderColor: accentColor } : {}}
                            >
                                Día específico
                            </button>
                            <button
                                onClick={() => handleFilterChange('range')}
                                className={`px-3 py-2 text-xs rounded-lg font-medium transition ${
                                    filterType === 'range'
                                        ? 'bg-white/20 text-white border-2'
                                        : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
                                }`}
                                style={filterType === 'range' ? { borderColor: accentColor } : {}}
                            >
                                Rango de fechas
                            </button>
                        </div>

                        {/* Formulario de día específico */}
                        {filterType === 'custom' && (
                            <div className="flex gap-3 items-end">
                                <div className="flex-1">
                                    <label className="block text-white/60 text-sm mb-2">Seleccionar fecha</label>
                                    <input
                                        type="date"
                                        value={customDate}
                                        onChange={(e) => setCustomDate(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-2"
                                        style={{ borderColor: customDate ? accentColor : '' }}
                                    />
                                </div>
                                <button
                                    onClick={handleCustomDateSubmit}
                                    disabled={!customDate}
                                    className="px-6 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{
                                        backgroundColor: customDate ? accentColor : '#374151',
                                        color: 'white'
                                    }}
                                >
                                    Aplicar
                                </button>
                            </div>
                        )}

                        {/* Formulario de rango de fechas */}
                        {filterType === 'range' && (
                            <div className="space-y-3">
                                <div className="flex gap-3 items-end">
                                    <div className="flex-1">
                                        <label className="block text-white/60 text-sm mb-2">Fecha inicio</label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-2"
                                            style={{ borderColor: startDate ? accentColor : '' }}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-3 items-end">
                                    <div className="flex-1">
                                        <label className="block text-white/60 text-sm mb-2">Fecha fin</label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-2"
                                            style={{ borderColor: endDate ? accentColor : '' }}
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={handleRangeSubmit}
                                    disabled={!startDate || !endDate}
                                    className="w-full px-6 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{
                                        backgroundColor: (startDate && endDate) ? accentColor : '#374151',
                                        color: 'white'
                                    }}
                                >
                                    Aplicar
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Tabla de servicios */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                        <div className="p-6 border-b border-white/10">
                            <h2 className="text-xl font-bold text-white">Detalle de Servicios del Día</h2>
                        </div>
                        
                        {cuts.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="border-b border-white/10">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-white/70 font-semibold text-sm">Hora</th>
                                            <th className="px-6 py-4 text-left text-white/70 font-semibold text-sm">Servicio</th>
                                            <th className="px-6 py-4 text-left text-white/70 font-semibold text-sm">Cliente</th>
                                            <th className="px-6 py-4 text-left text-white/70 font-semibold text-sm">Barbero</th>
                                            <th className="px-6 py-4 text-left text-white/70 font-semibold text-sm">Método de Pago</th>
                                            <th className="px-6 py-4 text-right text-white/70 font-semibold text-sm">Importe</th>
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
                                                <td className="px-6 py-4 text-white text-sm">{cut.service.name}</td>
                                                <td className="px-6 py-4 text-white text-sm">{cut.client_name}</td>
                                                <td className="px-6 py-4 text-white text-sm">{cut.barber.name}</td>
                                                <td className="px-6 py-4 text-white/70 text-sm">
                                                    {cut.payment_method ? cut.payment_method.name : 'Sin especificar'}
                                                </td>
                                                <td className="px-6 py-4 text-white font-semibold text-right text-sm">
                                                    {formatCurrency(cut.final_price)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-12 text-center">
                                <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    No hay servicios registrados hoy
                                </h3>
                                <p className="text-white/60">
                                    Los servicios realizados aparecerán aquí
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
