import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Send } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

/* FAQ + Contact Support Section */
const FAQSupportSection = () => {
  const faqs = [
    {
      question: "What is Emoji Lab?",
      answer: `Emoji Lab is a modern playground for discovering, searching, and copying emojis with ease. 
            It's designed to make your messaging more expressive and fun, whether you're chatting with friends,
            posting on social media, or designing creative content. Every emoji is categorized and searchable, 
            allowing you to find exactly what fits your mood or message. Beyond just copying emojis, 
            Emoji Lab provides tools like recent history, favorites, and trending picks from around the world. 
            With its smooth interface, dark mode, and colorful gradients, Emoji Lab transforms the way you interact with emojis.`,
    },
    {
      question: "Do I need an account to use it?",
      answer: `You don't need an account to explore emojis and copy them instantly; the platform is fully accessible to everyone. 
            However, signing in provides a more personalized experience. You can save your favorite emojis, access them across devices, 
            and quickly view your recently used ones. Accounts also allow for syncing preferences such as themes and dark mode. 
            This makes Emoji Lab feel tailored to you, ensuring that the emojis you love are always easy to find. 
            Even without an account, the essential functionality remains fully available.`,
    },
    {
      question: "How do I copy an emoji?",
      answer: `Copying an emoji in Emoji Lab is as simple as a single click. Each emoji tile is interactive; when you click on one, 
            it's immediately copied to your clipboard for use anywhere—chat apps, social media, or documents. 
            You don't need to perform any extra steps or use complex shortcuts. 
            Additionally, recently copied emojis are tracked so you can quickly reuse them without searching again. 
            This feature makes sending emojis fast, convenient, and seamless across all platforms.`,
    },
    {
      question: "Can I switch themes?",
      answer: `Yes! Emoji Lab offers multiple theme options to fit your style and environment. 
            You can switch between light and dark modes depending on your preference or ambient lighting. 
            For an extra touch of flair, colorful gradient backgrounds are also available. 
            Theme changes apply instantly across the entire platform, ensuring a smooth and visually pleasing experience. 
            Customization options allow you to create a unique vibe while exploring and using emojis, making your interactions more personal.`,
    },
    {
      question: "Is Emoji Lab free?",
      answer: `Absolutely! Emoji Lab is completely free to use for all core features, allowing anyone to search, copy, and explore emojis. 
            There are no hidden costs for accessing the main tools, including trending emojis, recent history, and favorites. 
            We believe that expressing yourself with emojis should be accessible to everyone, whether casual users or professional creators. 
            While some advanced features may be introduced in the future, the primary functionality will always remain free. 
            Enjoy unlimited emoji fun without worrying about subscriptions or fees.`,
    },
  ];

  const { isLoaded, isSignedIn, user } = useUser();

  const UserName = user?.firstName || "";
  const UserEmail = user?.primaryEmailAddress?.emailAddress || "";

  const [openIndexes, setOpenIndexes] = useState([]);
  const [formData, setFormData] = useState({
    name: UserName,
    email: UserEmail,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setFormData({
        name: user.firstName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
        message: "",
      });
    }
  }, [isLoaded, isSignedIn, user]);

  const toggleFAQ = (idx) => {
    if (openIndexes.includes(idx)) {
      setOpenIndexes(openIndexes.filter((i) => i !== idx));
    } else {
      setOpenIndexes([...openIndexes, idx]);
    }
  };

  const openAll = () => setOpenIndexes(faqs.map((_, idx) => idx));
  const closeAll = () => setOpenIndexes([]);
  const allOpen = openIndexes.length === faqs.length;

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="mt-24 px-4">
      {/* FAQs */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Frequently Asked Questions ❓
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Answers to common questions about Emoji Lab.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4 mb-16 grid place-items-end">
        {/* Open All / Close All */}
        <button
          onClick={allOpen ? closeAll : openAll}
          className="bg-white/30 dark:bg-black/10 border border-black/10 dark:border-white/15 rounded-2xl py-3 px-4 font-semibold text-xs flex gap-3 items-center"
        >
          {allOpen ? "Close All" : "Open All"}
          <motion.div
            animate={{ rotate: allOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Plus size={16} />
          </motion.div>
        </button>

        {/* FAQ Items */}
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="border w-full border-black/10 dark:border-white/15 rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(idx)}
              className="w-full flex justify-between items-center p-4 text-left bg-white/50 dark:bg-black/20 backdrop-blur hover:bg-white/60 dark:hover:bg-black/30 transition"
            >
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: openIndexes.includes(idx) ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={20} />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndexes.includes(idx) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 leading-relaxed bg-white/30 dark:bg-black/10 text-neutral-700 dark:text-neutral-200 text-sm"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Need More Help? 📩
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Reach out to our support team and we'll get back to you shortly.
        </p>

        <div className="mt-14 grid gap-6 md:flex justify-between">
          <div className="text-left md:w-[35%]">
            <h3 className="text-xl font-semibold mb-2">Get in Touch</h3>
            <p className="text-sm break-all text-neutral-700 dark:text-neutral-300 mb-4">
              Sign up with Clerk to securely send us your message. Clerk
              protects your information while making it easy to receive replies
              directly to your email. Whether you have questions, feedback, or
              suggestions, your messages are handled safely and efficiently.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="grid gap-4 sm:grid-cols-2 sm:gap-6 md:w-[50%]"
          >
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="text-sm col-span-2 sm:col-span-1 p-3 rounded-xl border border-black/10 dark:border-white/15 bg-white/50 dark:bg-black/20 text-neutral-900 dark:text-neutral-100 outline-none focus:ring-2 focus:ring-indigo-600 transition"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="text-sm col-span-2 sm:col-span-1 p-3 rounded-xl border border-black/10 dark:border-white/15 bg-white/50 dark:bg-black/20 text-neutral-900 dark:text-neutral-100 outline-none focus:ring-2 focus:ring-indigo-600 transition"
            />
            <textarea
              placeholder="Your Message"
              value={formData.message}
              rows={8}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
              className="text-sm col-span-2 p-3 rounded-xl border border-black/10 dark:border-white/15 bg-white/50 dark:bg-black/20 text-neutral-900 dark:text-neutral-100 outline-none focus:ring-2 focus:ring-indigo-600 transition"
            />
            <button
              type="submit"
              className="text-sm col-span-2 flex items-center justify-center gap-2 px-6 py-3 text-white rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700 transition"
            >
              Send Message <Send size={18} />
            </button>
          </form>
        </div>
        {submitted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-green-500 text-right font-medium"
          >
            Your message has been sent!
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default FAQSupportSection;
