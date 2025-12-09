import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    accentColor,
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section>
            <header className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <svg className="w-6 h-6" fill={accentColor} viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    <h2 className="text-xl font-bold text-white">
                        Información del Perfil
                    </h2>
                </div>
                <p className="text-white/60 text-sm">
                    Actualiza la información de tu cuenta
                </p>
            </header>

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-white font-semibold mb-2">
                        Nombre
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition rounded-lg"
                    />
                    {errors.name && (
                        <p className="text-red-400 text-sm mt-2">{errors.name}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="email" className="block text-white font-semibold mb-2">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition rounded-lg"
                    />
                    {errors.email && (
                        <p className="text-red-400 text-sm mt-2">{errors.email}</p>
                    )}
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="rounded-lg bg-yellow-500/10 border border-yellow-500/20 p-4">
                        <p className="text-sm text-yellow-400">
                            Tu dirección de email no está verificada.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ml-1 underline hover:text-yellow-300 transition"
                            >
                                Haz clic aquí para reenviar el email de verificación.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-400">
                                Se ha enviado un nuevo enlace de verificación a tu email.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-3 font-bold text-black hover:opacity-90 transition rounded-lg disabled:opacity-50"
                        style={{ backgroundColor: accentColor }}
                    >
                        Guardar
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-400">
                            ✓ Guardado
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
