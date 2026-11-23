
import Link from "next/link";
import { Home, Search } from "lucide-react";
import GoBackButton from "@/components/shared/go-back-button";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
          <Search className="h-9 w-9" />
        </div>

        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
          Error 404
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Page not found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
          Sorry, we couldn't find the page you're looking for.
          It may have been moved, deleted, or the URL may be incorrect.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>

          <GoBackButton />
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          Need help? Explore available properties on RentNest.
        </p>
      </div>
    </main>
  );
}
