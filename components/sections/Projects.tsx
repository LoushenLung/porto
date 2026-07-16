"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects, type ProjectCategory } from "@/lib/data";

const categories: ProjectCategory[] = ["All", "Web", "Mobile", "Design"];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filtered = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="projects" className="py-24 px-6">
      <div ref={ref} className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
            Portfolio
          </p>
          <h2 className="text-3xl font-bold text-[var(--color-primary)] sm:text-4xl">
            Featured Projects
          </h2>
          <p className="mt-3 text-[var(--color-secondary)]">
            A selection of projects I&apos;m proud of
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 flex justify-center gap-2"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={[
                "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                activeCategory === cat
                  ? "bg-[var(--color-accent)] text-white shadow-sm"
                  : "border border-[var(--color-border)] text-[var(--color-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-primary)]",
              ].join(" ")}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={project.featured && i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}
              >
                <ProjectCard
                  project={project}
                  index={i}
                  featured={project.featured && i === 0}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center text-[var(--color-secondary)]"
          >
            No projects in this category yet.
          </motion.p>
        )}
      </div>
    </section>
  );
}
