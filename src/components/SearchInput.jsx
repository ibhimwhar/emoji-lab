import { useState, useEffect, useRef } from "react";
import { ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchInput({
  value,
  onChange,
  category,
  setCategory,
  categories,
  onRef,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Map your category IDs to emoji icons
  const CATEGORY_ICONS = {
    smileys: "😀",
    gestures: "✋",
    objects: "💻",
    nature: "🌸",
  };

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mx-auto max-w-6xl py-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Search box */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
        <input
          ref={onRef}
          value={value}
          onChange={onChange}
          placeholder="Search emojis by name or vibe… (try: fire, love, party)"
          className="rounded-2xl border border-black/10 dark:border-white/15 p-2 text-sm w-full bg-white/70 dark:bg-white/5 px-9 py-3 placeholder:text-neutral-500 focus:outline-none shadow-xs transition focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600"
        />
      </div>

      {/* Category selector */}
      <div className="flex items-center gap-2 relative" ref={dropdownRef}>
        <div className="hidden sm:block text-xs text-neutral-600 dark:text-neutral-300">
          Category
        </div>

        {/* Dropdown Trigger */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-2xl cursor-pointer bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/10 px-4 py-2 text-sm shadow-xs transition focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600"
        >
          <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
            {CATEGORY_ICONS[category] || "All"}
          </span>

          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-12 min-w-[140px] rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 shadow-lg overflow-hidden z-50"
            >
              {categories.map((c) => {
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setCategory(c.id);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-4 py-2 text-lg transition hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
                      category === c.id
                        ? "bg-neutral-100 dark:bg-neutral-800 font-semibold"
                        : ""
                    }`}
                  >
                    <span>{CATEGORY_ICONS[c.id]}</span>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      {c.label}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
