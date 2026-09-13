import { Plus } from "lucide-react";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  buttonText,
  onClick,
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      {Icon && (
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-500/10 to-neutral-900">
          <Icon className="h-10 w-10 text-red-400" />
        </div>
      )}

      <h2 className="text-2xl font-bold text-white">{title}</h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-neutral-400">
        {description}
      </p>

      {buttonText && onClick && (
        <button
          type="button"
          onClick={onClick}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D] px-5 py-3 font-medium transition-opacity duration-200 hover:opacity-90"
        >
          <Plus className="h-5 w-5" />
          {buttonText}
        </button>
      )}
    </div>
  );
}
