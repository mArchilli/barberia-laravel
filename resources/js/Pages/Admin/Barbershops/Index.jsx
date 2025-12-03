import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, barbershops }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                        Mis Barberías
                    </h2>
                    <Link
                        href={route('admin.barbershops.create')}
                        className="px-6 py-2 bg-white text-black font-semibold hover:bg-white/90 transition"
                    >
                        + Nueva Barbería
                    </Link>
                </div>
            }
        >
            <Head title="Mis Barberías" />

            <div className="min-h-screen bg-black py-12">
                <div className="mx-auto max-w-7xl px-6">
                    <p className="text-white/70 text-lg mb-8">
                        Selecciona una barbería para acceder a su panel de administración
                    </p>

                    {/* Grid de barberías */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {barbershops.map((barbershop) => (
                            <Link
                                key={barbershop.id}
                                href={route('admin.barbershops.select', barbershop.id)}
                                className="group border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-all duration-300"
                            >
                                {/* Logo */}
                                {barbershop.logo ? (
                                    <div className="mb-6">
                                        <img
                                            src={`/${barbershop.logo}`}
                                            alt={barbershop.name}
                                            className="w-20 h-20 object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="mb-6 text-5xl">💈</div>
                                )}

                                {/* Nombre */}
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white/80 transition">
                                    {barbershop.name}
                                </h3>

                                {/* Información */}
                                <div className="space-y-2 mb-6">
                                    <p className="text-white/60 flex items-center">
                                        <span className="mr-2">📍</span>
                                        {barbershop.address}
                                    </p>
                                    <p className="text-white/60 flex items-center">
                                        <span className="mr-2">📞</span>
                                        {barbershop.phone}
                                    </p>
                                    <p className="text-white/60 flex items-center">
                                        <span className="mr-2">🕐</span>
                                        {barbershop.opening_time} - {barbershop.closing_time}
                                    </p>
                                </div>

                                {/* Estadísticas */}
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                                    <div>
                                        <div className="text-2xl font-bold text-white">
                                            {barbershop.barbers_count}
                                        </div>
                                        <div className="text-sm text-white/60">Barberos</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white">
                                            {barbershop.services_count}
                                        </div>
                                        <div className="text-sm text-white/60">Servicios</div>
                                    </div>
                                </div>

                                {/* Indicador hover */}
                                <div className="mt-6 text-white/40 group-hover:text-white transition text-sm">
                                    Click para administrar →
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Mensaje si no hay barberías */}
                    {barbershops.length === 0 && (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">🏪</div>
                            <p className="text-white/60 text-xl mb-6">
                                No tienes barberías creadas aún
                            </p>
                            <Link
                                href={route('admin.barbershops.create')}
                                className="inline-block px-8 py-3 bg-white text-black font-semibold hover:bg-white/90 transition"
                            >
                                Crear Mi Primera Barbería
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
