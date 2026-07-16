"use client";

import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { personalInfo } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-[var(--color-secondary)]">
          © {year}{" "}
          <span className="text-[var(--color-primary)] font-medium">
            {personalInfo.name}
          </span>
          . Built with Next.js & Tailwind CSS.
        </p>

        <div className="flex items-center gap-4">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors"
          >
            <FaGithub size={18} />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href={personalInfo.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X"
            className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors"
          >
            <FaXTwitter size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
