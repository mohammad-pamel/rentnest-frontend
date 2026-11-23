import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getCategories } from "@/app/lib/api";
import CreatePropertyForm from "./../../../_components/createPropertyForm";

export default async function CreatePropertyPage() {
  const categoryData = await getCategories();

  if (!categoryData.success) {
    return (
      <div className="space-y-4 rounded-xl border bg-card p-6">
        <h1 className="text-2xl font-bold">
          Unable to Load Categories
        </h1>

        <p className="text-muted-foreground">
          {categoryData.message || "Please try again later."}
        </p>

        <Link href="/landloard-dashboard/my-properties">
          <Button variant="outline">
            <ArrowLeft className="mr-2 size-4" />
            Back to Properties
          </Button>
        </Link>
      </div>
    );
  }

  const categories = categoryData.data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Add New Property
          </h1>

          <p className="mt-2 text-muted-foreground">
            Create a new rental property.
          </p>
        </div>

        <Link href="/landloard-dashboard/my-properties">
          <Button variant="outline">
            <ArrowLeft className="mr-2 size-4" />
            Back to Properties
          </Button>
        </Link>
      </div>

      {categories.length === 0 ? (
        <div className="rounded-xl border bg-card p-6">
          <p className="text-muted-foreground">
            No property categories are available yet. Please contact the administrator.
          </p>
        </div>
      ) : (
        <CreatePropertyForm categories={categories} />
      )}
    </div>
  );
}