import { motion } from "framer-motion";

const EmojiPlayground = () => {
  return (
    <section className="mt-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Emoji Playground 🎡
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Explore trending emojis, categories, and quickly copy your favorites
        </p>
      </div>
      <div className="mt-6 max-w-5xl mx-auto border border-black/10 dark:border-white/15 rounded-2xl overflow-hidden bg-transparent p-4 relative">
        <motion.div
          className="flex gap-6 text-2xl select-none"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {[
            "😀",
            "😂",
            "🥰",
            "😎",
            "🤯",
            "😴",
            "💖",
            "🎉",
            "🔥",
            "🍕",
            "🌈",
            "⚡",
            "🌟",
            "💯",
            "🎶",
            "🫶",
          ].map((emoji, idx) => (
            <span key={idx} className="inline-block">
              {emoji}
            </span>
          ))}
          {/* Duplicate emojis for seamless loop */}
          {[
            "😀",
            "😂",
            "🥰",
            "😎",
            "🤯",
            "😴",
            "💖",
            "🎉",
            "🔥",
            "🍕",
            "🌈",
            "⚡",
            "🌟",
            "💯",
            "🎶",
            "🫶",
          ].map((emoji, idx) => (
            <span key={`dup-${idx}`} className="inline-block">
              {emoji}
            </span>
          ))}
        </motion.div>
        <p className="absolute bottom-2 right-4 text-xs text-neutral-700 dark:text-neutral-300">
          Trending Emojis
        </p>
      </div>
    </section>
  );
};

export default EmojiPlayground;
