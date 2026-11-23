
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getProperties } from "@/app/lib/api";
import PropertyGrid from "@/components/properties/propertyGrid";
import { Button } from "@/components/ui/button";

export default async function FeaturedProperties() {
  const result = await getProperties({
    page: "1",
    limit: "6",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const properties = result.data ?? [];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Explore RentNest
          </p>

          <h2 className="text-3xl font-bold tracking-tight">
            Featured Properties
          </h2>

          <p className="mt-2 text-muted-foreground">
            Discover some of our latest rental properties.
          </p>
        </div>

        <Button
          asChild
          variant="outline"
          className="w-fit gap-2"
        >
          <Link href="/property">
            View All Properties
            <ArrowRight size={16} />
          </Link>
        </Button>
      </div>

      {properties.length > 0 ? (
        <PropertyGrid properties={properties.slice(0, 6)} />
      ) : (
        <div className="rounded-xl border border-dashed p-12 text-center">
          <h3 className="text-lg font-semibold">
            No Properties Available
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            New properties will appear here when available.
          </p>
        </div>
      )}
    </section>
  );
}
