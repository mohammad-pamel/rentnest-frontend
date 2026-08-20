import { Property } from "@/app/lib/api";
import { getMyPropertiesAction } from "../../_actions/propertyActions";
import PropertyManageCard from "../../_components/propertyManageCard";




export default async function MyPropertiesPage() {
  const result = await getMyPropertiesAction();

  const properties: Property[] = result.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          My Properties
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your rental properties.
        </p>
      </div>

      {!result.success && (
        <div className="rounded-lg border p-5 text-red-500">
          {result.message}
        </div>
      )}

      {result.success && properties.length === 0 && (
        <div className="rounded-lg border bg-white p-8 text-center">
          <h2 className="text-xl font-semibold">
            No Properties Found
          </h2>

          <p className="mt-2 text-gray-500">
            You have not created any property yet.
          </p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property: Property) => (
          <PropertyManageCard
            key={property.id}
            property={property}
          />
        ))}
      </div>
    </div>
  );
}