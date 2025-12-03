import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function CreateNew({ auth, barbershop }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.barbers.store-new'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Crear Nuevo Barbero" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <Link
                            href={route('admin.barbers.create')}
                            className="inline-flex items-center text-white/70 hover:text-white transition mb-4"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Volver
                        </Link>
                        <h1 className="text-3xl font-bold text-white">
                            Crear Nuevo Barbero
                        </h1>
                        <p className="mt-2 text-white/70">
                            Crea una cuenta para un nuevo miembro del equipo de {barbershop.name}
                        </p>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="border border-white/10 bg-white/5 backdrop-blur-sm p-8">
                        {/* Nombre */}
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-white font-semibold mb-2">
                                Nombre Completo *
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition"
                                placeholder="Ej: Juan Pérez"
                            />
                            {errors.name && (
                                <p className="text-red-400 text-sm mt-2">{errors.name}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-white font-semibold mb-2">
                                Correo Electrónico *
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition"
                                placeholder="barbero@email.com"
                            />
                            {errors.email && (
                                <p className="text-red-400 text-sm mt-2">{errors.email}</p>
                            )}
                        </div>

                        {/* Teléfono */}
                        <div className="mb-6">
                            <label htmlFor="phone" className="block text-white font-semibold mb-2">
                                Teléfono (Opcional)
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition"
                                placeholder="+1 (555) 123-4567"
                            />
                            {errors.phone && (
                                <p className="text-red-400 text-sm mt-2">{errors.phone}</p>
                            )}
                        </div>

                        {/* Contraseña */}
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-white font-semibold mb-2">
                                Contraseña *
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition"
                                placeholder="Mínimo 8 caracteres"
                            />
                            {errors.password && (
                                <p className="text-red-400 text-sm mt-2">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirmar Contraseña */}
                        <div className="mb-8">
                            <label htmlFor="password_confirmation" className="block text-white font-semibold mb-2">
                                Confirmar Contraseña *
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition"
                                placeholder="Repite la contraseña"
                            />
                        </div>

                        {/* Información adicional */}
                        <div className="mb-6 p-4 bg-white/5 border border-white/10">
                            <p className="text-sm text-white/70">
                                <span className="font-semibold text-white">ℹ️ Información:</span> El barbero podrá iniciar sesión con este correo y contraseña para gestionar sus propias citas y ver su agenda personal.
                            </p>
                        </div>

                        {/* Botones */}
                        <div className="flex gap-4">
                            <Link
                                href={route('admin.barbers.create')}
                                className="flex-1 py-3 bg-white/10 text-white text-center font-semibold border border-white/20 hover:bg-white/20 transition"
                            >
                                Cancelar
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 py-3 bg-white text-black font-bold hover:bg-white/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Creando...' : 'Crear Barbero'}
                            </button>
                        </div>

                        <p className="text-white/50 text-sm text-center mt-4">
                            * Campos requeridos
                        </p>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
