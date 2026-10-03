import { useState, useMemo, useRef, useEffect } from "react";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function LeetcodeConsistencyHeatmap({ stats }) {
  const [timeframe, setTimeframe] = useState("12"); // "12" or "6"
  const [hoveredCell, setHoveredCell] = useState(null);
  const scrollRef = useRef(null);

  const submissionCalendar = stats?.submissionCalendar || {};

  // Build date-to-count map (UTC normalized)
  const submissionsMap = useMemo(() => {
    const map = new Map();
    if (!submissionCalendar) return map;

    for (const [tsStr, count] of Object.entries(submissionCalendar)) {
      const ts = Number(tsStr);
      if (!isNaN(ts)) {
        const dateStr = new Date(ts * 1000).toISOString().split("T")[0];
        map.set(dateStr, Number(count) || 1);
      }
    }
    return map;
  }, [submissionCalendar]);

  // Generate month blocks based on timeframe (6 or 12 months)
  const { monthBlocks, totalContributions, activeDaysCount, maxStreakCount } =
    useMemo(() => {
      const numMonths = parseInt(timeframe, 10) || 12;
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth(); // 0-indexed

      const months = [];
      let totalContrib = 0;
      let activeDays = 0;
      let runningStreak = 0;
      let calculatedMaxStreak = 0;

      // Iterate through the past N months up to current month
      for (let i = numMonths - 1; i >= 0; i--) {
        const targetDate = new Date(currentYear, currentMonth - i, 1);
        const y = targetDate.getFullYear();
        const m = targetDate.getMonth();
        const monthName = MONTH_NAMES[m];
        const daysInMonth = new Date(y, m + 1, 0).getDate();

        const weeks = [];
        let currentWeek = Array(7).fill(null);

        for (let day = 1; day <= daysInMonth; day++) {
          const dateObj = new Date(y, m, day);

          // Only show days up to today if in current month
          const isFuture =
            y === currentYear && m === currentMonth && day > today.getDate();

          const key = `${y}-${String(m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const count = isFuture ? 0 : submissionsMap.get(key) || 0;

          if (!isFuture) {
            if (count > 0) {
              totalContrib += count;
              activeDays += 1;
              runningStreak += 1;
              if (runningStreak > calculatedMaxStreak) {
                calculatedMaxStreak = runningStreak;
              }
            } else {
              runningStreak = 0;
            }
          }

          // Day of week: 0=Sunday ... 6=Saturday
          const dayOfWeek = dateObj.getDay();

          currentWeek[dayOfWeek] = {
            date: dateObj,
            key,
            count,
            isFuture,
          };

          // If Saturday (end of column) or last day of month, complete the column
          if (dayOfWeek === 6 || day === daysInMonth) {
            weeks.push(currentWeek);
            currentWeek = Array(7).fill(null);
          }
        }

        months.push({
          name: monthName,
          year: y,
          monthIndex: m,
          weeks,
        });
      }

      return {
        monthBlocks: months,
        totalContributions: totalContrib,
        activeDaysCount: activeDays,
        maxStreakCount: Math.max(calculatedMaxStreak, stats?.maxStreak || 0),
      };
    }, [timeframe, submissionsMap, stats?.maxStreak]);

  // Auto-scroll to the end (most recent month) on mount & timeframe change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [timeframe, monthBlocks]);

  // WatchFlow theme red gradient palette
  const getCellColor = (day) => {
    if (!day || day.isFuture) {
      return "bg-transparent pointer-events-none";
    }
    const count = day.count;
    if (!count || count <= 0) {
      return "bg-slate-200/80 dark:bg-zinc-800/60 hover:ring-1 hover:ring-slate-400 dark:hover:ring-zinc-600";
    }
    if (count <= 2) {
      return "bg-red-500/35 hover:ring-1 hover:ring-red-400";
    }
    if (count <= 5) {
      return "bg-red-500/65 hover:ring-1 hover:ring-red-300";
    }
    if (count <= 8) {
      return "bg-[#E04D4D] hover:ring-1 hover:ring-red-200 shadow-2xs";
    }
    return "bg-red-500 shadow-xs shadow-red-500/40 hover:ring-1 hover:ring-white";
  };

  const formatDateDisplay = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="p-5 sm:p-6 bg-white dark:bg-[#121215] border border-slate-200 dark:border-zinc-800/80 rounded-2xl shadow-xs space-y-5 w-full max-w-full min-w-0 overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            Consistency
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            1 platform connected
          </span>

          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-zinc-300 focus:outline-none focus:border-[#E04D4D] cursor-pointer"
          >
            <option value="12">12 Months</option>
            <option value="6">6 Months</option>
          </select>
        </div>
      </div>

      {/* Heatmap Grid Broken By Month */}
      <div className="relative w-full max-w-full min-w-0 overflow-hidden">
        <div
          ref={scrollRef}
          className="overflow-x-auto w-full max-w-full pb-3 pt-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-zinc-800"
        >
          <div className="inline-flex items-start gap-2.5 sm:gap-3 min-w-max">
            {monthBlocks.map((month) => (
              <div
                key={`${month.year}-${month.monthIndex}`}
                className="flex flex-col items-center gap-2"
              >
                {/* 7-row Columns for this month */}
                <div className="flex gap-[3px]">
                  {month.weeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-[3px]">
                      {week.map((day, dIdx) => {
                        if (!day || day.isFuture) {
                          return (
                            <div
                              key={`empty-${wIdx}-${dIdx}`}
                              className="w-2.5 h-2.5 rounded-[2px] opacity-0 pointer-events-none"
                            />
                          );
                        }

                        return (
                          <div
                            key={day.key}
                            onMouseEnter={(e) => {
                              const rect =
                                e.currentTarget.getBoundingClientRect();
                              setHoveredCell({
                                key: day.key,
                                count: day.count,
                                dateStr: formatDateDisplay(day.date),
                                x: rect.left + rect.width / 2,
                                y: rect.top,
                              });
                            }}
                            onMouseLeave={() => setHoveredCell(null)}
                            className={`w-2.5 h-2.5 rounded-[2px] transition-transform duration-100 hover:scale-125 cursor-pointer ${getCellColor(
                              day,
                            )}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Centered Month Label below the month block */}
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 dark:text-zinc-500 select-none">
                  {month.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Tooltip */}
        {hoveredCell && (
          <div
            style={{
              position: "fixed",
              left: `${hoveredCell.x}px`,
              top: `${hoveredCell.y - 8}px`,
              transform: "translate(-50%, -100%)",
            }}
            className="pointer-events-none z-50 px-2.5 py-1 rounded-lg bg-slate-900 dark:bg-black border border-slate-700 dark:border-zinc-800 text-[11px] text-white shadow-xl whitespace-nowrap animate-in fade-in duration-100"
          >
            <span className="font-semibold text-red-400">
              {hoveredCell.count}{" "}
              {hoveredCell.count === 1 ? "submission" : "submissions"}
            </span>{" "}
            on {hoveredCell.dateStr}
          </div>
        )}
      </div>

      {/* Bottom Summary Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-slate-100 dark:border-zinc-800/80">
        <div className="flex items-center gap-6 sm:gap-8 flex-wrap">
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {totalContributions || stats?.totalSubmissions || 0}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-zinc-500">
              Contributions · {timeframe} mos
            </div>
          </div>

          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {activeDaysCount || stats?.totalActiveDays || 0}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-zinc-500">
              Active days
            </div>
          </div>

          <div>
            <div className="text-xl sm:text-2xl font-black text-amber-500">
              {maxStreakCount || stats?.maxStreak || 0}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-zinc-500">
              Best streak
            </div>
          </div>

          <div>
            <div className="text-xl sm:text-2xl font-black text-[#E04D4D]">
              {stats?.currentStreak || 0}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-zinc-500">
              Current streak
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-zinc-500 select-none">
          <span>Less</span>
          <span className="w-2.5 h-2.5 rounded-[2px] bg-slate-200 dark:bg-zinc-800/60" />
          <span className="w-2.5 h-2.5 rounded-[2px] bg-red-500/35" />
          <span className="w-2.5 h-2.5 rounded-[2px] bg-red-500/65" />
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#E04D4D]" />
          <span className="w-2.5 h-2.5 rounded-[2px] bg-red-500" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
