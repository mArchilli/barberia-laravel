import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import RegisterCutModal from '@/Components/RegisterCutModal';
import { formatCurrency } from '@/utils/currency';
import { useState } from 'react';

export default function BarberDashboard({ auth, stats, services, paymentMethods }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-3xl font-bold tracking-tight text-white">
                    Dashboard Barbero
                </h2>
            }
        >
            <Head title="Dashboard Barbero" />

            <div className="min-h-screen bg-black py-12">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Bienvenida */}
                    <div className="mb-8 border border-white/10 bg-white/5 backdrop-blur-sm p-8">
                        <h3 className="text-4xl font-bold text-white mb-4">
                            Bienvenido, {auth.user.name} 💈
                        </h3>
                        <p className="text-xl text-white/70">
                            Panel personal de barbero
                        </p>
                    </div>

                    {/* Estadísticas */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        {/* Cortes Hoy */}
                        <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-white/70 font-semibold">Hoy</h3>
                                <span className="text-2xl">📅</span>
                            </div>
                            <div className="text-4xl font-bold text-white mb-1">
                                {stats.cuts_today}
                            </div>
                            <div className="text-white/50 text-sm mb-3">
                                Cortes realizados
                            </div>
                            <div className="text-2xl font-semibold text-white">
                                {formatCurrency(stats.earnings_today)}
                            </div>
                            <div className="text-white/50 text-sm">
                                Ganancia del día
                            </div>
                        </div>

                        {/* Cortes Este Mes */}
                        <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-white/70 font-semibold">Este Mes</h3>
                                <span className="text-2xl">📊</span>
                            </div>
                            <div className="text-4xl font-bold text-white mb-1">
                                {stats.cuts_this_month}
                            </div>
                            <div className="text-white/50 text-sm mb-3">
                                Cortes realizados
                            </div>
                            <div className="text-2xl font-semibold text-white">
                                {formatCurrency(stats.earnings_this_month)}
                            </div>
                            <div className="text-white/50 text-sm">
                                Ganancia mensual
                            </div>
                        </div>

                        {/* Cortes Totales */}
                        <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-white/70 font-semibold">Total</h3>
                                <span className="text-2xl">💰</span>
                            </div>
                            <div className="text-4xl font-bold text-white mb-1">
                                {stats.total_cuts}
                            </div>
                            <div className="text-white/50 text-sm mb-3">
                                Cortes realizados
                            </div>
                            <div className="text-2xl font-semibold text-white">
                                {formatCurrency(stats.total_earnings)}
                            </div>
                            <div className="text-white/50 text-sm">
                                Ganancia total
                            </div>
                        </div>
                    </div>

                    {/* Grid de secciones */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Mis Cortes */}
                        <Link
                            href={route('barber.cuts.index')}
                            className="group border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xl font-bold text-white">Mis Cortes</h4>
                                <span className="text-3xl">✂️</span>
                            </div>
                            <p className="text-white/60 mb-6">Historial y registro de servicios</p>
                            <div className="text-white font-semibold">
                                Ver todos →
                            </div>
                        </Link>

                        {/* Registrar Corte */}
                        <button
                            onClick={() => setShowModal(true)}
                            className="group border-2 border-white bg-white/10 backdrop-blur-sm p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer w-full text-left"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xl font-bold text-white">Registrar Corte</h4>
                                <span className="text-3xl">➕</span>
                            </div>
                            <p className="text-white/60 mb-6">Añadir nuevo servicio realizado</p>
                            <div className="text-white font-semibold">
                                Registrar ahora →
                            </div>
                        </button>

                        {/* Mi Agenda */}
                        <div className="group border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xl font-bold text-white">Mi Agenda</h4>
                                <span className="text-3xl">📅</span>
                            </div>
                            <p className="text-white/60 mb-6">Gestiona tus citas del día</p>
                            <div className="text-white/40 text-sm">Próximamente</div>
                        </div>

                        {/* Configuración Personal */}
                        <Link
                            href={route('barber.settings.index')}
                            className="group border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xl font-bold text-white">Configuración</h4>
                                <span className="text-3xl">⚙️</span>
                            </div>
                            <p className="text-white/60 mb-6">Ajustes de tu perfil</p>
                            <div className="text-white font-semibold">
                                Configurar →
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Modal de Registro de Corte */}
            <RegisterCutModal 
                show={showModal}
                onClose={() => setShowModal(false)}
                services={services}
                paymentMethods={paymentMethods}
            />
        </AuthenticatedLayout>
    );
}
