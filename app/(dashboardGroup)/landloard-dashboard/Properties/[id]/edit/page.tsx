import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getCategories, getProperty } from "@/app/lib/api";
import EditPropertyForm from "./../../../../_components/editPropertyForm";

type EditPropertyPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPropertyPage({
  params,
}: EditPropertyPageProps) {
  const { id } = await params;

  const [propertyResult, categoryResult] = await Promise.all([
    getProperty(id),
    getCategories(),
  ]);

  if (!propertyResult.success || !propertyResult.data) {
    notFound();
  }

  if (!categoryResult.success) {
    return (
      <div className="rounded-xl border bg-card p-6">
        <h1 className="text-2xl font-bold">
          Unable to Load Categories
        </h1>

        <p className="mt-2 text-muted-foreground">
          {categoryResult.message || "Please try again later."}
        </p>

        <Link
          href="/landloard-dashboard/my-properties"
          className="mt-4 inline-block"
        >
          <Button variant="outline">
            <ArrowLeft className="mr-2 size-4" />
            Back to Properties
          </Button>
        </Link>
      </div>
    );
  }

  const property = propertyResult.data;
  const categories = categoryResult.data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Edit Property
          </h1>

          <p className="mt-2 text-muted-foreground">
            Update your property information.
          </p>
        </div>

        <Link href="/landloard-dashboard/my-properties">
          <Button variant="outline">
            <ArrowLeft className="mr-2 size-4" />
            Back to Properties
          </Button>
        </Link>
      </div>

      <EditPropertyForm
        property={property}
        categories={categories}
      />
    </div>
  );
}