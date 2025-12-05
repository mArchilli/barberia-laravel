import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ConfirmModal from '@/Components/ConfirmModal';
import { useState } from 'react';

export default function Index({ auth, barbershop, barbers, admin }) {
    const [showUnlinkModal, setShowUnlinkModal] = useState(false);
    const [barberToUnlink, setBarberToUnlink] = useState(null);

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

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Botón volver */}
                    <Link
                        href={route('admin.dashboard')}
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white transition mb-6"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Volver al Dashboard
                    </Link>

                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                Barberos de {barbershop.name}
                            </h1>
                            <p className="mt-2 text-white/70">
                                Gestiona el equipo de barberos de tu barbería
                            </p>
                        </div>
                        <Link
                            href={route('admin.barbers.create')}
                            className="px-6 py-3 bg-white text-black font-bold hover:bg-white/90 transition rounded-xl"
                        >
                            + Agregar Barbero
                        </Link>
                    </div>

                    {/* Lista de Barberos */}
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {/* Card del Admin (Dueño) */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                        <span className="text-xl">👤</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">
                                            {admin.name}
                                        </h3>
                                        <p className="text-sm text-white/50">Dueño</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-semibold rounded-lg">
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
                                <div className="text-6xl mb-4">✂️</div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    No hay barberos vinculados
                                </h3>
                                <p className="text-white/70 mb-6">
                                    Agrega barberos a tu equipo para que puedan gestionar sus citas
                                </p>
                                <Link
                                    href={route('admin.barbers.create')}
                                    className="inline-block px-6 py-3 bg-white text-black font-bold hover:bg-white/90 transition rounded-xl"
                                >
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
