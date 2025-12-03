import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center py-12 px-6">
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

                {children}
            </div>
        </div>
    );
}
