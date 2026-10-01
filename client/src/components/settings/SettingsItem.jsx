import { ChevronRight } from "lucide-react";

export default function SettingsItem({
  icon: Icon,
  title,
  subtitle,
  right,
  danger,
  isPlaceholder,
  onClick,
}) {
  const isClickable = !!onClick && !isPlaceholder;

  return (
    <div
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={isClickable ? onClick : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={`flex items-center justify-between p-4 transition-colors ${
        isClickable ? "cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-900/40" : ""
      } ${isPlaceholder ? "bg-slate-50/50 dark:bg-zinc-900/10 opacity-75" : ""}`}
    >
      <div className="flex items-start gap-4 max-w-xl">
        {Icon && (
          <div
            className={`p-2 rounded-lg mt-0.5 ${
              danger
                ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                : "bg-slate-100 text-slate-600 border border-slate-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800/60"
            }`}
          >
            <Icon className="w-4 h-4" />
          </div>
        )}

        <div>
          <h3
            className={`text-sm font-medium ${
              danger ? "text-red-600 dark:text-red-400" : "text-slate-800 dark:text-zinc-200"
            }`}
          >
            {title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-500 mt-0.5 leading-relaxed">
            {subtitle}
          </p>
          {isPlaceholder && (
            <span className="mt-2 inline-flex rounded bg-amber-500/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-500 dark:text-amber-400">
              Coming Soon
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {right}
        {isClickable && right == null && (
          <ChevronRight
            className={`w-4 h-4 ${danger ? "text-red-400 dark:text-red-500/40" : "text-slate-400 dark:text-zinc-600"}`}
          />
        )}
      </div>
    </div>
  );
}
