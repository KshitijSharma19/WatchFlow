import { useMemo, memo } from "react";
import {
  ListMusic,
  LineChart,
  FileText,
  Target,
  ArrowRight,
} from "lucide-react";
import BackgroundGlow from "../components/common/BackgroundGlow";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const FeatureCard = memo(({ icon: Icon, title, description, showBorder }) => (
  <div
    className={`flex flex-col items-center text-center px-6 relative group ${
      showBorder
        ? "lg:after:content-[''] lg:after:absolute lg:after:top-2 lg:after:right-0 lg:after:h-14 lg:after:w-[1px] lg:after:bg-neutral-900/60"
        : ""
    }`}
  >
    <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-900 flex items-center justify-center text-[#E04D4D] mb-4 shadow-md group-hover:border-red-500/20 transition-colors duration-200">
      <Icon className="w-5 h-5" strokeWidth={1.5} />
    </div>
    <h3 className="text-sm sm:text-base font-semibold text-neutral-200 mb-2 tracking-wide">
      {title}
    </h3>
    <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-[210px]">
      {description}
    </p>
  </div>
));

FeatureCard.displayName = "FeatureCard";

export default function WatchFlowHero() {
  const { isAuthenticated } = useAuth();

  const FEATURES = useMemo(
    () => [
      {
        icon: ListMusic,
        title: "Track Playlists",
        description: "Add and organize your YouTube playlists in one place.",
      },
      {
        icon: LineChart,
        title: "Monitor Progress",
        description: "See how far you've come and what's left to watch.",
      },
      {
        icon: FileText,
        title: "Take Notes",
        description: "Capture key learnings and important takeaways.",
      },
      {
        icon: Target,
        title: "Stay Consistent",
        description: "Build the habit. Stay focused. Achieve your goals.",
      },
    ],
    [],
  );

  return (
    <section className="relative min-h-screen bg-[#030005] text-white overflow-hidden font-sans antialiased flex flex-col justify-center items-center select-none">
      <BackgroundGlow />

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-10 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2.5 bg-neutral-900/60 border border-neutral-800 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-wide text-neutral-300 mb-8 backdrop-blur-md shadow-inner">
          <span className="text-[#E04D4D] text-[11px]">✦</span> Track. Focus.
          Achieve.
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-[58px] font-bold tracking-tight max-w-[850px] leading-[1.12] text-white mb-6">
          Learn from{" "}
          <span className="bg-gradient-to-r from-[#F26464] to-[#E04D4D] bg-clip-text text-transparent">
            YouTube
          </span>{" "}
          <br />
          without the distractions.
        </h1>

        <p className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-[540px] font-normal leading-relaxed mb-10">
          Organize YouTube playlists, track your progress, take notes, and stay
          focused in one dedicated learning workspace.
        </p>

        <Link
          to={isAuthenticated ? "/dashboard" : "/signup"}
          aria-label={
            isAuthenticated
              ? "Go to dashboard"
              : "Create an account to get started"
          }
          className="group flex items-center gap-2.5 bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D] border border-red-400/20 px-8 py-3 rounded-xl font-bold text-sm sm:text-base text-white shadow-[0_4px_25px_rgba(224,77,77,0.25)] hover:shadow-[0_4px_35px_rgba(224,77,77,0.45)] hover:brightness-110 active:scale-[0.98] transition-[shadow,filter,transform] duration-300"
        >
          {isAuthenticated ? "Go to Dashboard" : "Get Started"}
          <ArrowRight
            className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300"
            strokeWidth={2.5}
          />
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 lg:gap-y-0 w-full mt-13 pt-10 border-t border-neutral-900/60">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              showBorder={index !== FEATURES.length - 1}
            />
          ))}
        </div>
      </main>
    </section>
  );
}
