import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Bar_Image from "../assets/bar_image.png";

const HeroSection = ({ containerRef, y }) => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-32 text-center">
      <motion.h1
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-5xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100 drop-shadow-md"
      >
        Welcome to{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-400">
          Emoji Lab
        </span>{" "}
        ✨
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 sm:text-lg text-black/70 dark:text-white/70 max-w-2xl mx-auto"
      >
        Discover, search, and copy emojis with ease. Customize your vibe with
        dark mode, gradients, and personalized emoji history.
      </motion.p>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex justify-center gap-4"
      >
        <Link
          to="/explore"
          className="rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-400 transition-all text-white px-6 py-3 text-sm hover:opacity-90"
        >
          Explore Emojis 🚀
        </Link>
        <Link
          to="/about"
          className="rounded-2xl border border-black/10 dark:border-white/15 px-6 py-3 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5 transition"
        >
          Learn More
        </Link>
      </motion.div>

      {/* Scroll showcase */}
      <div
        ref={containerRef}
        className="mt-16 lg:w-[800px] h-[400px] lg:h-[600px] overflow-hidden mx-auto border border-black/10 dark:border-white/15 p-3 md:p-6 text-sm text-neutral-700 dark:text-neutral-200 bg-black/5 dark:bg-white/5 transition rounded-2xl"
      >
        <motion.img
          src={Bar_Image}
          alt="Emoji preview"
          style={{ y }}
          className="rounded-2xl border border-black/10 dark:border-white/15 object-top object-cover w-full h-[150%]"
        />
      </div>
    </section>
  );
};

export default HeroSection;
