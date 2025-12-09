import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    const { barbershop } = usePage().props;
    const accentColor = barbershop?.accent_color || '#ffffff';

    return (
        <AuthenticatedLayout>
            <Head title="Mi Perfil" />

            <div className="min-h-screen bg-black pt-6 pb-12">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <svg className="w-8 h-8" fill={accentColor} viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                            <h1 className="text-2xl md:text-3xl font-bold text-white">
                                Mi Perfil
                            </h1>
                        </div>
                        <p className="text-white/60 text-sm">
                            Administra tu información personal y configuración de seguridad
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                accentColor={accentColor}
                            />
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8">
                            <UpdatePasswordForm accentColor={accentColor} />
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8">
                            <DeleteUserForm accentColor={accentColor} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
