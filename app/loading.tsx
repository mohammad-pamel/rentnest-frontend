
function Skeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-muted ${className ?? ""}`}
    />
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen w-full">
      {/* Header Skeleton */}
      <header className="border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Skeleton className="h-8 w-32" />

          <div className="hidden items-center gap-6 md:flex">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>

          <Skeleton className="h-9 w-24" />
        </div>
      </header>

      <main className="container mx-auto space-y-8 px-4 py-8">
        {/* Page Heading */}
        <section className="space-y-3">
          <Skeleton className="h-9 w-64 max-w-full" />
          <Skeleton className="h-4 w-80 max-w-full" />
        </section>

        {/* Search / Filter Skeleton */}
        <section className="grid grid-cols-1 gap-3 rounded-xl border border-border p-4 sm:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-11 w-full" />
        </section>

        {/* Property Cards */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-8 w-24" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-border"
              >
                <Skeleton className="h-48 w-full rounded-none" />

                <div className="space-y-4 p-4">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />

                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>

                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
