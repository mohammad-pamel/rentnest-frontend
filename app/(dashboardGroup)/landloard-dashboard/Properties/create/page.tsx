import Link from "next/link";

import { Button } from "@/components/ui/button";
import {getCategories,} from "@/app/lib/api";
import CreatePropertyForm from './../../../_components/createPropertyForm';


export default async function CreatePropertyPage() {
  const categoryData =
    await getCategories();

  const categories =
    categoryData.data || [];

  return (
    <div className="space-y-6">
     

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Add New Property
          </h1>

          <p className="mt-2 text-gray-500">
            Create a new rental property.
          </p>
        </div>

        <Link href="/landloard-dashboard/Properties">
          <Button variant="outline">
            Back to Properties
          </Button>
        </Link>
      </div>

     

      <CreatePropertyForm
        categories={categories}
      />
    </div>
  );
}