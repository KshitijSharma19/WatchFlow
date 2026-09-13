import { useEffect } from "react";
import { AlertTriangle, RefreshCw, CheckCircle2 } from "lucide-react";

const VARIANTS = {
  danger: {
    icon: AlertTriangle,
    iconBg: "bg-red-500/10",
    iconColor: "text-red-400",
    buttonClass: "bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D]",
  },
  primary: {
    icon: RefreshCw,
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-400",
    buttonClass: "bg-gradient-to-r from-sky-600 to-sky-500",
  },
  neutral: {
    icon: CheckCircle2,
    iconBg: "bg-neutral-700/20",
    iconColor: "text-neutral-300",
    buttonClass: "bg-neutral-700 hover:bg-neutral-600",
  },
};

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  loadingText = "Processing...",
  variant = "danger",
  onCancel,
  onConfirm,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape" && !loading) {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, loading, onCancel]);

  if (!isOpen) {
    return null;
  }

  const {
    icon: Icon,
    iconBg,
    iconColor,
    buttonClass,
  } = VARIANTS[variant] ?? VARIANTS.danger;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-[#111] shadow-2xl">
        <div className="flex items-start gap-4 p-6">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
          >
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>

          <div>
            <h2
              id="confirm-modal-title"
              className="text-lg font-bold text-white"
            >
              {title}
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-neutral-400">
              {message}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-neutral-800 px-6 py-4">
          <button
            type="button"
            disabled={loading}
            onClick={() => {
              if (!loading) {
                onCancel();
              }
            }}
            className="rounded-xl border border-neutral-700 px-4 py-2 transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className={`rounded-xl px-4 py-2 text-white transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 ${buttonClass}`}
          >
            {loading ? loadingText : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
