"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import type { Project } from "@/lib/data";
import { useRef, useState } from "react";
import { PreviewModal } from "@/components/ui/PreviewModal";

interface ProjectCardProps {
  project: Project;
  index?: number;
  featured?: boolean;
}

export function ProjectCard({ project, index = 0, featured = false }: ProjectCardProps) {
  const [openPreview, setOpenPreview] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={[
        "group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]/50 hover:shadow-lg hover:shadow-[var(--color-accent)]/5",
        featured ? "lg:col-span-2" : "",
      ].join(" ")}
    >
      {/* Thumbnail */}
      <div
        className={[
          "relative overflow-hidden bg-[var(--color-border)]",
          featured ? "aspect-video" : "aspect-video",
        ].join(" ")}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          loading={featured ? "eager" : "lazy"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={featured ? "(max-width: 768px) 100vw, 800px" : "(max-width: 768px) 100vw, 400px"}
        />
        {/* Hover preview: video if available, otherwise previewImage overlay */}
        {project.previewVideo && (
          <video
            // defer loading until hover/focus to save bandwidth
            src={videoSrc}
            ref={videoRef}
            muted
            playsInline
            loop
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
        {!project.previewVideo && project.previewImage && (
          <Image
            src={project.previewImage}
            alt={`${project.title} preview`}
            fill
            loading="lazy"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
        {/* Category badge */}
        <span className="absolute left-4 top-4 rounded-full bg-[var(--color-bg)]/90 px-3 py-1 text-xs font-semibold text-[var(--color-primary)] backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="mb-2 text-lg font-bold text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors">
          {project.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-[var(--color-secondary)] line-clamp-2">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-[var(--color-border)] px-2 py-0.5 text-xs text-[var(--color-secondary)]"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="rounded-md bg-[var(--color-border)] px-2 py-0.5 text-xs text-[var(--color-secondary)]">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source code`}
                onClick={(e) => e.stopPropagation()}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-secondary)] transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <FaGithub size={14} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                onClick={(e) => e.stopPropagation()}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-secondary)] transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
          <div className="flex items-center gap-3">
            {/* Preview button - opens modal with iframe if liveUrl exists */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenPreview(true);
              }}
              onMouseEnter={() => {
                // start loading hover video when user hovers the button
                if (project.previewVideo && !videoSrc) setVideoSrc(project.previewVideo);
              }}
              onFocus={() => {
                if (project.previewVideo && !videoSrc) setVideoSrc(project.previewVideo);
              }}
              className="rounded-md bg-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-secondary)] hover:bg-[var(--color-accent)] hover:text-white transition-colors"
            >
              Preview
            </button>

            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-accent)] hover:gap-2 transition-all"
            >
              Details
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
      <PreviewModal
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        title={project.title}
        src={project.liveUrl}
      />
    </motion.article>
  );
}
