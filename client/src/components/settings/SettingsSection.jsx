export default function SettingsSection({ title, description, children }) {
  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-lg font-medium tracking-tight text-slate-900 dark:text-zinc-100">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">{description}</p>
      </header>

      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950/40 shadow-xs dark:shadow-none">
        {children}
      </div>
    </section>
  );
}
