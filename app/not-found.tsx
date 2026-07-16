import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-bg)] px-6 text-center">
      {/* Glitchy 404 number */}
      <div className="relative mb-6 select-none">
        <span
          className="block text-[10rem] font-extrabold leading-none tracking-tighter text-[var(--color-border)]"
          aria-hidden="true"
        >
          404
        </span>
        <span className="absolute inset-0 flex items-center justify-center text-[10rem] font-extrabold leading-none tracking-tighter text-[var(--color-accent)] opacity-20 blur-sm">
          404
        </span>
      </div>

      <h1 className="mb-3 text-2xl font-bold text-[var(--color-primary)] sm:text-3xl">
        Page not found
      </h1>
      <p className="mb-8 max-w-sm text-[var(--color-secondary)]">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>

      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-[var(--color-accent)] px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Go home
        </Link>
        <Link
          href="/#projects"
          className="inline-flex h-11 items-center justify-center rounded-lg border border-[var(--color-border)] px-6 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:border-[var(--color-accent)]"
        >
          View projects
        </Link>
      </div>

      {/* Decorative dots grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-border) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
    </main>
  );
}
