export default function BackgroundGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 select-none">
      {/* Bottom-right glow */}
      <div className="absolute bottom-[-20%] right-[-10%] h-[700px] w-[700px] rounded-full bg-red-500/10 dark:bg-red-900/20 blur-[100px]" />

      {/* Left ambient glow */}
      <div className="absolute left-[-15%] top-[30%] h-[500px] w-[500px] rounded-full bg-slate-300/30 dark:bg-neutral-500/20 blur-[90px]" />

      {/* Vertical fade overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100/60 via-transparent to-slate-100/60 dark:from-[#030005] dark:via-transparent dark:to-[#030005] opacity-80" />
    </div>
  );
}
