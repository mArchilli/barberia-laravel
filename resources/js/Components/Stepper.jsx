export default function Stepper({ currentStep, totalSteps, steps }) {
    return (
        <div className="mb-12">
            <div className="flex items-center justify-center">
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isActive = stepNumber === currentStep;
                    const isCompleted = stepNumber < currentStep;

                    return (
                        <div key={stepNumber} className="flex items-center">
                            {/* Círculo del paso */}
                            <div className="flex flex-col items-center">
                                <div
                                    className={`
                                        w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-2 transition-all
                                        ${isCompleted ? 'bg-white text-black border-white' : ''}
                                        ${isActive ? 'bg-white/20 text-white border-white scale-110' : ''}
                                        ${!isActive && !isCompleted ? 'bg-transparent text-white/40 border-white/20' : ''}
                                    `}
                                >
                                    {isCompleted ? '✓' : stepNumber}
                                </div>
                                <p className={`
                                    mt-2 text-sm font-medium
                                    ${isActive ? 'text-white' : 'text-white/50'}
                                `}>
                                    {step}
                                </p>
                            </div>

                            {/* Línea conectora */}
                            {index < steps.length - 1 && (
                                <div
                                    className={`
                                        w-20 h-0.5 mx-4 transition-all
                                        ${stepNumber < currentStep ? 'bg-white' : 'bg-white/20'}
                                    `}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Indicador de progreso */}
            <div className="mt-6 text-center">
                <p className="text-white/70 text-sm">
                    Paso {currentStep} de {totalSteps}
                </p>
            </div>
        </div>
    );
}
