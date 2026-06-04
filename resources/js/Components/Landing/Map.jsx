import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
    {
        icon: '📍',
        title: 'Dirección',
        lines: ['Calle Principal 123', 'Centro, Ciudad', 'CP 12345']
    },
    {
        icon: '🕐',
        title: 'Horario',
        lines: ['Lunes - Viernes: 9:00 AM - 8:00 PM', 'Sábado: 9:00 AM - 6:00 PM', 'Domingo: 10:00 AM - 4:00 PM']
    },
    {
        icon: '📞',
        title: 'Teléfono',
        lines: ['+1 (555) 123-4567']
    },
    {
        icon: '✉️',
        title: 'Email',
        lines: ['info@barbershop.com']
    }
];

export default function Map() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const mapRef = useRef(null);
    const infoRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animación del título
            gsap.from(titleRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    end: 'top 50%',
                    scrub: 1
                },
                x: -100,
                opacity: 0
            });

            // Animación del mapa
            gsap.from(mapRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    end: 'top 40%',
                    scrub: 1
                },
                scale: 0.8,
                opacity: 0
            });

            // Animación de la info
            gsap.from(infoRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    end: 'top 40%',
                    scrub: 1
                },
                x: 100,
                opacity: 0
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-32 bg-white text-black overflow-hidden"
        >
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Información */}
                    <div ref={infoRef} className="order-2 lg:order-1">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-black/15 bg-black/5 text-xs font-semibold tracking-widest uppercase text-black/60">
                            Ubicación
                        </span>

                        <h2
                            ref={titleRef}
                            className="text-5xl md:text-7xl font-bold mb-10 tracking-tight"
                        >
                            Encuéntranos
                        </h2>

                        <div className="space-y-4">
                            {contactInfo.map((item) => (
                                <div
                                    key={item.title}
                                    className="flex items-start gap-4 rounded-2xl border border-black/10 bg-black/[0.03] p-5 hover:bg-black/[0.06] transition-colors duration-300"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center text-2xl">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                                        <div className="text-black/70 space-y-0.5">
                                            {item.lines.map((line, i) => (
                                                <p key={i}>{line}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Botón de dirección */}
                            <button className="mt-4 px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-black/80 transition-all duration-300">
                                Cómo Llegar
                            </button>
                        </div>
                    </div>

                    {/* Mapa */}
                    <div ref={mapRef} className="order-1 lg:order-2 relative">
                        <div className="relative aspect-square rounded-3xl bg-black/5 border-2 border-black/10 overflow-hidden shadow-xl">
                            {/* Placeholder del mapa - Aquí puedes integrar Google Maps o similar */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-6xl mb-4">🗺️</div>
                                    <p className="text-black/60 text-lg">
                                        Integra aquí tu mapa interactivo
                                    </p>
                                    <p className="text-black/40 text-sm mt-2">
                                        Google Maps / Mapbox
                                    </p>
                                </div>
                            </div>

                            {/* Pin decorativo */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                                <div className="text-5xl animate-bounce">📍</div>
                            </div>

                            {/* Marco decorativo */}
                            <div className="absolute inset-4 rounded-2xl border-2 border-black/10 pointer-events-none" />
                        </div>

                        {/* Elementos decorativos */}
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-black rounded-full -z-10" />
                        <div className="absolute -top-6 -left-6 w-16 h-16 border-2 border-black/20 rounded-full -z-10" />
                    </div>
                </div>
            </div>

            {/* Línea decorativa */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black to-transparent opacity-30" />
        </section>
    );
}
