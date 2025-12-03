import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Stepper from '@/Components/Stepper';

export default function CreateFirst() {
    const [currentStep, setCurrentStep] = useState(1);
    const [logoPreview, setLogoPreview] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        address: '',
        phone: '',
        logo: null,
        schedules: {}, // { monday: [{start: '09:00', end: '13:00'}], tuesday: [...] }
    });

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('logo', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const nextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.barbershops.store-first'));
    };

    // Días de la semana en español
    const daysOfWeek = [
        { key: 'monday', label: 'Lunes' },
        { key: 'tuesday', label: 'Martes' },
        { key: 'wednesday', label: 'Miércoles' },
        { key: 'thursday', label: 'Jueves' },
        { key: 'friday', label: 'Viernes' },
        { key: 'saturday', label: 'Sábado' },
        { key: 'sunday', label: 'Domingo' },
    ];

    const addTimeSlot = (day) => {
        const currentSchedules = data.schedules[day] || [];
        setData('schedules', {
            ...data.schedules,
            [day]: [...currentSchedules, { start: '09:00', end: '13:00' }]
        });
    };

    const removeTimeSlot = (day, index) => {
        const currentSchedules = data.schedules[day] || [];
        setData('schedules', {
            ...data.schedules,
            [day]: currentSchedules.filter((_, i) => i !== index)
        });
    };

    const updateTimeSlot = (day, index, field, value) => {
        const currentSchedules = data.schedules[day] || [];
        const updated = [...currentSchedules];
        updated[index][field] = value;
        setData('schedules', {
            ...data.schedules,
            [day]: updated
        });
    };

    const isDayActive = (day) => {
        return data.schedules[day] && data.schedules[day].length > 0;
    };

    return (
        <>
            <Head title="Crear tu Barbería" />

            <div className="min-h-screen bg-black flex items-center justify-center py-12 px-6">
                <div className="max-w-4xl w-full">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-5xl font-bold text-white mb-4">
                            ¡Bienvenido! 💈
                        </h1>
                        <p className="text-xl text-white/70">
                            Comencemos creando tu primera barbería
                        </p>
                    </div>

                    {/* Stepper */}
                    <Stepper 
                        currentStep={currentStep} 
                        totalSteps={3}
                        steps={['Información Básica', 'Contacto', 'Horarios']}
                    />

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="border border-white/10 bg-white/5 backdrop-blur-sm p-8">
                        
                        {/* PASO 1: Información Básica */}
                        {currentStep === 1 && (
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-6">Información Básica</h2>
                                
                                {/* Logo */}
                                <div className="mb-8 text-center">
                                    <label className="block text-white font-semibold mb-4">
                                        Logo de la Barbería (Opcional)
                                    </label>
                                    
                                    <div className="flex justify-center mb-4">
                                        {logoPreview ? (
                                            <img 
                                                src={logoPreview} 
                                                alt="Preview" 
                                                className="w-32 h-32 object-cover border-2 border-white/20"
                                            />
                                        ) : (
                                            <div className="w-32 h-32 border-2 border-white/20 border-dashed flex items-center justify-center text-white/40">
                                                Sin logo
                                            </div>
                                        )}
                                    </div>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLogoChange}
                                        className="hidden"
                                        id="logo-upload"
                                    />
                                    <label
                                        htmlFor="logo-upload"
                                        className="inline-block px-6 py-2 bg-white/10 text-white border border-white/20 cursor-pointer hover:bg-white/20 transition"
                                    >
                                        Seleccionar Logo
                                    </label>
                                    {errors.logo && (
                                        <p className="text-red-400 text-sm mt-2">{errors.logo}</p>
                                    )}
                                </div>

                                {/* Nombre */}
                                <div className="mb-6">
                                    <label className="block text-white font-semibold mb-2">
                                        Nombre de la Barbería *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition"
                                        placeholder="Ej: Barbería Premium"
                                    />
                                    {errors.name && (
                                        <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* PASO 2: Contacto */}
                        {currentStep === 2 && (
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-6">Información de Contacto</h2>
                                
                                {/* Dirección */}
                                <div className="mb-6">
                                    <label className="block text-white font-semibold mb-2">
                                        Dirección *
                                    </label>
                                    <textarea
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition resize-none"
                                        placeholder="Ej: Calle Principal 123, Entre Av. A y Av. B"
                                        rows="3"
                                    />
                                    {errors.address && (
                                        <p className="text-red-400 text-sm mt-1">{errors.address}</p>
                                    )}
                                </div>

                                {/* Teléfono */}
                                <div className="mb-6">
                                    <label className="block text-white font-semibold mb-2">
                                        Teléfono *
                                    </label>
                                    <input
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition"
                                        placeholder="Ej: +1 (555) 123-4567"
                                    />
                                    {errors.phone && (
                                        <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* PASO 3: Horarios */}
                        {currentStep === 3 && (
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-6">Horarios de Atención</h2>
                                <p className="text-white/70 mb-6">
                                    Selecciona los días de trabajo y agrega los intervalos de horarios. 
                                    Puedes agregar múltiples intervalos para horarios con descansos.
                                </p>

                                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                                    {daysOfWeek.map(({ key, label }) => (
                                        <div key={key} className="border border-white/10 bg-white/5 p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <label className="text-white font-semibold flex-1">
                                                    {label}
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => addTimeSlot(key)}
                                                    className="px-4 py-1 bg-white/10 text-white text-sm border border-white/20 hover:bg-white/20 transition"
                                                >
                                                    + Agregar Horario
                                                </button>
                                            </div>

                                            {/* Intervalos de tiempo */}
                                            {data.schedules[key]?.map((slot, index) => (
                                                <div key={index} className="flex items-center gap-3 mb-2">
                                                    <input
                                                        type="time"
                                                        value={slot.start}
                                                        onChange={(e) => updateTimeSlot(key, index, 'start', e.target.value)}
                                                        className="flex-1 px-3 py-2 bg-white/5 border border-white/20 text-white text-sm focus:outline-none focus:border-white transition"
                                                    />
                                                    <span className="text-white/50">hasta</span>
                                                    <input
                                                        type="time"
                                                        value={slot.end}
                                                        onChange={(e) => updateTimeSlot(key, index, 'end', e.target.value)}
                                                        className="flex-1 px-3 py-2 bg-white/5 border border-white/20 text-white text-sm focus:outline-none focus:border-white transition"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeTimeSlot(key, index)}
                                                        className="px-3 py-2 bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition text-sm"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}

                                            {!isDayActive(key) && (
                                                <p className="text-white/40 text-sm italic">Día cerrado</p>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {errors.schedules && (
                                    <p className="text-red-400 text-sm mt-3">{errors.schedules}</p>
                                )}
                            </div>
                        )}

                        {/* Botones de Navegación */}
                        <div className="flex gap-4 mt-8">
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="flex-1 py-3 bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition"
                                >
                                    ← Anterior
                                </button>
                            )}

                            {currentStep < 3 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="flex-1 py-3 bg-white text-black font-bold hover:bg-white/90 transition"
                                >
                                    Siguiente →
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 py-3 bg-white text-black font-bold hover:bg-white/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Creando...' : 'Crear Mi Barbería ✓'}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
