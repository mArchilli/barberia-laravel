import { Head, Link, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ConfirmModal from '@/Components/ConfirmModal';
import { useState } from 'react';

export default function Index({ auth, paymentMethods }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [methodToDelete, setMethodToDelete] = useState(null);
    const { barbershop } = usePage().props;
    const accentColor = barbershop?.accent_color || '#ffffff';

    // Función para obtener el SVG según el nombre del método de pago
    const getPaymentMethodIcon = (methodName) => {
        const name = methodName.toLowerCase();
        
        if (name.includes('efectivo') || name.includes('cash')) {
            return (
                <svg className="w-5 h-5" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            );
        } else if (name.includes('transferencia') || name.includes('transfer')) {
            return (
                <svg className="w-5 h-5" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
            );
        } else if (name.includes('tarjeta') || name.includes('card') || name.includes('débito') || name.includes('crédito')) {
            return (
                <svg className="w-5 h-5" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            );
        } else {
            // Icono por defecto (billetera/monedas)
            return (
                <svg className="w-5 h-5" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            );
        }
    };

    const handleDeleteClick = (method) => {
        setMethodToDelete(method);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        if (methodToDelete) {
            router.delete(route('admin.payment-methods.destroy', methodToDelete.id));
            setShowDeleteModal(false);
            setMethodToDelete(null);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Gestión de Medios de Pago" />

            <div className="min-h-screen bg-black pt-6 pb-12">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            Medios de Pago de {barbershop?.name}
                        </h1>
                        <p className="text-white/60 text-sm">
                            Gestiona los métodos de pago disponibles en tu barbería
                        </p>
                    </div>

                    {/* Botón Añadir Método de Pago */}
                    <Link
                        href={route('admin.payment-methods.create')}
                        className="w-full mb-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3">
                        <svg className="w-6 h-6" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-xl font-bold text-white">Añadir Método de Pago</span>
                    </Link>

                    {/* Lista de Medios de Pago */}
                    {paymentMethods.length > 0 ? (
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                            <div className="p-6 border-b border-white/10 flex items-center gap-3">
                                <svg className="w-6 h-6" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h2 className="text-xl font-bold text-white">Métodos de Pago</h2>
                            </div>

                            {/* Vista Desktop - Tabla */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">
                                                Método de Pago
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
                                        {paymentMethods.map((method) => (
                                            <tr key={method.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                                                            {getPaymentMethodIcon(method.name)}
                                                        </div>
                                                        <span className="font-semibold text-white text-sm">
                                                            {method.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {method.is_active ? (
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
                                                            href={route('admin.payment-methods.edit', method.id)}
                                                            className="px-4 py-2 bg-white/10 text-white text-sm border border-white/20 hover:bg-white/20 transition rounded-lg"
                                                        >
                                                            Editar
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDeleteClick(method)}
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

                            {/* Vista Mobile - Cards */}
                            <div className="md:hidden p-4 space-y-3">
                                {paymentMethods.map((method) => (
                                    <div key={method.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                                                    {getPaymentMethodIcon(method.name)}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-white text-sm">
                                                        {method.name}
                                                    </h3>
                                                </div>
                                            </div>
                                            {method.is_active ? (
                                                <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-semibold rounded-lg">
                                                    ACTIVO
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold rounded-lg">
                                                    INACTIVO
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <Link
                                                href={route('admin.payment-methods.edit', method.id)}
                                                className="flex-1 text-center px-4 py-2 bg-white/10 text-white text-sm border border-white/20 hover:bg-white/20 transition rounded-lg"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteClick(method)}
                                                className="flex-1 px-4 py-2 bg-red-500/20 text-red-400 text-sm border border-red-500/30 hover:bg-red-500/30 transition rounded-lg"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-12 text-center">
                            <div className="mb-6 flex justify-center">
                                <svg className="w-20 h-20" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                No hay métodos de pago registrados
                            </h3>
                            <p className="text-white/70 mb-6">
                                Añade los métodos de pago que aceptas en tu barbería
                            </p>
                            <Link
                                href={route('admin.payment-methods.create')}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-colors font-medium text-white"
                                style={{
                                    borderColor: accentColor,
                                    backgroundColor: 'transparent'
                                }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Añadir Primer Método
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <ConfirmModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                title="Eliminar Método de Pago"
                message={`¿Estás seguro de que deseas eliminar el método de pago "${methodToDelete?.name}"? Esta acción no se puede deshacer.`}
                confirmText="Eliminar"
                cancelText="Cancelar"
                type="danger"
            />
        </AuthenticatedLayout>
    );
}
