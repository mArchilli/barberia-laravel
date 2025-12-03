import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center py-12 px-6">
            <Head title="Iniciar Sesión" />

            <div className="max-w-md w-full">
                {/* Botón volver al sitio */}
                <div className="mb-8">
                    <Link
                        href={route('landing')}
                        className="inline-flex items-center text-white/70 hover:text-white transition"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Volver al sitio
                    </Link>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Iniciar Sesión
                    </h1>
                    <p className="text-white/70">
                        Accede a tu cuenta de barbería
                    </p>
                </div>

                {/* Mensaje de estado */}
                {status && (
                    <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 text-green-400 text-sm">
                        {status}
                    </div>
                )}

                {/* Formulario */}
                <form onSubmit={submit} className="border border-white/10 bg-white/5 backdrop-blur-sm p-8">
                    {/* Email */}
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-white font-semibold mb-2">
                            Correo Electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition"
                            placeholder="tu@email.com"
                        />
                        {errors.email && (
                            <p className="text-red-400 text-sm mt-2">{errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-white font-semibold mb-2">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition"
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <p className="text-red-400 text-sm mt-2">{errors.password}</p>
                        )}
                    </div>

                    {/* Remember me */}
                    <div className="mb-6">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="w-4 h-4 bg-white/5 border-white/20 text-white focus:ring-white/50"
                            />
                            <span className="ml-2 text-sm text-white/70">
                                Recordarme
                            </span>
                        </label>
                    </div>

                    {/* Botones */}
                    <div className="space-y-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 bg-white text-black font-bold text-lg hover:bg-white/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </button>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="block text-center text-sm text-white/70 hover:text-white transition"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
