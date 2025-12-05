import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ConfirmModal from '@/Components/ConfirmModal';
import { useState } from 'react';

export default function Index({ auth, barbershop, services }) {
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
                                Servicios de {barbershop.name}
                            </h1>
                            <p className="mt-2 text-white/70">
                                Gestiona el catálogo de servicios disponibles
                            </p>
                        </div>
                        <Link
                            href={route('admin.services.create')}
                            className="px-6 py-3 bg-white text-black font-bold hover:bg-white/90 transition rounded-xl"
                        >
                            + Crear Servicio
                        </Link>
                    </div>

                    {/* Tabla de Servicios */}
                    {services.length > 0 ? (
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
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
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-2xl">💈</span>
                                                    <span className="font-semibold text-white text-sm">
                                                        {service.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-white/70 text-sm">
                                                {service.duration} min
                                            </td>
                                            <td className="px-6 py-4 text-white/70 text-sm">
                                                ${parseFloat(service.price).toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                {service.is_active ? (
                                                    <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-semibold rounded-lg">
                                                        ACTIVO
                                                    </span>
                                                ) : (
                                                    <span className="px-3 py-1 bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold rounded-lg">
                                                        INACTIVO
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end space-x-2">
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
                    ) : (
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-12 text-center">
                            <div className="text-6xl mb-4">💈</div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                No hay servicios registrados
                            </h3>
                            <p className="text-white/70 mb-6">
                                Agrega servicios a tu catálogo para que los clientes puedan reservar citas
                            </p>
                            <Link
                                href={route('admin.services.create')}
                                className="inline-block px-6 py-3 bg-white text-black font-bold hover:bg-white/90 transition rounded-xl"
                            >
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
