export default function BackgroundGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* Bottom-right ambient glow */}
      <div className="absolute -bottom-24 -right-24 h-[500px] w-[500px] rounded-full bg-red-600/10 dark:bg-red-700/15 blur-[80px] transform-gpu will-change-transform" />

      {/* Top-left ambient glow */}
      <div className="absolute -top-20 -left-20 h-[380px] w-[380px] rounded-full bg-slate-300/20 dark:bg-neutral-600/10 blur-[70px] transform-gpu will-change-transform" />

      {/* Subtle vertical gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100/30 via-transparent to-slate-100/30 dark:from-[#030005]/50 dark:via-transparent dark:to-[#030005]/70 pointer-events-none" />
    </div>
  );
}
