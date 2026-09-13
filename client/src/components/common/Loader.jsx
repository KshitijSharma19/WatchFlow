const SPINNER_SIZES = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
};

export default function Loader({
  text = "Loading...",
  subtitle = "Please wait...",
  fullscreen = false,
  size = "md",
}) {
  const spinnerClass = SPINNER_SIZES[size] ?? SPINNER_SIZES.md;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center ${
        fullscreen ? "min-h-screen bg-[#030005]" : "h-[70vh]"
      }`}
    >
      <div className={`relative ${spinnerClass}`}>
        <div className="absolute inset-0 rounded-full border-2 border-neutral-800" />

        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-r-red-500 border-t-red-500" />

        <div className="absolute inset-3 rounded-full bg-red-500/15 blur-sm" />
      </div>

      <div className="mt-6 text-center">
        <h2 className="text-sm font-semibold text-white md:text-base">
          {text}
        </h2>

        <p className="mt-1 text-xs text-neutral-500">{subtitle}</p>
      </div>
    </div>
  );
}
