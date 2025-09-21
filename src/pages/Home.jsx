import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

import FAQSupportSection from "../components/FAQSection";
import HeroSection from "../layouts/HeroSection";
import FeaturesSection from "../layouts/FeaturesSection";
import Testimonials from "../layouts/Testimonials";
import EmojiPlayground from "../layouts/EmojiPlayground";
import EmojiMoodWall from "../layouts/EmojiMoodWall";

export default function Home() {
  const containerRef = useRef(null);

  // Track scroll progress for the container relative to page
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Move image up as user scrolls
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-45%"]);

  // ✅ Paragraph carousel state
  const paragraphs = [
    `Whether you're chatting with friends, crafting social media posts,
    or designing content, Emoji Lab makes it effortless to find the
    perfect emoji for every situation. From classic smileys to quirky
    symbols, everything is just a click away.`,

    `Our platform also adapts to your style. With dark mode, vibrant
    gradients, and a smooth interface, using emojis becomes a delightful
    experience. Save your favorites, track your recently used emojis,
    and explore trending picks from around the world.`,

    `We believe that emojis are a universal language. They break
    barriers, convey emotions instantly, and bring fun to communication.
    Emoji Lab empowers you to express yourself fully and creatively,
    every single day.`,

    `Start exploring, find your favorite emojis, and let your messages
    speak louder than words. Emoji Lab is here to make your
    conversations more expressive, enjoyable, and uniquely yours.`,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextParagraph = () => {
    setCurrentIndex((prev) => (prev + 1) % paragraphs.length);
  };

  const prevParagraph = () => {
    setCurrentIndex((prev) => (prev === 0 ? paragraphs.length - 1 : prev - 1));
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection containerRef={containerRef} y={y} />

      {/* Features & Highlights */}
      <FeaturesSection />

      {/* Call to Action */}
      <section className="mt-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center py-16 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-400 text-white shadow-xs relative"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 relative z-10">
            Ready to start exploring emojis?
          </h2>
          <p className="mb-6 text-white/90 relative z-10">
            Join Emoji Lab today and make your conversations more expressive.
          </p>
          <div className="relative z-10">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-20 md:px-28 py-3 rounded-2xl bg-white text-indigo-600 font-semibold hover:bg-neutral-100 transition">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link
                to="/explore"
                className="px-20 md:px-28 py-3 rounded-2xl bg-white text-indigo-600 font-semibold hover:bg-neutral-100 transition"
              >
                Start Exploring
              </Link>
            </SignedIn>
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Live Emoji Ticker */}
      <EmojiPlayground />

      {/* Emoji Fun Facts */}
      <section className="mt-24 px-4">
        <div className="max-w-5xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            Fun Emoji Facts 🎉
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Did you know? Emojis can tell some interesting stories!
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {[
            {
              emoji: "🔥",
              title: "Most Used Today",
              stat: "5,432 times",
              description:
                "Hot emojis are trending across the world right now!",
            },
            {
              emoji: "😂",
              title: "Laughs Shared",
              stat: "12,890 times",
              description: "Emoji Lab has spread over 12k laughs today!",
            },
            {
              emoji: "🥰",
              title: "Love is in the Air",
              stat: "7,654 times",
              description: "Users are sending hearts everywhere",
            },
            {
              emoji: "🍕",
              title: "Foodies Unite",
              stat: "3,212 times",
              description: "Pizza is the ultimate emoji snack favorite",
            },
            {
              emoji: "😎",
              title: "Cool Factor",
              stat: "4,876 times",
              description: "Keeping it chill across chats and posts ",
            },
            {
              emoji: "🤯",
              title: "Mind Blown",
              stat: "2,345 times",
              description: "Surprises and shocking moments all over the globe!",
            },
          ].map((fact, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-6 flex gap-5 items-center rounded-2xl border border-black/10 dark:border-white/15 bg-white/50 dark:bg-black/30 backdrop-blur hover:scale-105 transition-transform"
            >
              <div className="text-5xl">{fact.emoji}</div>
              <h3 className="text-xs w-[50%] font-semibold text-neutral-900 dark:text-neutral-100">
                {fact.title}
              </h3>
              <span className="space-y-2">
                <p className="text-indigo-600 whitespace-nowrap font-bold text-xl">
                  {fact.stat}
                </p>
                <p className="text-xs text-neutral-700 dark:text-neutral-200">
                  {fact.description}
                </p>
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      <FAQSupportSection />

      {/* Dive Deeper Section with Paragraph Carousel */}
      <section className="mt-24 px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            Dive Deeper into Emoji Lab 🚀
          </h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-500 leading-relaxed">
            Emoji Lab is more than just a tool for copying emojis. It's a space
            where creativity meets communication. Every emoji tells a story,
            expresses an emotion, or adds flair to your conversations.
          </p>
        </div>

        <div className="max-w-3xl mx-auto flex gap-4 items-center">
          <button
            onClick={prevParagraph}
            className="p-2 rounded-full border border-black/20 dark:border-white/20 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            <ChevronLeft />
          </button>

          <div className="flex-1 text-center text-sm text-neutral-700 dark:text-neutral-400 leading-relaxed min-h-[120px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
              >
                {paragraphs[currentIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <button
            onClick={nextParagraph}
            className="p-2 rounded-full border border-black/20 dark:border-white/20 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            <ChevronRight />
          </button>
        </div>
      </section>

      {/* Emoji Mood Wall */}
      <EmojiMoodWall />
    </>
  );
}
