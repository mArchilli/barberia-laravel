import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        id: 1,
        name: 'Corte Clásico',
        description: 'El corte tradicional perfeccionado con técnicas modernas.',
        price: '$25',
        duration: '30 min',
        icon: '✂'
    },
    {
        id: 2,
        name: 'Afeitado Premium',
        description: 'Afeitado con navaja tradicional y toallas calientes.',
        price: '$35',
        duration: '45 min',
        icon: '🪒'
    },
    {
        id: 3,
        name: 'Barba & Bigote',
        description: 'Diseño, perfilado y mantenimiento de barba.',
        price: '$20',
        duration: '25 min',
        icon: '💈'
    },
    {
        id: 4,
        name: 'Corte + Barba',
        description: 'Servicio completo para un look impecable.',
        price: '$40',
        duration: '60 min',
        icon: '⭐'
    },
    {
        id: 5,
        name: 'Tratamiento Capilar',
        description: 'Hidratación y cuidado profesional del cabello.',
        price: '$30',
        duration: '40 min',
        icon: '🧴'
    },
    {
        id: 6,
        name: 'Diseño Artístico',
        description: 'Diseños personalizados y líneas definidas.',
        price: '$15',
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
                            className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:bg-white/10 transition-all duration-500 cursor-pointer"
                        >
                            {/* Icono */}
                            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
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
                                
                                <button className="px-6 py-2 bg-white text-black font-semibold hover:bg-white/90 transition-all duration-300 group-hover:translate-x-1">
                                    Reservar
                                </button>
                            </div>

                            {/* Elemento decorativo */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 transform translate-x-10 -translate-y-10 rotate-45 group-hover:bg-white/10 transition-all duration-500" />
                        </div>
                    ))}
                </div>

                {/* CTA adicional */}
                <div className="text-center mt-16">
                    <button className="px-10 py-4 border-2 border-white text-white font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300">
                        Ver Todos los Servicios
                    </button>
                </div>
            </div>

            {/* Líneas decorativas */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30" />
        </section>
    );
}
