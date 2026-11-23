
import { Property } from "@/app/lib/api";
import PropertyCard from "../home/propertyCard";
import { Home } from "lucide-react";

interface PropertyGridProps {
  properties: Property[];
}

export default function PropertyGrid({
  properties,
}: PropertyGridProps) {
  if (!properties || properties.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 px-4 py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
          <Home className="h-8 w-8" />
        </div>

        <h3 className="mt-5 text-xl font-semibold text-foreground">
          No Properties Found
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          We couldn't find any properties matching your search.
          Try changing your filters or search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
