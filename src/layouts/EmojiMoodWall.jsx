import { AnimatePresence, motion } from "framer-motion";

const EmojiMoodWall = () => {
  return (
    <section className="my-24 px-4">
      <div className="max-w-7xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Emoji Mood Wall 🎭
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Express yourself! Click an emoji to copy it to your clipboard.
        </p>
      </div>

      <div className="max-w-3xl grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-3 mx-auto">
        <AnimatePresence>
          {[
            "😀",
            "😎",
            "🥰",
            "🤯",
            "😂",
            "😢",
            "🥳",
            "😱",
            "🤩",
            "😡",
            "😴",
            "🤔",
            "😇",
            "🥺",
            "😍",
            "🥵",
            "🥶",
            "😋",
            "🤪",
            "🤫",
            "🤑",
            "🤡",
            "🤠",
            "🐶",
            "🐱",
            "🦄",
            "🦋",
            "🐸",
            "🐼",
            "🐵",
            "🐙",
            "🐍",
            "🍕",
            "🍔",
            "🍣",
            "🍩",
          ].map((_, idx) => (
            <motion.button
              key={idx}
              layout
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group aspect-square rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur grid place-items-center text-xl shadow-sm relative overflow-hidden"
            >
              <span className="drop-shadow-sm select-none group-hover:opacity-30">
                {_}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <p className="text-sm mt-6 text-neutral-500 dark:text-neutral-400 text-center">
        Tip: Create your own emotions to find an emoji!
      </p>
    </section>
  );
};

export default EmojiMoodWall;
