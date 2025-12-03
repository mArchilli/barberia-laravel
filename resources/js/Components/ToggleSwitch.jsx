export default function ToggleSwitch({ 
    checked, 
    onChange, 
    label, 
    description,
    disabled = false 
}) {
    return (
        <div className="flex items-start gap-4">
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => onChange(!checked)}
                className={`
                    relative inline-flex h-8 w-14 shrink-0 cursor-pointer 
                    border-2 border-transparent transition-colors duration-200 ease-in-out 
                    focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black
                    disabled:cursor-not-allowed disabled:opacity-50
                    ${checked ? 'bg-white' : 'bg-white/20'}
                `}
            >
                <span
                    className={`
                        pointer-events-none inline-block h-7 w-7 transform 
                        transition duration-200 ease-in-out
                        ${checked ? 'translate-x-6 bg-black' : 'translate-x-0 bg-white'}
                    `}
                />
            </button>
            
            {(label || description) && (
                <div className="flex-1">
                    {label && (
                        <span className="block text-white font-semibold">
                            {label}
                        </span>
                    )}
                    {description && (
                        <span className="block text-sm text-white/70 mt-1">
                            {description}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
