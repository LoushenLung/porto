"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { skills } from "@/lib/data";

const categories = ["Frontend", "Backend", "Mobile", "Tools"] as const;

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
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
            Tech Stack
          </p>
          <h2 className="text-3xl font-bold text-[var(--color-primary)] sm:text-4xl">
            Tools I work with
          </h2>
        </motion.div>

        {/* Grouped by category */}
        <div className="flex flex-col gap-12">
          {categories.map((category, catIdx) => {
            const categorySkills = skills.filter((s) => s.category === category);
            if (categorySkills.length === 0) return null;

            return (
              <div key={category}>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                  className="mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-secondary)]"
                >
                  {category}
                </motion.h3>

                <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                  {categorySkills.map((skill, idx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: catIdx * 0.1 + idx * 0.05,
                      }}
                      className="group flex flex-col items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-sm"
                    >
                      <div className="relative h-8 w-8">
                        <Image
                          src={`https://cdn.simpleicons.org/${skill.icon}`}
                          alt={skill.name}
                          fill
                          className="object-contain dark:invert-[0.15]"
                          sizes="32px"
                          unoptimized
                        />
                      </div>
                      <span className="text-center text-xs font-medium text-[var(--color-secondary)] group-hover:text-[var(--color-primary)] transition-colors leading-tight">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
