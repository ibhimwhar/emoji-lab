import { motion } from "framer-motion";

const FeaturesSection = () => {
  return (
    <section className="mt-24 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Features & Highlights ✨
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Explore what makes Emoji Lab so fun and intuitive
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {[
          {
            emoji: "🔥",
            title: "Trending Emojis",
            description:
              "Discover the hottest emojis used worldwide right now.",
          },
          {
            emoji: "💾",
            title: "Save Favorites",
            description:
              "Quickly save and organize your favorite emojis for easy access.",
          },
          {
            emoji: "🌈",
            title: "Colorful Themes",
            description:
              "Switch between dark mode, light mode, and vibrant gradients.",
          },
          {
            emoji: "⚡",
            title: "Lightning Fast Search",
            description:
              "Find the perfect emoji instantly with smart suggestions.",
          },
          {
            emoji: "🖼️",
            title: "Emoji Previews",
            description:
              "See how emojis look in different styles before copying them.",
          },
          {
            emoji: "🎉",
            title: "Fun & Interactive",
            description:
              "Enjoy playful animations and interactive UI elements.",
          },
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 flex gap-6 items-center rounded-2xl border border-black/10 dark:border-white/15 bg-white/50 dark:bg-black/30 backdrop-blur hover:scale-105 transition-transform"
          >
            <div className="text-2xl p-3 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur shadow-sm">
              {feature.emoji}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-xs text-neutral-700 dark:text-neutral-200">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
