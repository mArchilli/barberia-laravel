import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        message: ''
    });

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

            // Animación del formulario
            gsap.from(formRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    end: 'top 40%',
                    scrub: 1
                },
                y: 50,
                opacity: 0
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar el formulario
        console.log('Form submitted:', formData);
        alert('¡Gracias! Te contactaremos pronto.');
    };

    const inputClasses = 'w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 rounded-xl focus:outline-none focus:border-white focus:ring-2 focus:ring-white/10 transition-all duration-300';

    return (
        <section
            ref={sectionRef}
            className="relative py-32 bg-black text-white overflow-hidden"
        >
            <div className="container mx-auto px-6">
                {/* Título */}
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-white/20 bg-white/5 text-xs font-semibold tracking-widest uppercase text-white/70">
                        Reservas
                    </span>
                    <h2
                        ref={titleRef}
                        className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
                    >
                        Reserva tu
                        <span className="block text-white/70">Cita</span>
                    </h2>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        Completa el formulario y nos pondremos en contacto contigo
                    </p>
                </div>

                {/* Formulario */}
                <div ref={formRef} className="max-w-4xl mx-auto">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-12 shadow-2xl"
                    >
                        {/* Grid para campos del formulario */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Nombre */}
                            <div className="group">
                                <label htmlFor="name" className="block text-sm font-semibold mb-2 text-white/80">
                                    Nombre Completo *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className={inputClasses}
                                    placeholder="Juan Pérez"
                                />
                            </div>

                            {/* Email */}
                            <div className="group">
                                <label htmlFor="email" className="block text-sm font-semibold mb-2 text-white/80">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className={inputClasses}
                                    placeholder="juan@ejemplo.com"
                                />
                            </div>

                            {/* Teléfono */}
                            <div className="group">
                                <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-white/80">
                                    Teléfono *
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className={inputClasses}
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>

                            {/* Servicio */}
                            <div className="group">
                                <label htmlFor="service" className="block text-sm font-semibold mb-2 text-white/80">
                                    Servicio *
                                </label>
                                <select
                                    id="service"
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    required
                                    className={inputClasses}
                                >
                                    <option value="" className="bg-black">Selecciona un servicio</option>
                                    <option value="corte-clasico" className="bg-black">Corte Clásico</option>
                                    <option value="afeitado-premium" className="bg-black">Afeitado Premium</option>
                                    <option value="barba-bigote" className="bg-black">Barba & Bigote</option>
                                    <option value="corte-barba" className="bg-black">Corte + Barba</option>
                                    <option value="tratamiento" className="bg-black">Tratamiento Capilar</option>
                                    <option value="diseno-artistico" className="bg-black">Diseño Artístico</option>
                                </select>
                            </div>

                            {/* Fecha preferida */}
                            <div className="group md:col-span-2">
                                <label htmlFor="date" className="block text-sm font-semibold mb-2 text-white/80">
                                    Fecha Preferida
                                </label>
                                <input
                                    type="datetime-local"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className={inputClasses}
                                />
                            </div>
                        </div>

                        {/* Mensaje */}
                        <div className="group">
                            <label htmlFor="message" className="block text-sm font-semibold mb-2 text-white/80">
                                Mensaje (Opcional)
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="5"
                                className={`${inputClasses} resize-none`}
                                placeholder="¿Alguna preferencia o comentario adicional?"
                            />
                        </div>

                        {/* Botón de envío */}
                        <div className="text-center pt-2">
                            <button
                                type="submit"
                                className="group relative px-12 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-lg shadow-white/10"
                            >
                                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                                    Enviar Reserva
                                </span>
                                <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                            </button>
                        </div>

                        {/* Nota */}
                        <p className="text-center text-white/50 text-sm">
                            * Campos requeridos. Nos pondremos en contacto contigo para confirmar tu cita.
                        </p>
                    </form>

                    {/* Redes sociales */}
                    <div className="mt-16 pt-16 border-t border-white/10">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold mb-4">Síguenos</h3>
                            <p className="text-white/60">Mantente al día con nuestras novedades y promociones</p>
                        </div>

                        <div className="flex justify-center gap-4">
                            {['📘', '📷', '🐦', '💼'].map((emoji, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="group w-14 h-14 rounded-2xl border-2 border-white/20 bg-white/5 flex items-center justify-center hover:bg-white hover:border-white hover:-translate-y-1 transition-all duration-300"
                                >
                                    <span className="text-xl group-hover:text-black transition-colors duration-300">{emoji}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Líneas decorativas */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30" />
        </section>
    );
}
