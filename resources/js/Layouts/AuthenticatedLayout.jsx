import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const barbershop = usePage().props.barbershop;
    const accentColor = barbershop?.accent_color || '#ffffff';

    const [showingSideMenu, setShowingSideMenu] = useState(false);

    return (
        <div className="min-h-screen bg-black">
            <nav className="fixed top-0 left-0 right-0 border-b border-white/5 bg-black/80 backdrop-blur-xl shadow-lg shadow-black/50 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        {/* Logo y nombre a la izquierda */}
                        <div className="flex items-center gap-3">
                            {barbershop?.logo ? (
                                <img 
                                    src={barbershop.logo.startsWith('http') ? barbershop.logo : `/storage/${barbershop.logo}`}
                                    alt={barbershop?.name || 'Barbería'}
                                    className="h-10 w-10 rounded-full object-cover border border-white/20"
                                />
                            ) : (
                                <div className="h-10 w-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                                    <span className="text-white text-lg">💈</span>
                                </div>
                            )}
                            <span className="text-lg font-bold text-white tracking-wider">
                                {barbershop?.name || 'BARBERSHOP'}
                            </span>
                        </div>

                        {/* Botón hamburguesa a la derecha */}
                        <button
                            onClick={() => setShowingSideMenu(!showingSideMenu)}
                            className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors hover:bg-white/10"
                            style={{ color: accentColor }}
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={!showingSideMenu ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={showingSideMenu ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Overlay cuando el menú está abierto */}
            {showingSideMenu && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    onClick={() => setShowingSideMenu(false)}
                />
            )}

            {/* Menu lateral - slide desde derecha a izquierda */}
            <div 
                className={`
                    fixed top-0 bottom-0 right-0 w-80 transform transition-transform duration-300 ease-in-out
                    ${showingSideMenu ? 'translate-x-0' : 'translate-x-full'}
                    bg-black/95 backdrop-blur-xl border-l border-white/10 shadow-2xl shadow-black/50 z-50
                `}
            >
                <div className="flex flex-col h-full">
                    {/* Header del menú */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                        <h3 className="text-lg font-bold text-white uppercase tracking-wider">Menú</h3>
                        <button
                            onClick={() => setShowingSideMenu(false)}
                            className="transition-colors p-2 hover:bg-white/10 rounded-lg"
                            style={{ color: accentColor }}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Contenido del menú */}
                    <div className="flex-1 overflow-y-auto py-4">
                        <div className="space-y-1 px-3">
                            <Link
                                href={route('dashboard')}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                                    route().current('dashboard')
                                        ? 'bg-white/10 text-white border-l-4'
                                        : 'text-white/70 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                                }`}
                                style={route().current('dashboard') ? { borderLeftColor: accentColor } : {}}
                            >
                                Panel principal
                            </Link>
                            
                            {user.role === 'admin' && (
                                <>
                                    <Link
                                        href={route('admin.barbers.index')}
                                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                                            route().current('admin.barbers.*')
                                                ? 'bg-white/10 text-white border-l-4'
                                                : 'text-white/70 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                                        }`}
                                        style={route().current('admin.barbers.*') ? { borderLeftColor: accentColor } : {}}
                                    >
                                        Barberos
                                    </Link>
                                    <Link
                                        href={route('admin.services.index')}
                                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                                            route().current('admin.services.*')
                                                ? 'bg-white/10 text-white border-l-4'
                                                : 'text-white/70 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                                        }`}
                                        style={route().current('admin.services.*') ? { borderLeftColor: accentColor } : {}}
                                    >
                                        Servicios
                                    </Link>
                                    <Link
                                        href={route('admin.payment-methods.index')}
                                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                                            route().current('admin.payment-methods.*')
                                                ? 'bg-white/10 text-white border-l-4'
                                                : 'text-white/70 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                                        }`}
                                        style={route().current('admin.payment-methods.*') ? { borderLeftColor: accentColor } : {}}
                                    >
                                        Métodos de Pago
                                    </Link>
                                    <Link
                                        href={route('admin.my-cuts.index')}
                                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                                            route().current('admin.my-cuts.*')
                                                ? 'bg-white/10 text-white border-l-4'
                                                : 'text-white/70 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                                        }`}
                                        style={route().current('admin.my-cuts.*') ? { borderLeftColor: accentColor } : {}}
                                    >
                                        Mi Rendimiento
                                    </Link>
                                    <Link
                                        href={route('admin.cash-register.index')}
                                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                                            route().current('admin.cash-register.*')
                                                ? 'bg-white/10 text-white border-l-4'
                                                : 'text-white/70 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                                        }`}
                                        style={route().current('admin.cash-register.*') ? { borderLeftColor: accentColor } : {}}
                                    >
                                        Caja
                                    </Link>
                                    <Link
                                        href={route('admin.settings.index')}
                                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                                            route().current('admin.settings.*')
                                                ? 'bg-white/10 text-white border-l-4'
                                                : 'text-white/70 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                                        }`}
                                        style={route().current('admin.settings.*') ? { borderLeftColor: accentColor } : {}}
                                    >
                                        Configuración
                                    </Link>
                                    <Link
                                        href={route('admin.customization.index')}
                                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                                            route().current('admin.customization.*')
                                                ? 'bg-white/10 text-white border-l-4'
                                                : 'text-white/70 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                                        }`}
                                        style={route().current('admin.customization.*') ? { borderLeftColor: accentColor } : {}}
                                    >
                                        Personalización
                                    </Link>
                                </>
                            )}
                            
                            {user.role === 'barber' && (
                                <>
                                    <Link
                                        href={route('barber.cuts.index')}
                                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                                            route().current('barber.cuts.*')
                                                ? 'bg-white/10 text-white border-l-4'
                                                : 'text-white/70 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                                        }`}
                                        style={route().current('barber.cuts.*') ? { borderLeftColor: accentColor } : {}}
                                    >
                                        Mis Cortes
                                    </Link>
                                    <Link
                                        href={route('barber.settings.index')}
                                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                                            route().current('barber.settings.*')
                                                ? 'bg-white/10 text-white border-l-4'
                                                : 'text-white/70 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                                        }`}
                                        style={route().current('barber.settings.*') ? { borderLeftColor: accentColor } : {}}
                                    >
                                        Configuración
                                    </Link>
                                    <Link
                                        href={route('barber.customization.index')}
                                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                                            route().current('barber.customization.*')
                                                ? 'bg-white/10 text-white border-l-4'
                                                : 'text-white/70 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                                        }`}
                                        style={route().current('barber.customization.*') ? { borderLeftColor: accentColor } : {}}
                                    >
                                        Personalización
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Footer con acciones de usuario */}
                    <div className="border-t border-white/10 px-3 py-4 space-y-1">
                        <Link
                            href={route('profile.edit')}
                            className="flex items-center px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                        >
                            <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                            Perfil
                        </Link>
                        {user.role === 'admin' && (
                            <Link
                                href={route('admin.barbershops.index')}
                                className="flex items-center px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                            >
                                <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"/>
                                </svg>
                                Cambiar de Barbería
                            </Link>
                        )}
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="w-full text-left flex items-center px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                        >
                            <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                            </svg>
                            Cerrar sesión
                        </Link>
                    </div>
                </div>
            </div>

            {header && (
                <header className="bg-black/50 backdrop-blur-md border-b border-white/10 relative z-40 mt-16">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className={header ? "" : "pt-16"}>{children}</main>
        </div>
    );
}
