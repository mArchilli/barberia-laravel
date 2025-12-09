import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ accentColor }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section>
            <header className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                    <h2 className="text-xl font-bold text-white">
                        Eliminar Cuenta
                    </h2>
                </div>
                <p className="text-white/60 text-sm">
                    Una vez que tu cuenta sea eliminada, todos sus recursos y datos serán eliminados permanentemente. Antes de eliminar tu cuenta, descarga cualquier dato o información que desees conservar.
                </p>
            </header>

            <button
                onClick={confirmUserDeletion}
                className="px-6 py-3 bg-red-500/20 text-red-400 font-bold border border-red-500/30 hover:bg-red-500/30 transition rounded-lg"
            >
                Eliminar Cuenta
            </button>

            {/* Modal */}
            {confirmingUserDeletion && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/80" onClick={closeModal}></div>
                    
                    <div className="relative bg-zinc-900 rounded-2xl border border-white/10 p-6 max-w-md w-full">
                        <form onSubmit={deleteUser}>
                            <h2 className="text-xl font-bold text-white mb-2">
                                ¿Estás seguro de que deseas eliminar tu cuenta?
                            </h2>

                            <p className="text-white/60 text-sm mb-6">
                                Una vez que tu cuenta sea eliminada, todos sus recursos y datos serán eliminados permanentemente. Por favor, ingresa tu contraseña para confirmar que deseas eliminar tu cuenta de forma permanente.
                            </p>

                            <div className="mb-6">
                                <label htmlFor="password" className="sr-only">
                                    Contraseña
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Contraseña"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition rounded-lg"
                                />
                                {errors.password && (
                                    <p className="text-red-400 text-sm mt-2">{errors.password}</p>
                                )}
                            </div>

                            <div className="flex gap-3 justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-6 py-3 bg-white/10 text-white font-bold border border-white/20 hover:bg-white/20 transition rounded-lg"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-3 bg-red-500/20 text-red-400 font-bold border border-red-500/30 hover:bg-red-500/30 transition rounded-lg disabled:opacity-50"
                                >
                                    Eliminar Cuenta
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
