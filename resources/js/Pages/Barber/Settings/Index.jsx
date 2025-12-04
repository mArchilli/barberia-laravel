import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, user }) {
    const { data, setData, post, processing, errors } = useForm({
        name: user.name || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('barber.settings.update-profile'));
    };

    const handlePasswordReset = () => {
        post(route('barber.settings.send-password-reset'), {
            email: auth.user.email
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Configuración" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white">
                            Configuración Personal
                        </h1>
                        <p className="mt-2 text-white/70">
                            Gestiona tu información de perfil
                        </p>
                    </div>

                    {/* Formulario Perfil */}
                    <form onSubmit={handleSubmit} className="border border-white/10 bg-white/5 backdrop-blur-sm p-8">
                        <h2 className="text-xl font-bold text-white mb-6">Información Personal</h2>

                        {/* Nombre */}
                        <div className="mb-6">
                            <label className="block text-white font-semibold mb-2">
                                Nombre Completo *
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition"
                            />
                            {errors.name && (
                                <p className="text-red-400 text-sm mt-2">{errors.name}</p>
                            )}
                        </div>

                        {/* Email y Contraseña */}
                        <div className="mb-8 p-4 bg-white/5 border border-white/10">
                            <h3 className="text-white font-semibold mb-3">Cuenta de Usuario</h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-white/70 text-sm mb-1">
                                        Correo Electrónico
                                    </label>
                                    <input
                                        type="email"
                                        value={auth.user.email}
                                        disabled
                                        className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white/50 cursor-not-allowed"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handlePasswordReset}
                                    className="px-4 py-2 bg-white/10 text-white text-sm border border-white/20 hover:bg-white/20 transition"
                                >
                                    Solicitar Recuperación de Contraseña
                                </button>
                                <p className="text-white/50 text-sm">
                                    Se enviará un link de recuperación a {auth.user.email}
                                </p>
                            </div>
                        </div>

                        {/* Botón Guardar */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 bg-white text-black font-bold hover:bg-white/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
