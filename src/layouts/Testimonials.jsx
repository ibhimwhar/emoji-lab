import { motion } from "framer-motion";
import { Star } from "lucide-react";

const Testimonials = () => {
  return (
    <section className="mt-24 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold">Loved by users ❤️</h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Here's what people are saying about Emoji Lab.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {[
          {
            name: "Alex Johnson",
            text: "Emoji Lab makes finding the right emoji so effortless. I use it daily!",
            avatar: "https://i.pravatar.cc/150?img=1",
          },
          {
            name: "Sofia Chen",
            text: "The dark mode looks amazing. And I love being able to save my favorites!",
            avatar: "https://i.pravatar.cc/150?img=2",
          },
          {
            name: "Daniel Kim",
            text: "Clean UI, fast search, and the recents feature is super handy.",
            avatar: "https://i.pravatar.cc/150?img=3",
          },
          {
            name: "Emily Rodriguez",
            text: "Finally an emoji tool that just works. The speed is unmatched!",
            avatar: "https://i.pravatar.cc/150?img=4",
          },
          {
            name: "Marcus Lee",
            text: "Perfect for work chats and social media posts. Absolute game-changer.",
            avatar: "https://i.pravatar.cc/150?img=5",
          },
          {
            name: "Hana Patel",
            text: "Simple, elegant, and powerful. Can't imagine messaging without it now.",
            avatar: "https://i.pravatar.cc/150?img=6",
          },
        ].map((t, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl border border-black/10 dark:border-white/15 bg-white/50 dark:bg-black/30 backdrop-blur hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-10 h-w-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {t.name}
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-neutral-700 dark:text-neutral-200 italic">
              “<span className="text-sm">{t.text}</span>”
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
