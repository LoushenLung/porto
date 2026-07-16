import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects } from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params at build time
export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Project`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  const related = projects
    .filter((p) => p.slug !== slug && p.category === project.category)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[var(--color-bg)] pb-24">
      {/* Back button */}
      <div className="mx-auto max-w-4xl px-6 pt-10">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to projects
        </Link>
      </div>

      {/* Hero image */}
      <div className="relative mx-auto mb-12 max-w-5xl px-6">
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1000px"
          />
        </div>
      </div>

      {/* Content */}
      <article className="mx-auto max-w-4xl px-6">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            {/* Category badge */}
            <span className="mb-3 inline-block rounded-full bg-[var(--color-accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-accent)]">
              {project.category}
            </span>
            <h1 className="text-3xl font-bold text-[var(--color-primary)] sm:text-4xl">
              {project.title}
            </h1>
          </div>

          {/* Action links */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 text-sm font-medium text-[var(--color-secondary)] transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <FaGithub size={14} />
                Source Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-[var(--color-accent)] px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="mb-8 text-base leading-relaxed text-[var(--color-secondary)] sm:text-lg">
          {project.longDescription}
        </p>

        {/* Tech Stack */}
        <div className="mb-12">
          <h2 className="mb-4 text-lg font-semibold text-[var(--color-primary)]">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-sm font-medium text-[var(--color-secondary)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Related Projects */}
        {related.length > 0 && (
          <section>
            <h2 className="mb-6 text-xl font-bold text-[var(--color-primary)]">
              More {project.category} Projects
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/projects/${rel.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all hover:-translate-y-1 hover:border-[var(--color-accent)]/50"
                >
                  <div className="relative aspect-video overflow-hidden bg-[var(--color-border)]">
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="300px"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors text-sm">
                      {rel.title}
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-secondary)] line-clamp-1">
                      {rel.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
