import { Head, Link, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ConfirmModal from '@/Components/ConfirmModal';
import { useState } from 'react';

export default function Index({ auth, services }) {
    const { barbershop } = usePage().props;
    const accentColor = barbershop?.accent_color || '#ffffff';
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState(null);

    const handleDeleteClick = (service) => {
        setServiceToDelete(service);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        if (serviceToDelete) {
            router.delete(route('admin.services.destroy', serviceToDelete.id));
            setShowDeleteModal(false);
            setServiceToDelete(null);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Gestión de Servicios" />

            <div className="min-h-screen bg-black pt-6 pb-12">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Header */}
                    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <svg className="w-8 h-8" fill={accentColor} viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                                </svg>
                                <h1 className="text-2xl md:text-3xl font-bold text-white">
                                    Servicios
                                </h1>
                            </div>
                            <p className="text-white/60 text-sm">
                                Gestiona el catálogo de servicios de {barbershop?.name}
                            </p>
                        </div>
                        <Link
                            href={route('admin.services.create')}
                            className="px-6 py-3 font-bold text-black hover:opacity-90 transition rounded-xl inline-flex items-center gap-2 justify-center"
                            style={{ backgroundColor: accentColor }}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Crear Servicio
                        </Link>
                    </div>

                    {/* Tabla de Servicios - Desktop */}
                    {services.length > 0 ? (
                        <>
                            <div className="hidden md:block rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">
                                                Servicio
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">
                                                Duración
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">
                                                Precio
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">
                                                Estado
                                            </th>
                                            <th className="px-6 py-4 text-right text-xs font-semibold text-white/60 uppercase tracking-wider">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {services.map((service) => (
                                            <tr key={service.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4">
                                                    <span className="font-semibold text-white">
                                                        {service.name}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-white/70">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        {service.duration} min
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-white/70">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        ${parseFloat(service.price).toFixed(2)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {service.is_active ? (
                                                        <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-semibold rounded-lg inline-flex items-center gap-1">
                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                            </svg>
                                                            ACTIVO
                                                        </span>
                                                    ) : (
                                                        <span className="px-3 py-1 bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold rounded-lg inline-flex items-center gap-1">
                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                            </svg>
                                                            INACTIVO
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={route('admin.services.edit', service.id)}
                                                            className="px-4 py-2 bg-white/10 text-white text-sm border border-white/20 hover:bg-white/20 transition rounded-lg"
                                                        >
                                                            Editar
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDeleteClick(service)}
                                                            className="px-4 py-2 bg-red-500/20 text-red-400 text-sm border border-red-500/30 hover:bg-red-500/30 transition rounded-lg"
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Cards - Mobile */}
                            <div className="md:hidden space-y-4">
                                {services.map((service) => (
                                    <div key={service.id} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-white text-lg mb-1">
                                                    {service.name}
                                                </h3>
                                                {service.is_active ? (
                                                    <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-semibold rounded inline-flex items-center gap-1">
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                        ACTIVO
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold rounded inline-flex items-center gap-1">
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                        </svg>
                                                        INACTIVO
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2 text-white/60">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    Duración
                                                </div>
                                                <span className="text-white font-semibold">{service.duration} min</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2 text-white/60">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    Precio
                                                </div>
                                                <span className="text-white font-semibold">${parseFloat(service.price).toFixed(2)}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <Link
                                                href={route('admin.services.edit', service.id)}
                                                className="flex-1 px-4 py-2 bg-white/10 text-white text-sm text-center border border-white/20 hover:bg-white/20 transition rounded-lg font-semibold"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteClick(service)}
                                                className="flex-1 px-4 py-2 bg-red-500/20 text-red-400 text-sm border border-red-500/30 hover:bg-red-500/30 transition rounded-lg font-semibold"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-12 text-center">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: `${accentColor}20` }}>
                                <svg className="w-12 h-12" fill={accentColor} viewBox="0 0 24 24">
                                    <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1 16.5l-4-4 1.41-1.41L11 15.68l5.59-5.59L18 11.5l-7 7z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                No hay servicios registrados
                            </h3>
                            <p className="text-white/60 mb-6 text-sm md:text-base">
                                Agrega servicios a tu catálogo para que los clientes puedan reservar citas
                            </p>
                            <Link
                                href={route('admin.services.create')}
                                className="inline-flex items-center gap-2 px-6 py-3 font-bold text-black hover:opacity-90 transition rounded-xl"
                                style={{ backgroundColor: accentColor }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Crear Primer Servicio
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <ConfirmModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                title="Eliminar Servicio"
                message={`¿Estás seguro de que deseas eliminar el servicio "${serviceToDelete?.name}"? Esta acción no se puede deshacer.`}
                confirmText="Eliminar"
                cancelText="Cancelar"
                type="danger"
            />
        </AuthenticatedLayout>
    );
}
