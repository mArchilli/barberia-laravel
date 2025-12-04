import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function CustomizationIndex({ auth, barbershop, accentColor }) {
    const { data, setData, post, processing, errors } = useForm({
        accent_color: accentColor || '#ffffff',
    });

    const [previewColor, setPreviewColor] = useState(accentColor || '#ffffff');

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.customization.update'));
    };

    const handleColorChange = (e) => {
        const color = e.target.value;
        setPreviewColor(color);
        setData('accent_color', color);
    };

    // Colores predefinidos
    const presetColors = [
        '#ffffff', // Blanco (default)
        '#3b82f6', // Azul
        '#ef4444', // Rojo
        '#10b981', // Verde
        '#f59e0b', // Amarillo/Naranja
        '#8b5cf6', // Púrpura
        '#ec4899', // Rosa
        '#06b6d4', // Cyan
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Personalización" />

            <div className="min-h-screen bg-black pt-2 pb-12">
                <div className="mx-auto max-w-4xl px-6">
                    <h1 className="text-3xl font-bold text-white mb-2 mt-4">Personalización</h1>
                    <p className="text-white/60 mb-8">Personaliza los colores de acento de tu barbería</p>

                    <form onSubmit={handleSubmit}>
                        {/* Card principal */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 mb-6">
                            {/* Preview en vivo */}
                            <div className="mb-8 p-6 rounded-xl border border-white/10 bg-black/50 overflow-hidden">
                                <p className="text-white/60 text-sm mb-4">Vista previa</p>
                                <div className="flex items-center justify-center gap-8">
                                    {/* Ejemplo SVG */}
                                    <div className="flex-shrink-0 text-center">
                                        <p className="text-white/40 text-xs mb-2">Iconos</p>
                                        <svg 
                                            className="w-12 h-12" 
                                            fill="none" 
                                            stroke={previewColor} 
                                            viewBox="0 0 24 24"
                                            style={{ color: previewColor }}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                                        </svg>
                                    </div>

                                    {/* Ejemplo botón */}
                                    <div className="flex-shrink-0 text-center">
                                        <p className="text-white/40 text-xs mb-2">Botones</p>
                                        <button 
                                            type="button"
                                            className="px-4 py-2 rounded-lg font-semibold transition-all"
                                            style={{ 
                                                backgroundColor: previewColor,
                                                color: '#000'
                                            }}
                                        >
                                            Ejemplo
                                        </button>
                                    </div>

                                    {/* Ejemplo acento */}
                                    <div className="flex-shrink-0 text-center">
                                        <p className="text-white/40 text-xs mb-2">Detalles</p>
                                        <div 
                                            className="w-8 h-8 rounded-full border-2 mx-auto"
                                            style={{ borderColor: previewColor }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Selector de color */}
                            <div className="mb-6">
                                <label className="block text-white font-medium mb-3">
                                    Selecciona un color
                                </label>
                                
                                {/* Colores predefinidos */}
                                <div className="grid grid-cols-8 gap-3 mb-4">
                                    {presetColors.map((color) => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => {
                                                setPreviewColor(color);
                                                setData('accent_color', color);
                                            }}
                                            className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 ${
                                                data.accent_color === color 
                                                    ? 'border-white shadow-lg shadow-white/50' 
                                                    : 'border-white/20'
                                            }`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>

                                {/* Selector de color personalizado */}
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <label className="block text-white/60 text-sm mb-2">
                                            O elige un color personalizado
                                        </label>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="color"
                                                value={data.accent_color}
                                                onChange={handleColorChange}
                                                className="w-16 h-16 rounded-lg border border-white/20 bg-transparent cursor-pointer"
                                            />
                                            <input
                                                type="text"
                                                value={data.accent_color}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                                                        setPreviewColor(value);
                                                        setData('accent_color', value);
                                                    }
                                                }}
                                                placeholder="#ffffff"
                                                className="flex-1 px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/40 focus:border-white/40 focus:ring-0"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {errors.accent_color && (
                                    <p className="text-red-400 text-sm mt-2">{errors.accent_color}</p>
                                )}
                            </div>

                            {/* Botón guardar */}
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPreviewColor(accentColor);
                                        setData('accent_color', accentColor);
                                    }}
                                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors border border-white/10"
                                >
                                    Resetear
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all border-2 disabled:opacity-50"
                                    style={{
                                        backgroundColor: previewColor,
                                        borderColor: previewColor,
                                        color: '#000'
                                    }}
                                >
                                    {processing ? 'Guardando...' : 'Guardar cambios'}
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Información adicional */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                        <h3 className="text-lg font-bold text-white mb-3">¿Dónde se aplican estos colores?</h3>
                        <ul className="space-y-2 text-white/60">
                            <li className="flex items-start gap-2">
                                <span className="text-white/40">•</span>
                                <span>Iconos y elementos SVG en el dashboard</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-white/40">•</span>
                                <span>Botones de acción principales</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-white/40">•</span>
                                <span>Detalles y acentos visuales</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-white/40">•</span>
                                <span>Enlaces y elementos interactivos destacados</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
