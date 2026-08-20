import Link from "next/link";

import { Button } from "@/components/ui/button";
import {getCategories, getProperty,} from "@/app/lib/api";
import EditPropertyForm from './../../../../_components/editPropertyForm';


export default async function EditPropertyPage({params,}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [propertyResult, categoryResult] =
    await Promise.all([
      getProperty(id),
      getCategories(),
    ]);

  const property = propertyResult.data;
  const categories = categoryResult.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Edit Property
          </h1>

          <p className="mt-2 text-gray-500">
            Update your property information.
          </p>
        </div>

        <Link href="/landloard-dashboard/my-properties">
          <Button variant="outline">
            Back
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