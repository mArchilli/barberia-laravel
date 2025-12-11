import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ auth, barbershops }) {
    const { barbershop } = usePage().props;
    const accentColor = barbershop?.accent_color || '#ffffff';

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Mis Barberías" />

            <div className="min-h-screen bg-black pt-6 pb-12">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Header */}
                    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                Mis Barberías
                            </h1>
                            <p className="text-white/60 text-sm">
                                Selecciona una barbería para acceder a su panel de administración
                            </p>
                        </div>
                        <Link
                            href={route('admin.barbershops.create')}
                            className="px-6 py-3 font-bold text-black hover:opacity-90 transition rounded-xl inline-flex items-center gap-2 justify-center"
                            style={{ backgroundColor: accentColor }}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Nueva Barbería
                        </Link>
                    </div>

                    {/* Grid de barberías */}
                    {barbershops.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {barbershops.map((shop) => (
                                <Link
                                    key={shop.id}
                                    href={route('admin.barbershops.select', shop.id)}
                                    className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-all duration-300 hover:border-white/20"
                                >
                                    {/* Logo */}
                                    <div className="mb-4">
                                        {shop.logo ? (
                                            <img
                                                src={shop.logo.startsWith('http') ? shop.logo : `/storage/${shop.logo}`}
                                                alt={shop.name}
                                                className="w-16 h-16 rounded-lg object-cover border border-white/20"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accentColor}20` }}>
                                                <svg className="w-10 h-10" fill={accentColor} viewBox="0 0 24 24">
                                                    <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"/>
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    {/* Nombre */}
                                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-white/90 transition">
                                        {shop.name}
                                    </h3>

                                    {/* Información */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-start gap-2 text-white/60 text-sm">
                                            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="flex-1">{shop.address}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-white/60 text-sm">
                                            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            {shop.phone}
                                        </div>
                                    </div>

                                    {/* Estadísticas */}
                                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                                        <div className="text-center">
                                            <div className="text-xl font-bold text-white mb-1">
                                                {shop.barbers_count}
                                            </div>
                                            <div className="text-xs text-white/60">Barberos</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-xl font-bold text-white mb-1">
                                                {shop.services_count}
                                            </div>
                                            <div className="text-xs text-white/60">Servicios</div>
                                        </div>
                                    </div>

                                    {/* Indicador hover */}
                                    <div className="mt-4 flex items-center justify-center gap-2 text-white/40 group-hover:text-white transition text-sm font-semibold">
                                        Administrar
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-12 text-center">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: `${accentColor}20` }}>
                                <svg className="w-12 h-12" fill={accentColor} viewBox="0 0 24 24">
                                    <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                No tienes barberías registradas
                            </h3>
                            <p className="text-white/60 mb-6 text-sm">
                                Crea tu primera barbería para comenzar a administrar tu negocio
                            </p>
                            <Link
                                href={route('admin.barbershops.create')}
                                className="inline-flex items-center gap-2 px-6 py-3 font-bold text-black hover:opacity-90 transition rounded-xl"
                                style={{ backgroundColor: accentColor }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Crear Mi Primera Barbería
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
