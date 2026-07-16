"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { personalInfo } from "@/lib/data";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[var(--color-bg)]/80 backdrop-blur-md border-b border-[var(--color-border)]"
            : "bg-transparent",
        ].join(" ")}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#hero");
            }}
            className="text-lg font-bold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            {personalInfo.name.split(" ")[0]}
            <span className="text-[var(--color-accent)]">.</span>
          </motion.a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>

          {/* Right side: theme toggle + mobile menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-accent)] transition-all"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-secondary)]"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left py-3 text-base font-medium text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors border-b border-[var(--color-border)] last:border-0"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
