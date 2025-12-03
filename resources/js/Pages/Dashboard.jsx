import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, barbershop }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                        Dashboard Admin
                    </h2>
                    {barbershop && (
                        <Link
                            href={route('admin.barbershops.index')}
                            className="text-white/70 hover:text-white transition text-sm"
                        >
                            Cambiar Barbería →
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Dashboard Admin" />

            <div className="min-h-screen bg-black py-12">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Bienvenida */}
                    <div className="mb-8 border border-white/10 bg-white/5 backdrop-blur-sm p-8">
                        <h3 className="text-4xl font-bold text-white mb-4">
                            Bienvenido, {auth.user.name}
                        </h3>
                        {barbershop ? (
                            <div>
                                <p className="text-xl text-white/70 mb-2">
                                    Administrando: <span className="text-white font-semibold">{barbershop.name}</span>
                                </p>
                                <p className="text-white/50">
                                    📍 {barbershop.address} • 📞 {barbershop.phone}
                                </p>
                            </div>
                        ) : (
                            <p className="text-xl text-white/70">
                                Panel de administración general
                            </p>
                        )}
                    </div>

                    {/* Grid de secciones */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Barberos */}
                        <Link
                            href={route('admin.barbers.index')}
                            className="group border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xl font-bold text-white">Barberos</h4>
                                <span className="text-3xl">✂️</span>
                            </div>
                            <p className="text-white/60">Gestión de empleados</p>
                        </Link>

                        {/* Citas */}
                        <div className="group border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xl font-bold text-white">Citas</h4>
                                <span className="text-3xl">📅</span>
                            </div>
                            <p className="text-white/60">Reservas y agenda</p>
                        </div>

                        {/* Servicios */}
                        <Link
                            href={route('admin.services.index')}
                            className="group border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xl font-bold text-white">Servicios</h4>
                                <span className="text-3xl">💈</span>
                            </div>
                            <p className="text-white/60">Catálogo de servicios</p>
                        </Link>

                        {/* Clientes */}
                        <div className="group border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xl font-bold text-white">Clientes</h4>
                                <span className="text-3xl">👥</span>
                            </div>
                            <p className="text-white/60">Base de datos</p>
                        </div>

                        {/* Reportes */}
                        <div className="group border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xl font-bold text-white">Reportes</h4>
                                <span className="text-3xl">📊</span>
                            </div>
                            <p className="text-white/60">Estadísticas y análisis</p>
                        </div>

                        {/* Configuración */}
                        <Link
                            href={route('admin.settings.index')}
                            className="group border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xl font-bold text-white">Configuración</h4>
                                <span className="text-3xl">⚙️</span>
                            </div>
                            <p className="text-white/60">Ajustes generales</p>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
