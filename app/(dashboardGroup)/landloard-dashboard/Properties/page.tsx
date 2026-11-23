import Link from "next/link";
import { PlusCircle } from "lucide-react";

import type { Property } from "@/app/lib/api";
import { Button } from "@/components/ui/button";

import { getMyPropertiesAction } from "../../_actions/propertyActions";
import PropertyManageCard from "../../_components/propertyManageCard";

export default async function MyPropertiesPage() {
  const result = await getMyPropertiesAction();

  if (!result.success) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            My Properties
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage your rental properties.
          </p>
        </div>

        <div className="rounded-xl border border-destructive/30 bg-card p-6">
          <p className="text-destructive">
            {result.message || "Failed to load your properties."}
          </p>
        </div>
      </div>
    );
  }

  const properties: Property[] = result.data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            My Properties
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage your rental properties.
          </p>
        </div>

        <Link href="/landloard-dashboard/Properties/create">
          <Button>
            <PlusCircle className="mr-2 size-4" />
            Add New Property
          </Button>
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="rounded-xl border bg-card p-10 text-center">
          <h2 className="text-xl font-semibold">
            No Properties Found
          </h2>

          <p className="mt-2 text-muted-foreground">
            You have not created any property yet.
          </p>

          <Link
            href="/landloard-dashboard/Properties/create"
            className="mt-5 inline-block"
          >
            <Button>
              <PlusCircle className="mr-2 size-4" />
              Create Your First Property
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            Total Properties: {properties.length}
          </p>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {properties.map((property) => (
              <PropertyManageCard
                key={property.id}
                property={property}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}