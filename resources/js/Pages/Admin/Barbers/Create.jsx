import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ auth, barbershop, availableBarbers }) {
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

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <Link
                                href={route('admin.barbers.index')}
                                className="inline-flex items-center text-white/70 hover:text-white transition mb-4"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Volver a Barberos
                            </Link>
                            <h1 className="text-3xl font-bold text-white">
                                Vincular Barbero a {barbershop.name}
                            </h1>
                            <p className="mt-2 text-white/70">
                                Selecciona un barbero existente o crea uno nuevo
                            </p>
                        </div>
                        <Link
                            href={route('admin.barbers.create-new')}
                            className="px-6 py-3 bg-white text-black font-bold hover:bg-white/90 transition rounded-xl"
                        >
                            + Crear Nuevo Barbero
                        </Link>
                    </div>

                    {/* Lista de Barberos Disponibles */}
                    {availableBarbers.length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-3 md:grid-cols-2">
                                {availableBarbers.map((barber) => (
                                    <label
                                        key={barber.id}
                                        className={`
                                            rounded-2xl border cursor-pointer p-6 transition-all
                                            ${data.barber_id === barber.id 
                                                ? 'border-white bg-white/10' 
                                                : 'border-white/10 bg-white/5 hover:bg-white/10'
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
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                                    <span className="text-xl">✂️</span>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-white">
                                                        {barber.name}
                                                    </h3>
                                                    <p className="text-sm text-white/50">Barbero</p>
                                                </div>
                                            </div>
                                            {data.barber_id === barber.id && (
                                                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                                    <span className="text-black text-sm">✓</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-white/70">
                                                <span className="font-semibold">Email:</span> {barber.email}
                                            </p>
                                            {barber.barbershop_id ? (
                                                <p className="text-xs text-yellow-400">
                                                    ⚠️ Trabaja en otra barbería
                                                </p>
                                            ) : (
                                                <p className="text-xs text-green-400">
                                                    ✓ Disponible
                                                </p>
                                            )}
                                        </div>
                                    </label>
                                ))}
                            </div>

                            {errors.barber_id && (
                                <p className="text-red-400 text-sm mt-3">{errors.barber_id}</p>
                            )}

                            <div className="mt-6 flex gap-4">
                                <Link
                                    href={route('admin.barbers.index')}
                                    className="flex-1 py-3 rounded-xl bg-white/10 text-white text-center font-semibold border border-white/20 hover:bg-white/20 transition"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing || !data.barber_id}
                                    className="flex-1 py-3 rounded-xl bg-white text-black font-bold hover:bg-white/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Vinculando...' : 'Vincular Barbero Seleccionado'}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-12 text-center">
                            <div className="text-6xl mb-4">✂️</div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                No hay barberos disponibles
                            </h3>
                            <p className="text-white/70 mb-6">
                                Todos los barberos registrados ya están vinculados a esta barbería. Crea un nuevo barbero para agregarlo al equipo.
                            </p>
                            <Link
                                href={route('admin.barbers.create-new')}
                                className="inline-block px-6 py-3 bg-white text-black font-bold hover:bg-white/90 transition rounded-xl"
                            >
                                Crear Nuevo Barbero
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
