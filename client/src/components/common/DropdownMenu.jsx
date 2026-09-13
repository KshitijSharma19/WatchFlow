import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";

export default function DropdownMenu({ items }) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-label="Open menu"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className="rounded-lg p-2 text-neutral-500 transition-colors duration-200 hover:bg-neutral-800 hover:text-white"
      >
        <MoreVertical className="h-5 w-5" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-xl border border-neutral-800 bg-[#111] shadow-2xl"
        >
          {items.map((item) => {
            const { icon: Icon, label, danger, onClick } = item;

            return (
              <button
                key={label}
                type="button"
                role="menuitem"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                  onClick?.();
                }}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors duration-200 ${
                  danger
                    ? "text-red-400 hover:bg-red-500/10"
                    : "text-neutral-300 hover:bg-neutral-800"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
