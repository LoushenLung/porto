"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Download, GraduationCap, Layers, Zap, MapPin } from "lucide-react";
import { personalInfo } from "@/lib/data";

// ── Experience highlight cards ────────────────────────────────
const highlights = [
  {
    icon: GraduationCap,
    label: "Pendidikan",
    value: "SMK Telkom Malang",
    sub: "Rekayasa Perangkat Lunak · 2024–2026",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
  {
    icon: Layers,
    label: "Proyek Selesai",
    value: "3+ Proyek",
    sub: "Web, Mobile & Full-Stack",
    color: "text-[var(--color-accent)]",
    bg: "bg-[var(--color-accent)]/10",
  },
  {
    icon: Zap,
    label: "Spesialisasi",
    value: "Full-Stack Dev",
    sub: "Next.js · Node.js · TypeScript",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
];

// ── Soft skills / focus ───────────────────────────────────────
const tags = [
  "Problem Solving",
  "TypeScript",
  "Node.js",
  "Next.js",
  "Database Design",
  "RESTful API",
  "React Native",
  "AI Tools",
  "Git Collaboration",
  "Adaptif",
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// ── Component ─────────────────────────────────────────────────
export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-24 px-6">
      <div ref={ref} className="mx-auto max-w-6xl">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
            About Me
          </p>
          <h2 className="text-3xl font-bold text-[var(--color-primary)] sm:text-4xl">
            Siapa saya?
          </h2>
        </motion.div>

        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">

          {/* ── Left: Photo + tags ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col items-center gap-6 lg:items-start"
          >
            {/* Gradient border photo */}
            <div className="relative mx-auto w-64 sm:w-72 lg:mx-0">
              {/* Outer gradient ring */}
              <div
                aria-hidden="true"
                className="absolute -inset-[3px] rounded-[20px] z-0"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-accent), #818cf8, #34d399)",
                }}
              />
              {/* Inner photo container */}
              <div className="relative z-10 overflow-hidden rounded-[18px] border-2 border-transparent bg-[var(--color-bg)] aspect-square">
                <Image
                  src={personalInfo.avatar}
                  alt={`Foto ${personalInfo.name}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 288px, 288px"
                  priority
                />
              </div>

              {/* Floating status badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 whitespace-nowrap rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-1.5 text-xs font-medium text-[var(--color-primary)] shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative h-2 w-2 rounded-full bg-green-500" />
                </span>
                Available for work
              </div>
            </div>

            {/* Location */}
            <p className="mt-6 flex items-center gap-1.5 text-sm text-[var(--color-secondary)]">
              <MapPin size={13} aria-hidden="true" />
              {personalInfo.location}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs font-medium text-[var(--color-secondary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-primary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Bio + highlights + CTA ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col gap-7"
          >
            {/* Greeting + bio */}
            <div>
              <h3 className="mb-4 text-2xl font-bold text-[var(--color-primary)] sm:text-3xl">
                Halo, saya{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, var(--color-accent), #818cf8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {personalInfo.name}
                </span>{" "}
                👋
              </h3>
              <p className="text-base leading-relaxed text-[var(--color-secondary)]">
                {personalInfo.bio}
              </p>
              <p className="mt-3 text-base leading-relaxed text-[var(--color-secondary)]">
                Saat ini menempuh pendidikan di <strong className="text-[var(--color-primary)]">SMK Telkom Malang</strong> jurusan
                Rekayasa Perangkat Lunak. Saya percaya bahwa kode yang baik bukan
                hanya yang berjalan, tetapi yang mudah dibaca, dipelihara, dan
                dikembangkan lebih lanjut.
              </p>
            </div>

            {/* Experience highlights */}
            <motion.div
              variants={container}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 gap-3 sm:grid-cols-3"
            >
              {highlights.map(({ icon: Icon, label, value, sub, color, bg }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40 hover:shadow-sm"
                >
                  <div className={`mb-3 inline-flex rounded-lg p-2 ${bg}`}>
                    <Icon size={16} className={color} aria-hidden="true" />
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-[var(--color-secondary)]">
                    {label}
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-[var(--color-primary)]">
                    {value}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--color-secondary)] leading-tight">
                    {sub}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <a
                href={personalInfo.cvUrl}
                download
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--color-accent)] px-6 text-sm font-semibold text-white shadow-md shadow-[var(--color-accent)]/20 transition-opacity hover:opacity-90"
              >
                <Download size={15} />
                Download CV
              </a>
              <button
                onClick={() =>
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 text-sm font-semibold text-[var(--color-primary)] transition-all hover:border-[var(--color-accent)]"
              >
                Hubungi Saya
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
