export default function GridStats({ count }) {
  return (
    <div className="mt-10 flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
      <span>
        Showing{" "}
        <b className="text-neutral-800 dark:text-neutral-200">{count}</b> emojis
      </span>
      <span className="hidden sm:inline">
        Tip: Hold{" "}
        <kbd className="px-1.5 py-0.5  border border-black/10 dark:border-white/15 rounded">
          Ctrl
        </kbd>{" "}
        /{" "}
        <kbd className="px-1.5 py-0.5  border border-black/10 dark:border-white/15 rounded">
          Cmd
        </kbd>{" "}
        +{" "}
        <kbd className="px-1.5 py-0.5  border border-black/10 dark:border-white/15 rounded">
          K
        </kbd>{" "}
        to jump to search
      </span>
    </div>
  );
}
