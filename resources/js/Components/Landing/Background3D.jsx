import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Background3D() {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Crear partículas
        const particleCount = 100;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 3 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: white;
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                opacity: ${Math.random() * 0.5 + 0.2};
            `;
            
            container.appendChild(particle);
            particles.push(particle);

            // Animación con GSAP
            gsap.to(particle, {
                y: `+=${Math.random() * 100 - 50}`,
                x: `+=${Math.random() * 100 - 50}`,
                opacity: Math.random() * 0.8,
                duration: duration,
                delay: delay,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }

        // Crear formas geométricas flotantes
        const shapes = [
            { type: 'square', size: 80, x: 10, y: 20 },
            { type: 'square', size: 60, x: 85, y: 70 },
            { type: 'circle', size: 100, x: 50, y: 50 },
        ];

        shapes.forEach((shapeData, index) => {
            const shape = document.createElement('div');
            shape.className = 'floating-shape';
            
            const isCircle = shapeData.type === 'circle';
            shape.style.cssText = `
                position: absolute;
                width: ${shapeData.size}px;
                height: ${shapeData.size}px;
                border: 2px solid rgba(255, 255, 255, 0.1);
                ${isCircle ? 'border-radius: 50%;' : ''}
                left: ${shapeData.x}%;
                top: ${shapeData.y}%;
                transform: translate(-50%, -50%);
            `;
            
            container.appendChild(shape);

            // Animación de rotación y movimiento
            gsap.to(shape, {
                rotation: 360,
                duration: 20 + index * 5,
                repeat: -1,
                ease: 'none'
            });

            gsap.to(shape, {
                y: '+=50',
                x: '+=30',
                duration: 15 + index * 3,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });

            gsap.to(shape, {
                scale: 1.2,
                opacity: 0.05,
                duration: 8 + index * 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        });

        // Cleanup
        return () => {
            particles.forEach(p => p.remove());
            container.querySelectorAll('.floating-shape').forEach(s => s.remove());
        };
    }, []);

    return (
        <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
            <div ref={containerRef} className="absolute inset-0" />
            
            {/* Gradientes overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
            
            {/* Líneas decorativas animadas */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse" />
        </div>
    );
}
