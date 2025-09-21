import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Fan,
  Github,
  LogOut,
  Menu,
  Sparkles,
  Sun,
  X,
  Search,
  Moon,
} from "lucide-react";
import { useContextValue } from "./Context";
import { useEffect, useRef, useState } from "react";
import { useScroll, motion, AnimatePresence } from "framer-motion";
import {
  SignedIn,
  SignedOut,
  SignOutButton,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

// Reusable Icon Button
const IconButton = ({ children, onClick, className = "", ...props }) => (
  <button
    onClick={onClick}
    className={`rounded-lg border border-black/10 dark:border-white/15 p-2 text-xs text-neutral-700 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5 transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Header = ({ chaos, setChaos }) => {
  const { toggleDarkMode, theme } = useContextValue();
  const [mobileMenu, setMobileMenu] = useState(false);
  const menuRef = useRef();
  const location = useLocation().pathname;
  const { scrollYProgress } = useScroll();

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "Explore", href: "/explore" },
    { title: "Favorites", href: "/favorites" },
  ];

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigate = useNavigate();

  const handleSearchClick = () => {
    // Navigate to /explore and pass state to trigger input focus
    navigate("/explore", { state: { focusSearch: true } });
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 backdrop-blur ${
        mobileMenu
          ? "bg-white dark:bg-black"
          : "supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/70"
      } border-b border-neutral-200 dark:border-neutral-900 shadow-xs`}
    >
      <div className="mx-auto max-w-7xl px-4 py-3 flex justify-between items-center gap-6">
        {/* Logo */}
        <Link to={"/"}>
          <h1 className="font-bold text-xl flex items-end">
            <span>Emoji</span>
            <Sparkles size={12} />
            <span>Lab</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex mr-auto gap-6 text-sm sm:text-base">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              to={link.href}
              className={`${
                location === link.href
                  ? "font-semibold text-indigo-600"
                  : "text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white"
              } transition text-sm`}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-2">
          {/* Search toggle */}
          <IconButton onClick={handleSearchClick}>
            <Search size={16} />
          </IconButton>

          {/* Chaos toggle */}
          <IconButton onClick={() => setChaos((prev) => !prev)}>
            <Fan
              size={16}
              className={chaos ? "animate-spin duration-1000" : ""}
            />
          </IconButton>

          {/* Dark mode toggle */}
          <IconButton onClick={toggleDarkMode}>
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </IconButton>

          {/* GitHub */}
          <a
            href="https://github.com/ibhimwhar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton>
              <Github size={16} />
            </IconButton>
          </a>

          {/* Auth: Sign in / User button */}
          <SignedOut>
            <SignInButton mode="modal">
              <IconButton>Sign in</IconButton>
            </SignInButton>
          </SignedOut>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2">
          <IconButton
            onClick={() => setMobileMenu((p) => !p)}
            className="md:hidden"
          >
            {mobileMenu ? <X size={16} /> : <Menu size={16} />}
          </IconButton>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox:
                    "w-8 h-8 border border-black/10 dark:border-white/15",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            ref={menuRef}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full w-full bg-white dark:bg-black border-y border-neutral-200 dark:border-neutral-900 shadow-xs md:hidden p-6 z-40"
          >
            {/* Quick Links */}
            <div className="flex flex-col gap-4 mb-8">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.href}
                  onClick={() => setMobileMenu(false)}
                  className={`${
                    location === link.href
                      ? "font-semibold text-indigo-600"
                      : "text-neutral-700 dark:text-neutral-300 hover:text-indigo-600"
                  } transition text-sm`}
                >
                  {link.title}
                </Link>
              ))}
            </div>

            {/* Socials + Controls */}
            <div className="flex gap-3">
              {/* Search toggle */}
              <IconButton
                onClick={() => {
                  handleSearchClick();
                  setMobileMenu(false);
                }}
              >
                <Search size={16} />
              </IconButton>

              <a
                href="https://github.com/ibhimwhar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton className="w-full">
                  <Github size={16} />
                </IconButton>
              </a>
              <IconButton
                onClick={() => {
                  setChaos((p) => !p);
                  setMobileMenu(false);
                }}
                className="flex-1 flex gap-2 justify-center items-center"
              >
                <Fan
                  size={16}
                  className={chaos ? "animate-spin duration-1000" : ""}
                />
                <span className="text-xs uppercase font-bold">
                  {chaos ? "On" : "Off"}
                </span>
              </IconButton>
            </div>

            {/* Sign in / Sign out (Mobile) */}
            <div className="mt-6 flex items-center gap-3">
              <SignedOut>
                <SignInButton mode="modal">
                  <IconButton className="w-full">Sign in</IconButton>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <SignOutButton>
                  <IconButton className="w-full flex items-center justify-center gap-2">
                    <LogOut size={16} /> Sign Out
                  </IconButton>
                </SignOutButton>
              </SignedIn>
              {/* Dark mode toggle */}
              <IconButton onClick={toggleDarkMode}>
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </IconButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress line */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          originX: 0,
          height: 1,
        }}
        className="w-full bg-gradient-to-r from-indigo-600 to-cyan-400 opacity-45"
      />
    </header>
  );
};

export default Header;
