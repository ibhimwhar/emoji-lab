// import Image from "../assets/developer.png";
import { Fingerprint } from "lucide-react";
import Image from "../assets/404_BackgroundImage.png";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="min-h-screen mx-auto max-w-4xl px-4 pb-20 text-center">
      <img
        src={Image}
        alt="404 background image"
        className="w-full object-cover md:h-[50vh] dark:opacity-80"
      />

      <h2 className="text-4xl mb-12 font-bold text-neutral-900 dark:text-neutral-100">
        Page Not Found
      </h2>

      <Link to={"/"}>
        <button className="rounded-full border border-black/10 dark:border-white/15 p-3 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5 transition">
          <Fingerprint size={18} />
        </button>
      </Link>

      <p className="text-sm mt-6 text-neutral-500 dark:text-neutral-400 text-center">
        Tip: Create your own emotions to find an emoji!
      </p>
    </section>
  );
};

export default NotFoundPage;
