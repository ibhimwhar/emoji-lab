export default function EmojiChip({ char, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-2 text-lg hover:scale-105 transition shadow-sm"
    >
      {char}
    </button>
  );
}
