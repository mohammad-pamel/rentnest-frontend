
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Skeleton className="mb-3 h-4 w-36" />
      <Skeleton className="mb-3 h-10 w-72" />
      <Skeleton className="mb-8 h-5 w-96 max-w-full" />

      {/* Search Filter Skeleton */}
      <div className="mb-10 rounded-2xl border p-6">
        <Skeleton className="mb-6 h-8 w-52" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>

      {/* Property Cards Skeleton */}
      <div className="mb-6 flex justify-between">
        <Skeleton className="h-7 w-52" />
        <Skeleton className="h-5 w-32" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border"
          >
            <Skeleton className="h-56 w-full rounded-none" />

            <div className="space-y-4 p-5">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
