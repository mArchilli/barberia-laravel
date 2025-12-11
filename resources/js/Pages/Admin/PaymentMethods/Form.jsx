import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ToggleSwitch from '@/Components/ToggleSwitch';

export default function Form({ auth, paymentMethod }) {
    const { barbershop } = usePage().props;
    const accentColor = barbershop?.accent_color || '#ffffff';
    const isEditing = paymentMethod !== null;

    const { data, setData, post, put, processing, errors } = useForm({
        name: paymentMethod?.name || '',
        is_active: paymentMethod?.is_active ?? true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.payment-methods.update', paymentMethod.id));
        } else {
            post(route('admin.payment-methods.store'));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={isEditing ? 'Editar Método de Pago' : 'Crear Método de Pago'} />

            <div className="py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    {/* Header */}
                    <div className="mb-6 sm:mb-8">
                        <Link
                            href={route('admin.payment-methods.index')}
                            className="inline-flex items-center text-white/70 hover:text-white transition mb-4"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Volver a Métodos de Pago
                        </Link>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">
                            {isEditing ? 'Editar Método de Pago' : 'Añadir Método de Pago'}
                        </h1>
                        <p className="mt-2 text-sm sm:text-base text-white/70">
                            {isEditing 
                                ? `Modifica la información del método de pago` 
                                : `Añade un nuevo método de pago a ${barbershop?.name || 'tu barbería'}`
                            }
                        </p>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 sm:p-8">
                        {/* Nombre */ }
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-white font-semibold mb-2">
                                Nombre del Método de Pago *
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition"
                                placeholder="Ej: Efectivo, Tarjeta de Crédito, Transferencia"
                            />
                            {errors.name && (
                                <p className="text-red-400 text-sm mt-2">{errors.name}</p>
                            )}
                            <p className="text-white/50 text-sm mt-1">
                                Ingresa el nombre del método de pago que aceptas
                            </p>
                        </div>

                        {/* Estado Activo */}
                        <div className="mb-8 p-4 rounded-lg bg-white/5 border border-white/10">
                            <ToggleSwitch
                                checked={data.is_active}
                                onChange={(value) => setData('is_active', value)}
                                label="Método Activo"
                                description="Los métodos activos estarán disponibles para los clientes"
                            />
                        </div>

                        {/* Botones */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <Link
                                href={route('admin.payment-methods.index')}
                                className="flex-1 py-3 rounded-xl bg-white/10 text-white text-center font-semibold border border-white/20 hover:bg-white/20 transition"
                            >
                                Cancelar
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                style={{ backgroundColor: processing ? '#888' : accentColor }}
                                className="flex-1 py-3 rounded-xl text-black font-bold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing 
                                    ? (isEditing ? 'Guardando...' : 'Creando...') 
                                    : (isEditing ? 'Guardar Cambios' : 'Añadir Método')
                                }
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
