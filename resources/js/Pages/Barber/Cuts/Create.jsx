import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';

export default function Create({ auth, services, barbershop }) {
    const [selectedService, setSelectedService] = useState(null);
    
    // Obtener fecha y hora actual de Argentina (UTC-3)
    const getArgentinaDateTime = () => {
        const formatter = new Intl.DateTimeFormat('en-CA', {
            timeZone: 'America/Argentina/Buenos_Aires',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        
        const parts = formatter.formatToParts(new Date());
        const getValue = (type) => parts.find(p => p.type === type)?.value;
        
        return `${getValue('year')}-${getValue('month')}-${getValue('day')}T${getValue('hour')}:${getValue('minute')}`;
    };
    
    const { data, setData, post, processing, errors } = useForm({
        service_id: '',
        client_name: '',
        service_date: getArgentinaDateTime(),
        final_price: '',
    });

    const handleServiceSelect = (service) => {
        setSelectedService(service);
        setData({
            ...data,
            service_id: service.id,
            final_price: service.price,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('barber.cuts.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Registrar Corte" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <Link
                            href={route('barber.cuts.index')}
                            className="inline-flex items-center text-white/70 hover:text-white transition mb-4"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Volver a Mis Cortes
                        </Link>
                        <h1 className="text-3xl font-bold text-white">
                            Registrar Nuevo Corte
                        </h1>
                        <p className="mt-2 text-white/70">
                            Registra un servicio realizado en {barbershop.name}
                        </p>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="border border-white/10 bg-white/5 backdrop-blur-sm p-8">
                        {/* Seleccionar Servicio */}
                        <div className="mb-6">
                            <label className="block text-white font-semibold mb-3">
                                Seleccionar Servicio *
                            </label>
                            <div className="grid md:grid-cols-2 gap-3">
                                {services.map((service) => (
                                    <button
                                        key={service.id}
                                        type="button"
                                        onClick={() => handleServiceSelect(service)}
                                        className={`p-4 border-2 transition text-left ${
                                            selectedService?.id === service.id
                                                ? 'border-white bg-white/10'
                                                : 'border-white/20 bg-white/5 hover:border-white/40'
                                        }`}
                                    >
                                        <div className="text-white font-semibold">{service.name}</div>
                                        <div className="text-white/70 text-sm mt-1">
                                            {service.duration} min • ${service.price}
                                        </div>
                                    </button>
                                ))}
                            </div>
                            {errors.service_id && (
                                <p className="text-red-400 text-sm mt-2">{errors.service_id}</p>
                            )}
                        </div>

                        {/* Nombre del Cliente */}
                        <div className="mb-6">
                            <label htmlFor="client_name" className="block text-white font-semibold mb-2">
                                Nombre del Cliente *
                            </label>
                            <input
                                id="client_name"
                                type="text"
                                value={data.client_name}
                                onChange={(e) => setData('client_name', e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition"
                                placeholder="Ej: Juan Pérez"
                            />
                            {errors.client_name && (
                                <p className="text-red-400 text-sm mt-2">{errors.client_name}</p>
                            )}
                        </div>

                        {/* Fecha y Hora */}
                        <div className="mb-6">
                            <label htmlFor="service_date" className="block text-white font-semibold mb-2">
                                Fecha y Hora del Servicio *
                            </label>
                            <input
                                id="service_date"
                                type="datetime-local"
                                value={data.service_date}
                                readOnly
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white/70 cursor-not-allowed"
                            />
                            <p className="text-white/50 text-sm mt-1">
                                Hora actual de Argentina - No modificable
                            </p>
                            {errors.service_date && (
                                <p className="text-red-400 text-sm mt-2">{errors.service_date}</p>
                            )}
                        </div>

                        {/* Precio Final */}
                        <div className="mb-8">
                            <label htmlFor="final_price" className="block text-white font-semibold mb-2">
                                Precio del Servicio *
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70">$</span>
                                <input
                                    id="final_price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.final_price}
                                    readOnly
                                    className="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/10 text-white/70 placeholder-white/40 cursor-not-allowed"
                                    placeholder="Selecciona un servicio"
                                />
                            </div>
                            {errors.final_price && (
                                <p className="text-red-400 text-sm mt-2">{errors.final_price}</p>
                            )}
                            <p className="text-white/50 text-sm mt-1">
                                Precio establecido según el servicio seleccionado
                            </p>
                        </div>

                        {/* Botones */}
                        <div className="flex gap-4">
                            <Link
                                href={route('barber.cuts.index')}
                                className="flex-1 py-3 bg-white/10 text-white text-center font-semibold border border-white/20 hover:bg-white/20 transition"
                            >
                                Cancelar
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 py-3 bg-white text-black font-bold hover:bg-white/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Registrando...' : 'Registrar Corte'}
                            </button>
                        </div>

                        <p className="text-white/50 text-sm text-center mt-4">
                            * Campos requeridos
                        </p>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
