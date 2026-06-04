import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);

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

            // Animación del contenido
            gsap.from(contentRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    end: 'top 40%',
                    scrub: 1
                },
                x: -50,
                opacity: 0
            });

            // Animación de la imagen
            gsap.from(imageRef.current, {
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
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Contenido */}
                    <div>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-black/15 bg-black/5 text-xs font-semibold tracking-widest uppercase text-black/60">
                            Sobre nosotros
                        </span>

                        <h2
                            ref={titleRef}
                            className="text-5xl md:text-7xl font-bold mb-8 tracking-tight"
                        >
                            Tradición
                            <span className="block text-black/70">& Estilo</span>
                        </h2>

                        <div ref={contentRef} className="space-y-6">
                            <p className="text-lg md:text-xl text-black/80 leading-relaxed">
                                Desde hace más de una década, hemos perfeccionado el arte de la
                                barbería tradicional, combinándolo con las técnicas más modernas
                                para ofrecerte una experiencia única.
                            </p>

                            <p className="text-lg md:text-xl text-black/80 leading-relaxed">
                                Nuestro equipo de barberos profesionales está comprometido con la
                                excelencia, ofreciendo un servicio personalizado que realza tu
                                estilo y personalidad.
                            </p>

                            <div className="grid grid-cols-3 gap-4 pt-8">
                                <div className="rounded-2xl bg-black/5 border border-black/10 p-5 text-center">
                                    <div className="text-3xl md:text-4xl font-bold mb-2">10+</div>
                                    <div className="text-sm text-black/60">Años de experiencia</div>
                                </div>
                                <div className="rounded-2xl bg-black/5 border border-black/10 p-5 text-center">
                                    <div className="text-3xl md:text-4xl font-bold mb-2">5K+</div>
                                    <div className="text-sm text-black/60">Clientes satisfechos</div>
                                </div>
                                <div className="rounded-2xl bg-black/5 border border-black/10 p-5 text-center">
                                    <div className="text-3xl md:text-4xl font-bold mb-2">100%</div>
                                    <div className="text-sm text-black/60">Dedicación</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Imagen decorativa */}
                    <div ref={imageRef} className="relative">
                        <div className="relative aspect-[3/4] rounded-3xl bg-black overflow-hidden group shadow-2xl">
                            {/* Placeholder para imagen */}
                            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-800 to-black flex items-center justify-center">
                                <div className="text-white/20 text-6xl">✂</div>
                            </div>

                            {/* Overlay con efecto hover */}
                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500" />

                            {/* Marco decorativo */}
                            <div className="absolute inset-4 rounded-2xl border-2 border-white/30 pointer-events-none" />
                        </div>

                        {/* Elemento decorativo flotante */}
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-black rounded-full -z-0" />
                        <div className="absolute -top-6 -left-6 w-20 h-20 border-2 border-black/20 rounded-full -z-0" />
                    </div>
                </div>
            </div>

            {/* Línea decorativa */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black to-transparent" />
        </section>
    );
}
