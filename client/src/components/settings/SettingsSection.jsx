export default function SettingsSection({ title, description, children }) {
  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-lg font-medium tracking-tight text-zinc-100">
          {title}
        </h2>

        <p className="mt-1 text-sm text-zinc-400">{description}</p>
      </header>

      <div className="overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-950/40">
        {children}
      </div>
    </section>
  );
}
