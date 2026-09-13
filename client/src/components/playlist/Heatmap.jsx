import { useState, useEffect, useRef, useMemo } from "react";

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Heatmap({ heatmap = {}, days = 365 }) {
  const scrollContainerRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);

  const canHover = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(hover: hover)").matches;
  }, []);

  const { weeks, weekMonths, centerWeekIndices } = useMemo(() => {
    const allDays = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const key = date.toLocaleDateString("en-CA");

      allDays.push({
        date,
        key,
        activity: heatmap[key] || {
          videosCompleted: 0,
          minutesStudied: 0,
        },
      });
    }

    const firstDayOfWeek = (allDays[0].date.getDay() + 6) % 7;
    for (let i = 0; i < firstDayOfWeek; i++) {
      allDays.unshift(null);
    }

    while (allDays.length % 7 !== 0) {
      allDays.push(null);
    }

    const weeksList = [];
    for (let i = 0; i < allDays.length; i += 7) {
      weeksList.push(allDays.slice(i, i + 7));
    }

    const monthsList = weeksList.map((week) => {
      const firstValidDay = week.find((d) => d !== null);
      return firstValidDay
        ? firstValidDay.date.toLocaleString("default", { month: "short" })
        : "";
    });

    const centerIndices = new Map();
    let startIdx = 0;

    for (let i = 0; i <= monthsList.length; i++) {
      if (i === monthsList.length || monthsList[i] !== monthsList[startIdx]) {
        const endIdx = i - 1;
        const midIdx = startIdx + Math.floor((endIdx - startIdx) / 2);
        if (monthsList[startIdx]) {
          centerIndices.set(midIdx, monthsList[startIdx]);
        }
        startIdx = i;
      }
    }

    return {
      weeks: weeksList,
      weekMonths: monthsList,
      centerWeekIndices: centerIndices,
    };
  }, [heatmap, days]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  }, [weeks.length]);

  const getColor = (activity) => {
    const videos = activity?.videosCompleted ?? 0;

    if (videos === 0) return "bg-neutral-800";
    if (videos === 1) return "bg-red-500/25";
    if (videos <= 3) return "bg-red-500/60";

    return "bg-red-500";
  };

  // Dynamically compute safety positioning coordinates relative to viewport bounds
  const getTooltipStyles = () => {
    if (!tooltip) return {};

    const isPastHalfwayWidth = tooltip.x > window.innerWidth / 2;
    const isPastHalfwayHeight = tooltip.y > window.innerHeight / 2;

    const styles = {
      top: isPastHalfwayHeight ? "auto" : `${tooltip.y - 16}px`,
      bottom: isPastHalfwayHeight
        ? `${window.innerHeight - tooltip.y - 16}px`
        : "auto",
    };

    if (isPastHalfwayWidth) {
      styles.right = `${window.innerWidth - tooltip.x + 16}px`;
      styles.left = "auto";
    } else {
      styles.left = `${tooltip.x + 16}px`;
      styles.right = "auto";
    }

    return styles;
  };

  return (
    <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-5 w-full">
      <h2 className="text-sm font-semibold mb-4 text-white">
        Consistency Heatmap
      </h2>

      <div className="flex gap-3">
        <div className="flex flex-col gap-1 text-[11px] text-neutral-500 shrink-0 select-none pt-6">
          {WEEK_DAYS.map((day) => (
            <div
              key={day}
              className="h-4 flex items-center justify-end font-medium leading-none"
            >
              {day}
            </div>
          ))}
        </div>

        <div
          ref={scrollContainerRef}
          className="overflow-x-auto flex-1 pb-3 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-neutral-900/50 [&::-webkit-scrollbar-thumb]:bg-neutral-700/60 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-neutral-600"
        >
          <div className="flex gap-1 w-max">
            {weeks.map((week, weekIndex) => {
              const monthLabel = centerWeekIndices.get(weekIndex);
              const isNewMonth =
                weekIndex > 0 &&
                weekMonths[weekIndex] !== weekMonths[weekIndex - 1];

              return (
                <div
                  key={weekIndex}
                  className={`flex flex-col gap-1 ${isNewMonth ? "ml-3.5" : ""}`}
                >
                  <div className="h-5 text-[11px] text-neutral-400 font-medium relative w-4">
                    {monthLabel && (
                      <span className="absolute left-1/2 -translate-x-1/2 top-0 whitespace-nowrap select-none">
                        {monthLabel}
                      </span>
                    )}
                  </div>

                  {week.map((day, dayIndex) =>
                    day ? (
                      <div
                        key={day.key}
                        role="button"
                        tabIndex={0}
                        onMouseEnter={
                          canHover
                            ? (e) =>
                                setTooltip({
                                  day,
                                  x: e.clientX,
                                  y: e.clientY,
                                })
                            : undefined
                        }
                        onMouseLeave={
                          canHover ? () => setTooltip(null) : undefined
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setTooltip({
                              day,
                              x: e.currentTarget.getBoundingClientRect().left,
                              y: e.currentTarget.getBoundingClientRect().top,
                            });
                          }
                        }}
                        className={`w-4 h-4 rounded transition-all duration-200 hover:scale-110 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-red-400 ${getColor(day.activity)}`}
                      />
                    ) : (
                      <div
                        key={`empty-${dayIndex}`}
                        className="w-4 h-4 rounded bg-transparent"
                      />
                    ),
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-start gap-2 mt-4 text-xs text-neutral-400 select-none">
        <span>Less</span>
        <div className="flex items-center gap-1">
          <div
            title="0 videos"
            className="w-3.5 h-3.5 rounded bg-neutral-800"
          />
          <div title="1 video" className="w-3.5 h-3.5 rounded bg-red-500/25" />
          <div
            title="2-3 videos"
            className="w-3.5 h-3.5 rounded bg-red-500/60"
          />
          <div title="4+ videos" className="w-3.5 h-3.5 rounded bg-red-500" />
        </div>
        <span>More</span>
      </div>

      {canHover && tooltip && (
        <div
          className="fixed z-50 pointer-events-none rounded-xl border border-neutral-700 bg-[#111] px-4 py-3 shadow-2xl transition-all duration-150 ease-out"
          style={getTooltipStyles()}
        >
          <p className="font-semibold text-white">
            {tooltip.day.date.toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <p className="text-sm text-neutral-400 mt-2 flex items-center gap-1.5">
            <span>🎬</span> {tooltip.day.activity.videosCompleted} videos
          </p>
          <p className="text-sm text-neutral-400 flex items-center gap-1.5">
            <span>⏱</span> {tooltip.day.activity.minutesStudied} mins
          </p>
        </div>
      )}
    </div>
  );
}
