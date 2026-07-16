"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="py-24 px-6 bg-[var(--color-surface)] border-y border-[var(--color-border)]"
    >
      <div ref={ref} className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
            Testimonials
          </p>
          <h2 className="text-3xl font-bold text-[var(--color-primary)] sm:text-4xl">
            What people say
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6"
            >
              <Quote
                size={24}
                className="mb-4 text-[var(--color-accent)]/40"
                aria-hidden="true"
              />
              <p className="mb-6 text-sm leading-relaxed text-[var(--color-secondary)]">
                &ldquo;{t.content}&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-primary)]">
                    {t.name}
                  </p>
                  <p className="text-xs text-[var(--color-secondary)]">
                    {t.role} · {t.company}
                  </p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
