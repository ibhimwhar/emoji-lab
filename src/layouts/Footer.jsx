const Footer = () => {
  return (
    <footer className="z-40 relative mx-auto max-w-6xl px-4 py-8 text-xs text-neutral-600 dark:text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 border-t border-black/10 dark:border-white/10">
      {/* Left */}
      <p className="text-center sm:text-left">
        Built with ❤️ by{" "}
        <a
          href={
            import.meta.env.VITE_GITHUB_URL || "https://github.com/ibhimwhar"
          }
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-indigo-600"
        >
          Ibhimwhar
        </a>
      </p>

      {/* Middle */}
      <p className="text-center">React + Vite · Tailwind · Emoji Lab</p>

      {/* Right */}
      <span className="opacity-70 text-center sm:text-right">
        <a
          href="https://github.com/ibhimwhar"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline underline-offset-2"
        >
          GitHub
        </a>{" "}
        · {new Date().getFullYear()}
      </span>
    </footer>
  );
};

export default Footer;
