import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Favorites from "./pages/Favorites";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { Check } from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";
import NotFoundPage from "./pages/NotFound";

export default function App() {
  const [chaos, setChaos] = useState(false);
  const [copied, setCopied] = useState(null);

  return (
    <div
      className={`bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 overflow-x-hidden`}
    >
      {/* Background gradients  // -z-10 */}
      <div
        aria-hidden
        className={`fixed inset-0 transition-all duration-700 ${
          chaos
            ? "bg-[radial-gradient(1200px_600px_at_10%_-10%,#a78bfa40,transparent),radial-gradient(900px_500px_at_110%_20%,#22d3ee30,transparent),radial-gradient(800px_400px_at_50%_120%,#f472b650,transparent)] blur-2xl"
            : "bg-[radial-gradient(900px_500px_at_20%_-10%,#a78bfa20,transparent),radial-gradient(800px_400px_at_80%_10%,#22d3ee20,transparent)]"
        }`}
      />
      <Header chaos={chaos} setChaos={setChaos} />
      <main
        className={`pt-28 text-neutral-900 dark:text-neutral-100 transition-colors ${
          chaos ? "animate-[pulse_8s_infinite]" : ""
        }`}
      >
        <div className="z-40 relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/explore"
              element={<Explore setCopied={setCopied} />}
            />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
      <Footer />
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="fixed z-40 bottom-5 right-5 rounded-full bg-neutral-900 text-white text-sm px-4 py-2 shadow-2xl/50 flex items-center gap-2"
          >
            <Check className="h-4 w-4" /> Copied {copied} to clipboard
          </motion.div>
        )}
      </AnimatePresence>

      {/* <div className="fixed z-40 bottom-8 right-8 ld:bottom-20 ld:right-20 grid gap-6 place-items-end">
        <div className="w-[40vh] rounded-xl bg-white dark:bg-black border border-black/10 dark:border-white/15 p-4 text-sm text-neutral-700 dark:text-neutral-200">
          <h1> Hello World</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero,
            modi rerum asperiores eos placeat corporis, culpa quas assumenda
            dicta quam labore animi laboriosam voluptatibus quia distinctio odio
            quaerat, fuga nihil. quaerat, fuga nihil. quaerat, fuga nihil.
            quaerat, fuga nihil. quaerat, fuga nihil.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-lg bg-white dark:bg-black border border-black/10 dark:border-white/15 p-2 text-xs text-neutral-700 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5 transition">
            <Instagram size={16} />
          </button>
          <button className="rounded-lg bg-white dark:bg-black border border-black/10 dark:border-white/15 p-2 text-xs text-neutral-700 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5 transition">
            <Github size={16} />
          </button>
          <button className="rounded-full bg-white dark:bg-black border border-black/10 dark:border-white/15 p-3 text-xs text-neutral-700 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5 transition">
            <MessageCircle size={16} />
          </button>
        </div>
      </div> */}

      {/* <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-white dark:bg-neutral-900 shadow-md p-4"
          >
            <input
              type="text"
              placeholder="Search emojis..."
              className="w-full p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent outline-none"
            />
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  );
}
