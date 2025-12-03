export default function ConfirmModal({ show, onClose, onConfirm, title, message, confirmText = "Confirmar", cancelText = "Cancelar", type = "danger" }) {
    if (!show) return null;

    const confirmButtonClass = type === "danger" 
        ? "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
        : "bg-white text-black hover:bg-white/90";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md border border-white/10 bg-black p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-4">
                    {title}
                </h3>
                <p className="text-white/70 mb-8">
                    {message}
                </p>

                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-3 bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition"
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className={`flex-1 py-3 font-bold border transition ${confirmButtonClass}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
