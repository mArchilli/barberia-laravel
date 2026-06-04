import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Background3D from '@/Components/Landing/Background3D';
import Hero from '@/Components/Landing/Hero';
import About from '@/Components/Landing/About';
import Services from '@/Components/Landing/Services';
import Map from '@/Components/Landing/Map';
import Contact from '@/Components/Landing/Contact';

export default function LandingPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        // Smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';
        
        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <>
            <Head title="Barbería - Estilo, Precisión y Elegancia" />
            
            {/* Background animado 3D */}
            <Background3D />

            {/* Barra de navegación */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <div className="text-2xl font-bold text-white tracking-wider">
                            BARBER<span className="text-white/70">SHOP</span>
                        </div>

                        {/* Menú de navegación - Desktop */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#hero" className="text-white/80 hover:text-white transition-colors duration-300">
                                Inicio
                            </a>
                            <a href="#about" className="text-white/80 hover:text-white transition-colors duration-300">
                                Nosotros
                            </a>
                            <a href="#services" className="text-white/80 hover:text-white transition-colors duration-300">
                                Servicios
                            </a>
                            <a href="#location" className="text-white/80 hover:text-white transition-colors duration-300">
                                Ubicación
                            </a>
                            <a href="#contact" className="text-white/80 hover:text-white transition-colors duration-300">
                                Contacto
                            </a>
                        </div>

                        {/* Botones de acción - Desktop */}
                        <div className="hidden md:flex items-center space-x-4">
                            <Link
                                href="/login"
                                className="px-6 py-2 border border-white/80 text-white font-semibold rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                            >
                                Ingresar
                            </Link>
                            <a href="#contact" className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all duration-300">
                                Reservar
                            </a>
                        </div>

                        {/* Menú hamburguesa - Mobile */}
                        <button 
                            onClick={toggleMobileMenu}
                            className="md:hidden text-white z-50"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Menú móvil desplegable */}
                <div 
                    className={`md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/10 rounded-b-3xl transition-all duration-300 ${
                        mobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
                    }`}
                >
                    <div className="container mx-auto px-6 py-6 flex flex-col space-y-4">
                        <a 
                            href="#hero" 
                            onClick={closeMobileMenu}
                            className="text-white/80 hover:text-white transition-colors duration-300 text-lg py-2 border-b border-white/10"
                        >
                            Inicio
                        </a>
                        <a 
                            href="#about" 
                            onClick={closeMobileMenu}
                            className="text-white/80 hover:text-white transition-colors duration-300 text-lg py-2 border-b border-white/10"
                        >
                            Nosotros
                        </a>
                        <a 
                            href="#services" 
                            onClick={closeMobileMenu}
                            className="text-white/80 hover:text-white transition-colors duration-300 text-lg py-2 border-b border-white/10"
                        >
                            Servicios
                        </a>
                        <a 
                            href="#location" 
                            onClick={closeMobileMenu}
                            className="text-white/80 hover:text-white transition-colors duration-300 text-lg py-2 border-b border-white/10"
                        >
                            Ubicación
                        </a>
                        <a 
                            href="#contact" 
                            onClick={closeMobileMenu}
                            className="text-white/80 hover:text-white transition-colors duration-300 text-lg py-2 border-b border-white/10"
                        >
                            Contacto
                        </a>
                        
                        {/* Botones de acción - Mobile */}
                        <div className="pt-4 space-y-3">
                            <Link
                                href="/login"
                                className="block w-full px-6 py-3 border border-white/80 text-white text-center font-semibold rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                            >
                                Ingresar
                            </Link>
                            <a
                                href="#contact"
                                onClick={closeMobileMenu}
                                className="block w-full px-6 py-3 bg-white text-black text-center font-semibold rounded-full hover:bg-white/90 transition-all duration-300"
                            >
                                Reservar
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Secciones de la landing page */}
            <main className="relative">
                <section id="hero">
                    <Hero />
                </section>

                <section id="about">
                    <About />
                </section>

                <section id="services">
                    <Services />
                </section>

                <section id="location">
                    <Map />
                </section>

                <section id="contact">
                    <Contact />
                </section>
            </main>

            {/* Footer */}
            <footer className="relative bg-black text-white py-12 border-t border-white/10">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        {/* Sobre nosotros */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">BARBERSHOP</h3>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Tradición, estilo y precisión en cada corte. 
                                Más de 10 años brindando la mejor experiencia en barbería.
                            </p>
                        </div>

                        {/* Enlaces rápidos */}
                        <div>
                            <h4 className="font-bold mb-4">Enlaces Rápidos</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a href="#hero" className="text-white/60 hover:text-white transition-colors">
                                        Inicio
                                    </a>
                                </li>
                                <li>
                                    <a href="#about" className="text-white/60 hover:text-white transition-colors">
                                        Nosotros
                                    </a>
                                </li>
                                <li>
                                    <a href="#services" className="text-white/60 hover:text-white transition-colors">
                                        Servicios
                                    </a>
                                </li>
                                <li>
                                    <a href="#contact" className="text-white/60 hover:text-white transition-colors">
                                        Contacto
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Servicios */}
                        <div>
                            <h4 className="font-bold mb-4">Servicios</h4>
                            <ul className="space-y-2 text-sm text-white/60">
                                <li>Corte Clásico</li>
                                <li>Afeitado Premium</li>
                                <li>Barba & Bigote</li>
                                <li>Tratamiento Capilar</li>
                            </ul>
                        </div>

                        {/* Contacto */}
                        <div>
                            <h4 className="font-bold mb-4">Contacto</h4>
                            <ul className="space-y-2 text-sm text-white/60">
                                <li>📍 Calle Principal 123</li>
                                <li>📞 +1 (555) 123-4567</li>
                                <li>✉️ info@barbershop.com</li>
                                <li>🕐 Lun - Vie: 9AM - 8PM</li>
                            </ul>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="pt-8 border-t border-white/10 text-center text-sm text-white/50">
                        <p>
                            &copy; {new Date().getFullYear()} Barbershop. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
