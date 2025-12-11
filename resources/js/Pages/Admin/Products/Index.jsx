import { Head, Link, router, usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';

export default function Index({ auth, products }) {
    const { barbershop } = usePage().props;
    const accentColor = barbershop?.accent_color || '#ffffff';
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [quantityModals, setQuantityModals] = useState({});

    const createForm = useForm({
        name: '',
    });

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        createForm.post(route('admin.products.store'), {
            onSuccess: () => {
                createForm.reset();
                setShowCreateModal(false);
            },
        });
    };

    const handleQuantityChange = (productId, action, amount) => {
        router.post(route('admin.products.update-quantity', productId), {
            action,
            amount: parseInt(amount),
        });
        setQuantityModals({});
    };

    const handleDelete = (productId) => {
        if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            router.delete(route('admin.products.destroy', productId));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Stock de Productos" />

            <div className="min-h-screen bg-black pt-6 pb-12">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Header */}
                    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                Stock de Productos
                            </h1>
                            <p className="text-white/60 text-sm">
                                Gestiona el inventario de productos de {barbershop?.name}
                            </p>
                        </div>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="px-6 py-3 font-bold text-black hover:opacity-90 transition rounded-xl inline-flex items-center gap-2 justify-center"
                            style={{ backgroundColor: accentColor }}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Nuevo Producto
                        </button>
                    </div>

                    {/* Lista de productos */}
                    {products.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <div key={product.id} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-white text-lg mb-1">
                                                {product.name}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <span className="text-white/60 text-sm">Stock:</span>
                                                <span className={`text-2xl font-bold ${product.quantity > 0 ? 'text-white' : 'text-red-400'}`}>
                                                    {product.quantity}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setQuantityModals({ ...quantityModals, [`add-${product.id}`]: true })}
                                            className="flex-1 px-4 py-2 bg-green-500/20 text-green-400 text-sm font-semibold border border-green-500/30 hover:bg-green-500/30 transition rounded-lg"
                                        >
                                            + Agregar
                                        </button>
                                        <button
                                            onClick={() => setQuantityModals({ ...quantityModals, [`subtract-${product.id}`]: true })}
                                            className="flex-1 px-4 py-2 bg-orange-500/20 text-orange-400 text-sm font-semibold border border-orange-500/30 hover:bg-orange-500/30 transition rounded-lg"
                                        >
                                            - Quitar
                                        </button>
                                    </div>

                                    {/* Modal agregar */}
                                    {quantityModals[`add-${product.id}`] && (
                                        <QuantityModal
                                            title="Agregar unidades"
                                            onConfirm={(amount) => handleQuantityChange(product.id, 'add', amount)}
                                            onClose={() => setQuantityModals({})}
                                            accentColor={accentColor}
                                        />
                                    )}

                                    {/* Modal quitar */}
                                    {quantityModals[`subtract-${product.id}`] && (
                                        <QuantityModal
                                            title="Quitar unidades"
                                            onConfirm={(amount) => handleQuantityChange(product.id, 'subtract', amount)}
                                            onClose={() => setQuantityModals({})}
                                            accentColor={accentColor}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-12 text-center">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: `${accentColor}20` }}>
                                <svg className="w-12 h-12" fill={accentColor} viewBox="0 0 24 24">
                                    <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 00-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                No hay productos registrados
                            </h3>
                            <p className="text-white/60 mb-6 text-sm">
                                Agrega productos para llevar un control de tu inventario
                            </p>
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="inline-flex items-center gap-2 px-6 py-3 font-bold text-black hover:opacity-90 transition rounded-xl"
                                style={{ backgroundColor: accentColor }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Crear Primer Producto
                            </button>
                        </div>
                    )}

                    {/* Modal crear producto */}
                    {showCreateModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <div className="fixed inset-0 bg-black/80" onClick={() => setShowCreateModal(false)}></div>
                            
                            <div className="relative bg-zinc-900 rounded-2xl border border-white/10 p-6 max-w-md w-full">
                                <h2 className="text-xl font-bold text-white mb-4">Crear Producto</h2>
                                
                                <form onSubmit={handleCreateSubmit}>
                                    <div className="mb-6">
                                        <label htmlFor="name" className="block text-white font-semibold mb-2">
                                            Nombre del Producto
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            value={createForm.data.name}
                                            onChange={(e) => createForm.setData('name', e.target.value)}
                                            placeholder="Ej: Cera para pelo"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition rounded-lg"
                                            required
                                        />
                                        {createForm.errors.name && (
                                            <p className="text-red-400 text-sm mt-2">{createForm.errors.name}</p>
                                        )}
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setShowCreateModal(false)}
                                            className="flex-1 px-6 py-3 bg-white/10 text-white font-bold border border-white/20 hover:bg-white/20 transition rounded-lg"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={createForm.processing}
                                            className="flex-1 px-6 py-3 font-bold text-black hover:opacity-90 transition rounded-lg disabled:opacity-50"
                                            style={{ backgroundColor: accentColor }}
                                        >
                                            Crear
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function QuantityModal({ title, onConfirm, onClose, accentColor }) {
    const [amount, setAmount] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(amount);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/80" onClick={onClose}></div>
            
            <div className="relative bg-zinc-900 rounded-2xl border border-white/10 p-6 max-w-sm w-full">
                <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="amount" className="block text-white font-semibold mb-2">
                            Cantidad
                        </label>
                        <input
                            id="amount"
                            type="number"
                            min="1"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition rounded-lg"
                            required
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 bg-white/10 text-white font-bold border border-white/20 hover:bg-white/20 transition rounded-lg"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 font-bold text-black hover:opacity-90 transition rounded-lg"
                            style={{ backgroundColor: accentColor }}
                        >
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
