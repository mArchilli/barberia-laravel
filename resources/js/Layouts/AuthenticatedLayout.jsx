import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const barbershop = usePage().props.barbershop;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-black">
            <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md relative z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex items-center gap-3">
                            {/* Logo y nombre de barbería en móvil */}
                            <div className="flex shrink-0 items-center gap-3 sm:hidden">
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

                            {/* Logo desktop */}
                            <div className="hidden sm:flex shrink-0 items-center">
                                <Link href="/" className="text-2xl font-bold text-white tracking-wider">
                                    BARBER<span className="text-white/70">SHOP</span>
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    className="text-white/80 hover:text-white"
                                >
                                    Dashboard
                                </NavLink>
                                
                                {user.role === 'admin' && (
                                    <>
                                        <NavLink
                                            href={route('admin.barbers.index')}
                                            active={route().current('admin.barbers.*')}
                                            className="text-white/80 hover:text-white"
                                        >
                                            Barberos
                                        </NavLink>
                                        <NavLink
                                            href={route('admin.services.index')}
                                            active={route().current('admin.services.*')}
                                            className="text-white/80 hover:text-white"
                                        >
                                            Servicios
                                        </NavLink>
                                        <NavLink
                                            href={route('admin.settings.index')}
                                            active={route().current('admin.settings.*')}
                                            className="text-white/80 hover:text-white"
                                        >
                                            Configuración
                                        </NavLink>
                                    </>
                                )}
                                
                                {user.role === 'barber' && (
                                    <>
                                        <NavLink
                                            href={route('barber.cuts.index')}
                                            active={route().current('barber.cuts.*')}
                                            className="text-white/80 hover:text-white"
                                        >
                                            Mis Cortes
                                        </NavLink>
                                        <NavLink
                                            href={route('barber.settings.index')}
                                            active={route().current('barber.settings.*')}
                                            className="text-white/80 hover:text-white"
                                        >
                                            Configuración
                                        </NavLink>
                                        <NavLink
                                            href={route('barber.settings.index')}
                                            className="text-white/80 hover:text-white"
                                        >
                                            Personalización
                                        </NavLink>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium leading-4 text-white transition duration-150 ease-in-out hover:bg-white/10 focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-white/60 transition duration-150 ease-in-out hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Overlay cuando el menú está abierto */}
            {showingNavigationDropdown && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm sm:hidden z-[60]"
                    onClick={() => setShowingNavigationDropdown(false)}
                />
            )}

            {/* Menu hamburguesa móvil - slide desde derecha ocupando mitad de pantalla */}
            <div 
                className={`
                    fixed top-0 bottom-0 right-0 w-1/2 transform transition-transform duration-300 ease-in-out
                    ${showingNavigationDropdown ? 'translate-x-0' : 'translate-x-full'}
                    sm:hidden bg-black border-l border-white/10 z-[70]
                `}
            >
                <div className="flex flex-col h-full overflow-y-auto py-4">
                    <div className="space-y-1 px-2 flex-1">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                            className="text-white/80 hover:text-white"
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        
                        {user.role === 'admin' && (
                            <>
                                <ResponsiveNavLink
                                    href={route('admin.barbers.index')}
                                    active={route().current('admin.barbers.*')}
                                    className="text-white/80 hover:text-white"
                                >
                                    Barberos
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('admin.services.index')}
                                    active={route().current('admin.services.*')}
                                    className="text-white/80 hover:text-white"
                                >
                                    Servicios
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('admin.settings.index')}
                                    active={route().current('admin.settings.*')}
                                    className="text-white/80 hover:text-white"
                                >
                                    Configuración
                                </ResponsiveNavLink>
                            </>
                        )}
                        
                        {user.role === 'barber' && (
                            <>
                                <ResponsiveNavLink
                                    href={route('barber.cuts.index')}
                                    active={route().current('barber.cuts.*')}
                                    className="text-white/80 hover:text-white"
                                >
                                    Mis Cortes
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('barber.settings.index')}
                                    active={route().current('barber.settings.*')}
                                    className="text-white/80 hover:text-white"
                                >
                                    Configuración
                                </ResponsiveNavLink>
                                
                                {/* Sección Personalización */}
                                <div className="border-t border-white/10 pt-2 mt-2">
                                    <div className="px-3 py-2 text-xs font-semibold text-white/40 uppercase tracking-wider">
                                        Personalización
                                    </div>
                                    <ResponsiveNavLink
                                        href={route('barber.settings.index')}
                                        className="text-white/80 hover:text-white"
                                    >
                                        Mi Perfil
                                    </ResponsiveNavLink>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Cambiar de barbería - solo admin */}
                    {user.role === 'admin' && barbershop && (
                        <div className="border-t border-white/10 py-3 px-2">
                            <div className="mb-2">
                                <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 px-3">
                                    Barbería Actual
                                </div>
                                <div className="flex items-center gap-2 mb-3 px-3">
                                    {barbershop.logo ? (
                                        <img 
                                            src={barbershop.logo.startsWith('http') ? barbershop.logo : `/storage/${barbershop.logo}`}
                                            alt={barbershop.name}
                                            className="h-8 w-8 rounded-full object-cover border border-white/20"
                                        />
                                    ) : (
                                        <div className="h-8 w-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                                            <span className="text-white text-sm">💈</span>
                                        </div>
                                    )}
                                    <span className="text-sm font-medium text-white">
                                        {barbershop.name}
                                    </span>
                                </div>
                            </div>
                            <ResponsiveNavLink
                                href={route('admin.barbershops.index')}
                                className="text-white/80 hover:text-white"
                            >
                                Cambiar de Barbería
                            </ResponsiveNavLink>
                        </div>
                    )}

                    <div className="border-t border-white/10 pb-4 pt-4 px-2 mt-auto">
                        <div className="px-3 mb-3">
                            <div className="text-base font-medium text-white">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-white/60">
                                {user.email}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')} className="text-white/80 hover:text-white">
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="text-white/80 hover:text-white"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </div>

            {header && (
                <header className="bg-black/50 backdrop-blur-md border-b border-white/10 relative z-40">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
