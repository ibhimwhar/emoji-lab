import { motion } from "framer-motion";
import { Copy } from "lucide-react";

export default function EmojiTile({ emoji, onCopy }) {
  return (
    <motion.button
      layout
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onCopy}
      className="group aspect-square rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur grid place-items-center text-3xl sm:text-4xl shadow-sm relative overflow-hidden"
    >
      <span className="drop-shadow-sm select-none group-hover:opacity-30">
        {emoji.char}
      </span>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all text-[10px] sm:text-xs text-neutral-700 dark:text-neutral-200/90 bg-gradient-to-t from-black/5 to-transparent p-2 text-center">
        {emoji.name}
      </div>

      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition">
        <div className="rounded-xl bg-black/70 text-white p-1 grid place-items-center">
          <Copy className="h-3.5 w-3.5" />
        </div>
      </div>
    </motion.button>
  );
}
