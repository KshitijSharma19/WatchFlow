import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-neutral-900/80 bg-transparent py-6 px-4 sm:px-8 mt-auto relative z-10 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
        <p className="text-xs text-slate-500 dark:text-neutral-500 font-normal">
          © 2026 WatchFlow · Built for focused learning ❤️
        </p>
      </div>
    </footer>
  );
}
