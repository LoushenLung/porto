"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { personalInfo } from "@/lib/data";

// ── Typing animation ──────────────────────────────────────────
function TypingAnimation({ texts }: { texts: string[] }) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPausing, setIsPausing] = useState(false);

  useEffect(() => {
    if (isPausing) return;
    const current = texts[textIndex];
    const speed = isDeleting ? 35 : 75;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < current.length) {
          setDisplayText(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        } else {
          setIsPausing(true);
          setTimeout(() => {
            setIsPausing(false);
            setIsDeleting(true);
          }, 2200);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((i) => (i + 1) % texts.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, isPausing, textIndex, texts]);

  return (
    <span>
      <span className="text-[var(--color-accent)]">{displayText}</span>
      <span
        className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] rounded-sm bg-[var(--color-accent)]"
        style={{ animation: "blink 1s step-end infinite" }}
        aria-hidden="true"
      />
    </span>
  );
}

// ── Social link item ──────────────────────────────────────────
interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

function SocialButton({ href, label, icon, color }: SocialLink) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ y: -3, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`group relative flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-secondary)] transition-colors ${color}`}
    >
      {icon}
      {/* Tooltip */}
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--color-primary)] px-2 py-1 text-xs font-medium text-[var(--color-bg)] opacity-0 transition-opacity group-hover:opacity-100">
        {label}
      </span>
    </motion.a>
  );
}

// ── Animation variants ────────────────────────────────────────
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

// ── Hero ──────────────────────────────────────────────────────
export function Hero() {
  const handleScrollToProjects = () =>
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  const handleScrollDown = () =>
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });

  const socials: SocialLink[] = [
    {
      href: personalInfo.github,
      label: "GitHub",
      icon: <FaGithub size={18} />,
      color: "hover:border-zinc-400 hover:text-zinc-200",
    },
    {
      href: personalInfo.linkedin,
      label: "LinkedIn",
      icon: <FaLinkedin size={18} />,
      color: "hover:border-blue-400 hover:text-blue-400",
    },
    {
      href: `https://wa.me/6285198185229`,
      label: "WhatsApp",
      icon: <FaWhatsapp size={18} />,
      color: "hover:border-green-400 hover:text-green-400",
    },
  ];

  // first name only for hero
  const firstName = personalInfo.name.split(" ")[0];
  const lastName = personalInfo.name.split(" ").slice(1).join(" ");

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* ── Background ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Large blurred orb top-left */}
        <div className="absolute -left-64 -top-64 h-[600px] w-[600px] rounded-full bg-[var(--color-accent)]/8 blur-[120px]" />
        {/* Smaller orb bottom-right */}
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[var(--color-accent)]/6 blur-[80px]" />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-primary) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* ── Content ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-3xl text-center"
      >
        {/* Badge */}
        <motion.div variants={item} className="mb-8 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-1.5 text-sm text-[var(--color-secondary)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Open to opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="mb-4 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-[5rem] lg:leading-[1.05]"
        >
          <span className="text-[var(--color-primary)]">{firstName} </span>
          <span
            className="relative inline-block"
            style={{
              background: "linear-gradient(135deg, var(--color-accent), #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {lastName}
          </span>
        </motion.h1>

        {/* Role */}
        <motion.p
          variants={item}
          className="mb-3 text-base font-medium uppercase tracking-[0.2em] text-[var(--color-secondary)]"
        >
          {personalInfo.role}
        </motion.p>

        {/* Typing tagline */}
        <motion.div
          variants={item}
          className="mb-2 min-h-[2rem] text-xl font-semibold sm:text-2xl"
        >
          <TypingAnimation texts={personalInfo.taglines} />
        </motion.div>

        {/* Location */}
        <motion.p
          variants={item}
          className="mb-8 flex items-center justify-center gap-1.5 text-sm text-[var(--color-secondary)]"
        >
          <MapPin size={13} aria-hidden="true" />
          {personalInfo.location}
        </motion.p>

        {/* Bio */}
        <motion.p
          variants={item}
          className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-[var(--color-secondary)]"
        >
          {personalInfo.bio}
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={item}
          className="mb-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <motion.button
            onClick={handleScrollToProjects}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-7 text-sm font-semibold text-white shadow-lg shadow-[var(--color-accent)]/25 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          >
            View Projects
          </motion.button>

          <motion.a
            href={personalInfo.cvUrl}
            download
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-7 text-sm font-semibold text-[var(--color-primary)] transition-all hover:border-[var(--color-accent)]"
          >
            <Download size={15} />
            Download CV
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={item}
          className="flex items-center justify-center gap-3"
        >
          {socials.map((s) => (
            <SocialButton key={s.label} {...s} />
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.button
        onClick={handleScrollDown}
        aria-label="Scroll to about section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown size={15} />
        </motion.div>
      </motion.button>

      {/* Blink keyframe */}
      <style>{`@keyframes blink { 50% { opacity: 0 } }`}</style>
    </section>
  );
}
