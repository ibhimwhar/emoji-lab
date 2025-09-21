import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Wand2, History, ChevronsDown } from "lucide-react";

import EmojiTile from "../components/EmojiTile";
import EmojiChip from "../components/EmojiChip";
import GridStats from "../components/GridStats";
import SearchInput from "../components/SearchInput";

import { EMOJI_CATEGORIES } from "../utils/emojiData";
import { useDebounced } from "../utils/helpers";
import { useLocation } from "react-router-dom";

export default function Explore({ setCopied }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [recents, setRecents] = useState(
    JSON.parse(localStorage.getItem("emoji-recents")) || []
  );
  const [visibleCount, setVisibleCount] = useState(50);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);
  const location = useLocation();

  // Focus input on mount or if navigated from search
  useEffect(() => {
    if (location.state?.focusSearch) {
      inputRef.current?.focus();
      window.history.replaceState({}, "");
    } else {
      inputRef.current?.focus();
    }
  }, [location]);

  // Persist recents
  useEffect(
    () => localStorage.setItem("emoji-recents", JSON.stringify(recents)),
    [recents]
  );

  // Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const debouncedQuery = useDebounced(query);

  // Build dataset (no skin type)
  const dataset = useMemo(() => {
    const items = [];
    for (const cat of EMOJI_CATEGORIES) {
      for (const e of cat.emojis) {
        items.push({ ...e, char: e.char, category: cat.id });
      }
    }
    return items;
  }, []);

  // Filter emojis
  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    return dataset.filter(
      (e) =>
        (!q ||
          e.name.toLowerCase().includes(q) ||
          e.keywords?.some((k) => k.includes(q))) &&
        (category === "all" || e.category === category)
    );
  }, [dataset, debouncedQuery, category]);

  // Reset visible count when query or category changes
  useEffect(() => setVisibleCount(50), [debouncedQuery, category]);

  // Lazy load on main page scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 300;
      if (
        scrollPosition >= threshold &&
        visibleCount < filtered.length &&
        !loading
      ) {
        setLoading(true);
        setTimeout(() => {
          setVisibleCount((prev) => Math.min(prev + 50, filtered.length));
          setLoading(false);
        }, 300);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filtered, visibleCount, loading]);

  // Copy emoji
  const copyEmoji = async (emoji) => {
    try {
      await navigator.clipboard.writeText(emoji.char);
      setCopied(emoji.char);
      setTimeout(() => setCopied(null), 1800);
      setRecents((prev) =>
        [emoji.char, ...prev.filter((c) => c !== emoji.char)].slice(0, 18)
      );
    } catch {}
  };

  const categories = [
    { id: "all", label: "All" },
    ...EMOJI_CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <SearchInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onRef={inputRef}
        category={category}
        setCategory={setCategory}
        categories={categories}
      />

      {/* Category buttons */}
      <div className="md:mx-8 flex gap-2 mb-2 overflow-x-auto hide-scrollbar">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`shrink-0 rounded-2xl px-3 py-1.5 text-xs sm:text-sm transition ${
              category === c.id
                ? "bg-gradient-to-r px-5 from-indigo-600/90 to-cyan-400/90 text-white border-transparent"
                : "border bg-white/70 dark:bg-white/5 border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/10"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Recents */}
      {recents?.length > 0 && (
        <div className="md:mx-8 mt-10">
          <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 mb-2">
            <History className="h-3.5 w-3.5" /> Recently used
          </div>
          <div className="flex flex-wrap gap-2">
            {recents.map((c) => (
              <EmojiChip
                key={c}
                char={c}
                onClick={() => copyEmoji({ char: c })}
              />
            ))}
          </div>
        </div>
      )}

      <GridStats count={filtered.length} />

      {/* Emoji grid */}
      <div
        className={`relative pt-6 px-1 grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-3 ${
          filtered.length <= visibleCount ? "min-h-screen" : ""
        }`}
        style={{
          WebkitMask:
            "linear-gradient(to bottom, black 0%, black 95%, transparent 100%) no-repeat 100% 100%",
          mask: "linear-gradient(to bottom, black 0%, black 95%, transparent 100%) no-repeat 100% 100%",
        }}
      >
        <AnimatePresence>
          {filtered.slice(0, visibleCount).map((e, idx) => (
            <EmojiTile
              key={`${e.char}-${e.name}-${idx}`}
              emoji={e}
              onCopy={() => copyEmoji(e)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Loading */}
      {loading && (
        <motion.div
          className="col-span-full text-center text-sm text-neutral-500 py-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Loading more emojis...
        </motion.div>
      )}

      {/* Scroll down button */}
      {visibleCount < filtered.length && (
        <button
          onClick={() => window.scrollBy({ top: 300, behavior: "smooth" })}
          className="fixed right-6 bottom-6 lg:right-12 lg:bottom-12 bg-white dark:bg-black w-12 h-12 flex items-center justify-center rounded-full border border-black/20 dark:border-white/20 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
        >
          <ChevronsDown />
        </button>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="mt-16 min-h-screen text-center text-neutral-600 dark:text-neutral-400">
          <Wand2 className="mx-auto mb-2" />
          Nothing found. Try a different vibe.
        </div>
      )}
    </div>
  );
}
