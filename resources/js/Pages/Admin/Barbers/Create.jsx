import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ auth, availableBarbers }) {
    const { barbershop } = usePage().props;
    const accentColor = barbershop?.accent_color || '#ffffff';
    
    const { data, setData, post, processing, errors } = useForm({
        barber_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.barbers.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Vincular Barbero" />

            <div className="min-h-screen bg-black pt-6 pb-12">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Header */}
                    <div className="mb-6">
                        <Link
                            href={route('admin.barbers.index')}
                            className="inline-flex items-center text-white/70 hover:text-white transition mb-4"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Volver a Barberos
                        </Link>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                    Vincular Barbero
                                </h1>
                                <p className="text-white/60 text-sm">
                                    Selecciona un barbero existente o crea uno nuevo para {barbershop?.name}
                                </p>
                            </div>
                            <Link
                                href={route('admin.barbers.create-new')}
                                className="px-6 py-3 font-bold text-black hover:opacity-90 transition rounded-xl inline-flex items-center gap-2 justify-center"
                                style={{ backgroundColor: accentColor }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Crear Nuevo Barbero
                            </Link>
                        </div>
                    </div>

                    {/* Lista de Barberos Disponibles */}
                    {availableBarbers.length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 md:grid-cols-2">
                                {availableBarbers.map((barber) => (
                                    <label
                                        key={barber.id}
                                        className={`
                                            rounded-2xl border cursor-pointer p-6 transition-all backdrop-blur-sm
                                            ${data.barber_id === barber.id 
                                                ? 'bg-white/10 border-white/30' 
                                                : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                                            }
                                        `}
                                    >
                                        <input
                                            type="radio"
                                            name="barber_id"
                                            value={barber.id}
                                            checked={data.barber_id === barber.id}
                                            onChange={(e) => setData('barber_id', e.target.value)}
                                            className="hidden"
                                        />
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-white">
                                                    {barber.name}
                                                </h3>
                                                <p className="text-sm text-white/60">Barbero</p>
                                            </div>
                                            {data.barber_id === barber.id && (
                                                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                                                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm text-white/70">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                {barber.email}
                                            </div>
                                            {barber.barbershop_id ? (
                                                <div className="flex items-center gap-2 text-xs text-yellow-400">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    Trabaja en otra barbería
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-xs text-green-400">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    Disponible
                                                </div>
                                            )}
                                        </div>
                                    </label>
                                ))}
                            </div>

                            {errors.barber_id && (
                                <p className="text-red-400 text-sm mt-3">{errors.barber_id}</p>
                            )}

                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                <Link
                                    href={route('admin.barbers.index')}
                                    className="flex-1 py-3 rounded-xl bg-white/10 text-white text-center font-bold border border-white/20 hover:bg-white/20 transition"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing || !data.barber_id}
                                    className="flex-1 py-3 rounded-xl font-bold text-black hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{ backgroundColor: accentColor }}
                                >
                                    {processing ? 'Vinculando...' : 'Vincular Barbero Seleccionado'}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-12 text-center">
                            <h3 className="text-xl font-bold text-white mb-2">
                                No hay barberos disponibles
                            </h3>
                            <p className="text-white/60 mb-6 text-sm">
                                Todos los barberos registrados ya están vinculados a esta barbería. Crea un nuevo barbero para agregarlo al equipo.
                            </p>
                            <Link
                                href={route('admin.barbers.create-new')}
                                className="inline-flex items-center gap-2 px-6 py-3 font-bold text-black hover:opacity-90 transition rounded-xl"
                                style={{ backgroundColor: accentColor }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Crear Nuevo Barbero
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
