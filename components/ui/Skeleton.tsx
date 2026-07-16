export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={[
        "animate-pulse rounded-md bg-[var(--color-border)]",
        className,
      ].join(" ")}
      aria-hidden="true"
    />
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-6 w-16 rounded-md" />
          <Skeleton className="h-6 w-16 rounded-md" />
          <Skeleton className="h-6 w-16 rounded-md" />
        </div>
        <div className="flex justify-between pt-2">
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}
