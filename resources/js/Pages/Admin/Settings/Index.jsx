import { Head, useForm, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';

export default function Index({ auth, schedulesByDay }) {
    const [activeTab, setActiveTab] = useState('profile');
    const { barbershop } = usePage().props;
    const accentColor = barbershop?.accent_color || '#ffffff';
    const [logoPreview, setLogoPreview] = useState(barbershop?.logo ? `/${barbershop.logo}` : null);

    // Form para perfil
    const profileForm = useForm({
        name: barbershop?.name || '',
        address: barbershop?.address || '',
        phone: barbershop?.phone || '',
        logo: null,
    });

    // Form para horarios
    const schedulesForm = useForm({
        schedules: schedulesByDay || {},
    });

    const daysOfWeek = [
        { key: 'monday', label: 'Lunes' },
        { key: 'tuesday', label: 'Martes' },
        { key: 'wednesday', label: 'Miércoles' },
        { key: 'thursday', label: 'Jueves' },
        { key: 'friday', label: 'Viernes' },
        { key: 'saturday', label: 'Sábado' },
        { key: 'sunday', label: 'Domingo' },
    ];

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            profileForm.setData('logo', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        profileForm.post(route('admin.settings.update-profile'));
    };

    const handleSchedulesSubmit = (e) => {
        e.preventDefault();
        schedulesForm.post(route('admin.settings.update-schedules'));
    };

    const addTimeSlot = (day) => {
        const currentSchedules = schedulesForm.data.schedules[day] || [];
        schedulesForm.setData('schedules', {
            ...schedulesForm.data.schedules,
            [day]: [...currentSchedules, { start: '09:00', end: '13:00' }]
        });
    };

    const removeTimeSlot = (day, index) => {
        const currentSchedules = schedulesForm.data.schedules[day] || [];
        schedulesForm.setData('schedules', {
            ...schedulesForm.data.schedules,
            [day]: currentSchedules.filter((_, i) => i !== index)
        });
    };

    const updateTimeSlot = (day, index, field, value) => {
        const currentSchedules = schedulesForm.data.schedules[day] || [];
        const updated = [...currentSchedules];
        updated[index][field] = value;
        schedulesForm.setData('schedules', {
            ...schedulesForm.data.schedules,
            [day]: updated
        });
    };

    const handlePasswordReset = () => {
        router.post(route('admin.settings.send-password-reset'), {
            email: auth.user.email
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Configuración" />

            <div className="min-h-screen bg-black pt-6 pb-12">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            Configuración
                        </h1>
                        <p className="text-white/60 text-sm">
                            Gestiona la información y configuración de {barbershop?.name}
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="mb-6 flex space-x-2 border-b border-white/10">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`pb-3 px-4 font-semibold transition flex items-center gap-2 ${
                                activeTab === 'profile'
                                    ? 'text-white border-b-2'
                                    : 'text-white/50 hover:text-white/70'
                            }`}
                            style={activeTab === 'profile' ? { borderBottomColor: accentColor } : {}}
                        >
                            <svg className="w-5 h-5" fill="none" stroke={activeTab === 'profile' ? accentColor : 'currentColor'} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Perfil de la Barbería
                        </button>
                        <button
                            onClick={() => setActiveTab('schedules')}
                            className={`pb-3 px-4 font-semibold transition flex items-center gap-2 ${
                                activeTab === 'schedules'
                                    ? 'text-white border-b-2'
                                    : 'text-white/50 hover:text-white/70'
                            }`}
                            style={activeTab === 'schedules' ? { borderBottomColor: accentColor } : {}}
                        >
                            <svg className="w-5 h-5" fill="none" stroke={activeTab === 'schedules' ? accentColor : 'currentColor'} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Horarios de Atención
                        </button>
                    </div>

                    {/* Tab Content: Perfil */}
                    {activeTab === 'profile' && (
                        <form onSubmit={handleProfileSubmit} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <svg className="w-6 h-6" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <h2 className="text-xl font-bold text-white">Información de la Barbería</h2>
                            </div>

                            {/* Logo */}
                            <div className="mb-6 text-center">
                                <label className="block text-white font-semibold mb-4">
                                    Logo
                                </label>
                                <div className="flex justify-center mb-4">
                                    {logoPreview ? (
                                        <img 
                                            src={logoPreview} 
                                            alt="Logo" 
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
                                    className="inline-block px-6 py-2 bg-white/10 text-white border border-white/20 cursor-pointer hover:bg-white/20 transition rounded-lg"
                                >
                                    Cambiar Logo
                                </label>
                                {profileForm.errors.logo && (
                                    <p className="text-red-400 text-sm mt-2">{profileForm.errors.logo}</p>
                                )}
                            </div>

                            {/* Nombre */}
                            <div className="mb-6">
                                <label className="block text-white font-semibold mb-2">
                                    Nombre de la Barbería *
                                </label>
                                <input
                                    type="text"
                                    value={profileForm.data.name}
                                    onChange={(e) => profileForm.setData('name', e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition rounded-lg"
                                />
                                {profileForm.errors.name && (
                                    <p className="text-red-400 text-sm mt-2">{profileForm.errors.name}</p>
                                )}
                            </div>

                            {/* Dirección */}
                            <div className="mb-6">
                                <label className="block text-white font-semibold mb-2">
                                    Dirección *
                                </label>
                                <textarea
                                    value={profileForm.data.address}
                                    onChange={(e) => profileForm.setData('address', e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition resize-none rounded-lg"
                                    rows="3"
                                />
                                {profileForm.errors.address && (
                                    <p className="text-red-400 text-sm mt-2">{profileForm.errors.address}</p>
                                )}
                            </div>

                            {/* Teléfono */}
                            <div className="mb-6">
                                <label className="block text-white font-semibold mb-2">
                                    Teléfono *
                                </label>
                                <input
                                    type="tel"
                                    value={profileForm.data.phone}
                                    onChange={(e) => profileForm.setData('phone', e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition rounded-lg"
                                />
                                {profileForm.errors.phone && (
                                    <p className="text-red-400 text-sm mt-2">{profileForm.errors.phone}</p>
                                )}
                            </div>

                            {/* Email y Contraseña */}
                            <div className="mb-8 p-4 bg-white/5 border border-white/10 rounded-lg">
                                <h3 className="text-white font-semibold mb-3">Cuenta de Usuario</h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-white/70 text-sm mb-1">
                                            Correo Electrónico
                                        </label>
                                        <input
                                            type="email"
                                            value={auth.user.email}
                                            disabled
                                            className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white/50 cursor-not-allowed rounded-lg"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handlePasswordReset}
                                        className="px-4 py-2 bg-white/10 text-white text-sm border border-white/20 hover:bg-white/20 transition rounded-lg"
                                    >
                                        Solicitar Recuperación de Contraseña
                                    </button>
                                    <p className="text-white/50 text-sm">
                                        Se enviará un link de recuperación a {auth.user.email}
                                    </p>
                                </div>
                            </div>

                            {/* Botón Guardar */}
                            <button
                                type="submit"
                                disabled={profileForm.processing}
                                className="w-full py-3 font-bold transition disabled:opacity-50 disabled:cursor-not-allowed rounded-xl border-2 text-white"
                                style={{
                                    borderColor: accentColor,
                                    backgroundColor: `${accentColor}20`
                                }}
                            >
                                {profileForm.processing ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </form>
                    )}

                    {/* Tab Content: Horarios */}
                    {activeTab === 'schedules' && (
                        <form onSubmit={handleSchedulesSubmit} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <svg className="w-6 h-6" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h2 className="text-xl font-bold text-white">Horarios de Atención</h2>
                            </div>
                            <p className="text-white/70 mb-6">
                                Define los horarios en que tu barbería atiende. Puedes agregar múltiples intervalos por día.
                            </p>

                            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                                {daysOfWeek.map(({ key, label }) => (
                                    <div key={key} className="border border-white/10 bg-white/5 p-3 md:p-4 rounded-lg">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                                            <label className="text-white font-semibold">
                                                {label}
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => addTimeSlot(key)}
                                                className="px-3 py-1.5 bg-white/10 text-white text-xs sm:text-sm border border-white/20 hover:bg-white/20 transition rounded-lg whitespace-nowrap"
                                            >
                                                + Agregar
                                            </button>
                                        </div>

                                        {schedulesForm.data.schedules[key]?.map((slot, index) => (
                                            <div key={index} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-2">
                                                <input
                                                    type="time"
                                                    value={slot.start}
                                                    onChange={(e) => updateTimeSlot(key, index, 'start', e.target.value)}
                                                    className="flex-1 px-3 py-2 bg-white/5 border border-white/20 text-white text-sm focus:outline-none focus:border-white transition rounded-lg"
                                                />
                                                <span className="text-white/50 text-center sm:text-left text-xs sm:text-sm">hasta</span>
                                                <input
                                                    type="time"
                                                    value={slot.end}
                                                    onChange={(e) => updateTimeSlot(key, index, 'end', e.target.value)}
                                                    className="flex-1 px-3 py-2 bg-white/5 border border-white/20 text-white text-sm focus:outline-none focus:border-white transition rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeTimeSlot(key, index)}
                                                    className="px-3 py-2 bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition text-sm rounded-lg"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}

                                        {(!schedulesForm.data.schedules[key] || schedulesForm.data.schedules[key].length === 0) && (
                                            <p className="text-white/40 text-sm italic">Día cerrado</p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {schedulesForm.errors.schedules && (
                                <p className="text-red-400 text-sm mt-3">{schedulesForm.errors.schedules}</p>
                            )}

                            <button
                                type="submit"
                                disabled={schedulesForm.processing}
                                className="w-full mt-6 py-3 font-bold transition disabled:opacity-50 disabled:cursor-not-allowed rounded-xl border-2 text-white"
                                style={{
                                    borderColor: accentColor,
                                    backgroundColor: `${accentColor}20`
                                }}
                            >
                                {schedulesForm.processing ? 'Guardando...' : 'Guardar Horarios'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
