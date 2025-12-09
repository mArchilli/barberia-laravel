import { Head, Link, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ConfirmModal from '@/Components/ConfirmModal';
import { useState } from 'react';

export default function Index({ auth, barbers, admin }) {
    const [showUnlinkModal, setShowUnlinkModal] = useState(false);
    const [barberToUnlink, setBarberToUnlink] = useState(null);
    const { barbershop } = usePage().props;
    const accentColor = barbershop?.accent_color || '#ffffff';

    const handleUnlinkClick = (barber) => {
        setBarberToUnlink(barber);
        setShowUnlinkModal(true);
    };

    const handleConfirmUnlink = () => {
        if (barberToUnlink) {
            router.delete(route('admin.barbers.destroy', barberToUnlink.id));
            setShowUnlinkModal(false);
            setBarberToUnlink(null);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Gestión de Barberos" />

            <div className="min-h-screen bg-black pt-6 pb-12">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            Barberos de {barbershop?.name}
                        </h1>
                        <p className="text-white/60 text-sm">
                            Gestiona el equipo de barberos de tu barbería
                        </p>
                    </div>

                    {/* Botón Agregar Barbero */}
                    <Link
                        href={route('admin.barbers.create')}
                        className="w-full mb-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3">
                        <svg className="w-6 h-6" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-xl font-bold text-white">Agregar Barbero</span>
                    </Link>

                    {/* Lista de Barberos */}
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {/* Card del Admin (Dueño) */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${accentColor}20` }}>
                                        <svg className="w-6 h-6" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">
                                            {admin.name}
                                        </h3>
                                        <p className="text-sm text-white/50">Dueño</p>
                                    </div>
                                </div>
                                <span 
                                    className="px-3 py-1 border text-xs font-semibold rounded-lg"
                                    style={{ 
                                        backgroundColor: `${accentColor}20`,
                                        borderColor: `${accentColor}40`,
                                        color: accentColor
                                    }}
                                >
                                    ADMIN
                                </span>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-white/70">
                                    <span className="font-semibold">Email:</span> {admin.email}
                                </p>
                            </div>
                        </div>

                        {/* Cards de Barberos */}
                        {barbers.length > 0 ? (
                            barbers.map((barber) => (
                                <div key={barber.id} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                                                <svg className="w-6 h-6" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-white">
                                                    {barber.name}
                                                </h3>
                                                <p className="text-sm text-white/50">Barbero</p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 bg-white/10 border border-white/20 text-white text-xs font-semibold rounded-lg">
                                            ACTIVO
                                        </span>
                                    </div>
                                    <div className="space-y-2 mb-4">
                                        <p className="text-sm text-white/70">
                                            <span className="font-semibold">Email:</span> {barber.email}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleUnlinkClick(barber)}
                                        className="w-full py-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition text-sm font-semibold"
                                    >
                                        Desvincular
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-12 text-center">
                                <div className="mb-6 flex justify-center">
                                    <svg className="w-20 h-20" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    No hay barberos vinculados
                                </h3>
                                <p className="text-white/70 mb-6">
                                    Agrega barberos a tu equipo para que puedan gestionar sus citas
                                </p>
                                <Link
                                    href={route('admin.barbers.create')}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-colors font-medium text-white"
                                    style={{
                                        borderColor: accentColor,
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Agregar Primer Barbero
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ConfirmModal
                show={showUnlinkModal}
                onClose={() => setShowUnlinkModal(false)}
                onConfirm={handleConfirmUnlink}
                title="Desvincular Barbero"
                message={`¿Estás seguro de que deseas desvincular a "${barberToUnlink?.name}"? El barbero no podrá acceder a esta barbería hasta que lo vincules nuevamente.`}
                confirmText="Desvincular"
                cancelText="Cancelar"
                type="danger"
            />
        </AuthenticatedLayout>
    );
}
