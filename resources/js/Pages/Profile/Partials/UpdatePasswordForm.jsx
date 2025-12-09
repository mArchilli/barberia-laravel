import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdatePasswordForm({ accentColor }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section>
            <header className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <svg className="w-6 h-6" fill={accentColor} viewBox="0 0 24 24">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                    </svg>
                    <h2 className="text-xl font-bold text-white">
                        Actualizar Contraseña
                    </h2>
                </div>
                <p className="text-white/60 text-sm">
                    Asegúrate de usar una contraseña larga y segura
                </p>
            </header>

            <form onSubmit={updatePassword} className="space-y-6">
                <div>
                    <label htmlFor="current_password" className="block text-white font-semibold mb-2">
                        Contraseña Actual
                    </label>
                    <input
                        id="current_password"
                        ref={currentPasswordInput}
                        type="password"
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        autoComplete="current-password"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition rounded-lg"
                    />
                    {errors.current_password && (
                        <p className="text-red-400 text-sm mt-2">{errors.current_password}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="block text-white font-semibold mb-2">
                        Nueva Contraseña
                    </label>
                    <input
                        id="password"
                        ref={passwordInput}
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        autoComplete="new-password"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition rounded-lg"
                    />
                    {errors.password && (
                        <p className="text-red-400 text-sm mt-2">{errors.password}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password_confirmation" className="block text-white font-semibold mb-2">
                        Confirmar Contraseña
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        autoComplete="new-password"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition rounded-lg"
                    />
                    {errors.password_confirmation && (
                        <p className="text-red-400 text-sm mt-2">{errors.password_confirmation}</p>
                    )}
                </div>

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
