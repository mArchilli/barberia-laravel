import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
                        <h2 
                            ref={titleRef}
                            className="text-5xl md:text-7xl font-bold mb-8 tracking-tight"
                        >
                            Encuéntranos
                        </h2>

                        <div className="space-y-8">
                            {/* Dirección */}
                            <div className="flex items-start space-x-4">
                                <div className="text-3xl mt-1">📍</div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Dirección</h3>
                                    <p className="text-black/70 text-lg">
                                        Calle Principal 123<br />
                                        Centro, Ciudad<br />
                                        CP 12345
                                    </p>
                                </div>
                            </div>

                            {/* Horario */}
                            <div className="flex items-start space-x-4">
                                <div className="text-3xl mt-1">🕐</div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Horario</h3>
                                    <div className="text-black/70 text-lg space-y-1">
                                        <p>Lunes - Viernes: 9:00 AM - 8:00 PM</p>
                                        <p>Sábado: 9:00 AM - 6:00 PM</p>
                                        <p>Domingo: 10:00 AM - 4:00 PM</p>
                                    </div>
                                </div>
                            </div>

                            {/* Teléfono */}
                            <div className="flex items-start space-x-4">
                                <div className="text-3xl mt-1">📞</div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Teléfono</h3>
                                    <p className="text-black/70 text-lg">
                                        +1 (555) 123-4567
                                    </p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start space-x-4">
                                <div className="text-3xl mt-1">✉️</div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Email</h3>
                                    <p className="text-black/70 text-lg">
                                        info@barbershop.com
                                    </p>
                                </div>
                            </div>

                            {/* Botón de dirección */}
                            <button className="mt-8 px-8 py-4 bg-black text-white font-semibold hover:bg-black/80 transition-all duration-300">
                                Cómo Llegar
                            </button>
                        </div>
                    </div>

                    {/* Mapa */}
                    <div ref={mapRef} className="order-1 lg:order-2">
                        <div className="relative aspect-square bg-black/5 border-2 border-black/10 overflow-hidden">
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
                            <div className="absolute inset-4 border-2 border-black/10 pointer-events-none" />
                        </div>

                        {/* Elementos decorativos */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-black transform rotate-45 -z-10" />
                    </div>
                </div>
            </div>

            {/* Línea decorativa */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black to-transparent opacity-30" />
        </section>
    );
}
