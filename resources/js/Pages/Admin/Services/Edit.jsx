import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ToggleSwitch from '@/Components/ToggleSwitch';

export default function Edit({ auth, barbershop, service }) {
    const { data, setData, put, processing, errors } = useForm({
        name: service.name || '',
        duration: service.duration || 30,
        price: service.price || '',
        is_active: Boolean(service.is_active),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.services.update', service.id));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Editar Servicio" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <Link
                            href={route('admin.services.index')}
                            className="inline-flex items-center text-white/70 hover:text-white transition mb-4"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Volver a Servicios
                        </Link>
                        <h1 className="text-3xl font-bold text-white">
                            Editar Servicio
                        </h1>
                        <p className="mt-2 text-white/70">
                            Modifica los datos del servicio de {barbershop.name}
                        </p>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="border border-white/10 bg-white/5 backdrop-blur-sm p-8">
                        {/* Nombre */}
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-white font-semibold mb-2">
                                Nombre del Servicio *
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition"
                                placeholder="Ej: Corte de Cabello"
                            />
                            {errors.name && (
                                <p className="text-red-400 text-sm mt-2">{errors.name}</p>
                            )}
                        </div>

                        {/* Duración */}
                        <div className="mb-6">
                            <label htmlFor="duration" className="block text-white font-semibold mb-2">
                                Duración (minutos) *
                            </label>
                            <input
                                id="duration"
                                type="number"
                                min="5"
                                max="480"
                                value={data.duration}
                                onChange={(e) => setData('duration', e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition"
                                placeholder="30"
                            />
                            {errors.duration && (
                                <p className="text-red-400 text-sm mt-2">{errors.duration}</p>
                            )}
                            <p className="text-white/50 text-sm mt-1">
                                Mínimo 5 minutos, máximo 480 minutos (8 horas)
                            </p>
                        </div>

                        {/* Precio */}
                        <div className="mb-6">
                            <label htmlFor="price" className="block text-white font-semibold mb-2">
                                Precio *
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70">$</span>
                                <input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition"
                                    placeholder="0.00"
                                />
                            </div>
                            {errors.price && (
                                <p className="text-red-400 text-sm mt-2">{errors.price}</p>
                            )}
                        </div>

                        {/* Estado Activo */}
                        <div className="mb-8 p-4 bg-white/5 border border-white/10">
                            <ToggleSwitch
                                checked={data.is_active}
                                onChange={(value) => setData('is_active', value)}
                                label="Servicio Activo"
                                description="Los servicios activos se mostrarán a los clientes para reservar"
                            />
                        </div>

                        {/* Botones */}
                        <div className="flex gap-4">
                            <Link
                                href={route('admin.services.index')}
                                className="flex-1 py-3 bg-white/10 text-white text-center font-semibold border border-white/20 hover:bg-white/20 transition"
                            >
                                Cancelar
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 py-3 bg-white text-black font-bold hover:bg-white/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Guardando...' : 'Guardar Cambios'}
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
