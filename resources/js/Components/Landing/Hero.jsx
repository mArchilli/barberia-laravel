import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const heroRef = useRef(null);
    const badgeRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animación de entrada del badge
            gsap.from(badgeRef.current, {
                duration: 1,
                y: 30,
                opacity: 0,
                ease: 'power3.out',
                delay: 0.1
            });

            // Animación de entrada del título
            gsap.from(titleRef.current, {
                duration: 1.2,
                y: 100,
                opacity: 0,
                ease: 'power4.out',
                delay: 0.3
            });

            // Animación de entrada del subtítulo
            gsap.from(subtitleRef.current, {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: 'power3.out',
                delay: 0.6
            });

            // Animación de entrada del CTA
            gsap.from(ctaRef.current, {
                duration: 0.8,
                y: 30,
                opacity: 0,
                ease: 'power2.out',
                delay: 0.9
            });

            // Efecto parallax en scroll
            gsap.to(heroRef.current, {
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                },
                y: 200,
                opacity: 0.3
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white"
        >
            {/* Overlay oscuro para mejorar legibilidad */}
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* Resplandor decorativo redondeado */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] max-w-[90vw] max-h-[90vw] bg-white/5 rounded-full blur-3xl z-0" />

            {/* Contenido */}
            <div className="relative z-20 container mx-auto px-6 text-center">
                {/* Eyebrow / Badge */}
                <div
                    ref={badgeRef}
                    className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-sm font-medium tracking-widest uppercase text-white/80"
                >
                    <span>💈</span>
                    Barbería Premium · Desde 2014
                </div>

                <h1
                    ref={titleRef}
                    className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight"
                >
                    BARBER
                    <span className="block text-white/80">SHOP</span>
                </h1>

                <p
                    ref={subtitleRef}
                    className="text-xl md:text-2xl lg:text-3xl mb-12 text-white/90 font-light tracking-wide max-w-3xl mx-auto"
                >
                    Estilo, precisión y elegancia en cada corte
                </p>

                <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                        href="#contact"
                        className="group relative px-8 py-4 bg-white text-black font-semibold text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-lg shadow-white/10"
                    >
                        <span className="relative z-10 group-hover:text-white transition-colors duration-300">Reservar Cita</span>
                        <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                    </a>

                    <a
                        href="#services"
                        className="px-8 py-4 border-2 border-white/80 text-white font-semibold text-lg rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                    >
                        Ver Servicios
                    </a>
                </div>

                {/* Indicador de scroll */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/60 rounded-full flex items-start justify-center p-2">
                        <div className="w-1 h-3 bg-white rounded-full animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Líneas decorativas */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
        </section>
    );
}
