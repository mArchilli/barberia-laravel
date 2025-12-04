import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function RegisterCutModal({ show, onClose, services, paymentMethods, storeRoute = 'barber.cuts.store' }) {
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
    
    const { data, setData, post, processing, errors, reset } = useForm({
        service_id: '',
        payment_method_id: '',
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
        post(route(storeRoute), {
            onSuccess: () => {
                reset();
                setSelectedService(null);
                onClose();
            },
        });
    };

    const handleClose = () => {
        reset();
        setSelectedService(null);
        onClose();
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black/75 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl max-h-[90vh] border border-white/20 bg-black/95 backdrop-blur-lg overflow-y-auto">
                <div className="p-8">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Registrar Nuevo Corte</h2>
                    <button
                        onClick={handleClose}
                        className="text-white/70 hover:text-white transition"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit}>
                    {/* Seleccionar Servicio */}
                    <div className="mb-6">
                        <label className="block text-white font-semibold mb-3">
                            Tipo de Servicio *
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

                    {/* Método de Pago */}
                    <div className="mb-6">
                        <label className="block text-white font-semibold mb-3">
                            Método de Pago *
                        </label>
                        <div className="grid md:grid-cols-2 gap-3">
                            {paymentMethods.map((method) => (
                                <button
                                    key={method.id}
                                    type="button"
                                    onClick={() => setData('payment_method_id', method.id)}
                                    className={`p-4 border-2 transition text-left ${
                                        data.payment_method_id === method.id
                                            ? 'border-white bg-white/10'
                                            : 'border-white/20 bg-white/5 hover:border-white/40'
                                    }`}
                                >
                                    <div className="text-white font-semibold">{method.name}</div>
                                </button>
                            ))}
                        </div>
                        {errors.payment_method_id && (
                            <p className="text-red-400 text-sm mt-2">{errors.payment_method_id}</p>
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
                        <p className="text-white/50 text-sm mt-1">
                            Precio establecido según el servicio seleccionado
                        </p>
                    </div>

                    {/* Botones */}
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 py-3 bg-white/10 text-white text-center font-semibold border border-white/20 hover:bg-white/20 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 py-3 bg-white text-black font-bold hover:bg-white/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Registrando...' : 'Registrar Corte'}
                        </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}
