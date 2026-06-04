import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        id: 1,
        name: 'Corte Clásico',
        description: 'El corte tradicional perfeccionado con técnicas modernas.',
        price: '$7.000',
        duration: '30 min',
        icon: '✂'
    },
    {
        id: 2,
        name: 'Afeitado Premium',
        description: 'Afeitado con navaja tradicional y toallas calientes.',
        price: '$9.000',
        duration: '45 min',
        icon: '🪒'
    },
    {
        id: 3,
        name: 'Barba & Bigote',
        description: 'Diseño, perfilado y mantenimiento de barba.',
        price: '$5.000',
        duration: '25 min',
        icon: '💈'
    },
    {
        id: 4,
        name: 'Corte + Barba',
        description: 'Servicio completo para un look impecable.',
        price: '$11.000',
        duration: '60 min',
        icon: '⭐'
    },
    {
        id: 5,
        name: 'Tratamiento Capilar',
        description: 'Hidratación y cuidado profesional del cabello.',
        price: '$8.000',
        duration: '40 min',
        icon: '🧴'
    },
    {
        id: 6,
        name: 'Diseño Artístico',
        description: 'Diseños personalizados y líneas definidas.',
        price: '$6.000',
        duration: '20 min',
        icon: '🎨'
    }
];

export default function Services() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);

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
                y: 100,
                opacity: 0
            });

            // Animación de las tarjetas
            cardsRef.current.forEach((card, index) => {
                if (card) {
                    gsap.from(card, {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 90%',
                            end: 'top 60%',
                            scrub: 1
                        },
                        y: 100,
                        opacity: 0,
                        delay: index * 0.1
                    });

                    // Efecto hover con GSAP
                    card.addEventListener('mouseenter', () => {
                        gsap.to(card, {
                            scale: 1.05,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    });

                    card.addEventListener('mouseleave', () => {
                        gsap.to(card, {
                            scale: 1,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-32 bg-black text-white overflow-hidden"
        >
            <div className="container mx-auto px-6">
                {/* Título */}
                <div className="text-center mb-20">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-white/20 bg-white/5 text-xs font-semibold tracking-widest uppercase text-white/70">
                        Lo que hacemos
                    </span>
                    <h2
                        ref={titleRef}
                        className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
                    >
                        Nuestros
                        <span className="block text-white/70">Servicios</span>
                    </h2>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        Servicios profesionales diseñados para realzar tu estilo
                    </p>
                </div>

                {/* Grid de servicios */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            ref={(el) => (cardsRef.current[index] = el)}
                            className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden"
                        >
                            {/* Icono */}
                            <div className="w-16 h-16 mb-6 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-4xl group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                                {service.icon}
                            </div>

                            {/* Contenido */}
                            <h3 className="text-2xl font-bold mb-3">
                                {service.name}
                            </h3>

                            <p className="text-white/70 mb-6 leading-relaxed">
                                {service.description}
                            </p>

                            {/* Detalles */}
                            <div className="flex justify-between items-center pt-6 border-t border-white/10">
                                <div>
                                    <div className="text-3xl font-bold">{service.price}</div>
                                    <div className="text-sm text-white/50">{service.duration}</div>
                                </div>

                                <a
                                    href="#contact"
                                    className="px-6 py-2.5 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all duration-300 group-hover:translate-x-1"
                                >
                                    Reservar
                                </a>
                            </div>

                            {/* Elemento decorativo */}
                            <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/5 rounded-full group-hover:bg-white/10 transition-all duration-500" />
                        </div>
                    ))}
                </div>

                {/* CTA adicional */}
                <div className="text-center mt-16">
                    <a
                        href="#contact"
                        className="inline-block px-10 py-4 border-2 border-white/80 text-white font-semibold text-lg rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                    >
                        Ver Todos los Servicios
                    </a>
                </div>
            </div>

            {/* Líneas decorativas */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30" />
        </section>
    );
}
