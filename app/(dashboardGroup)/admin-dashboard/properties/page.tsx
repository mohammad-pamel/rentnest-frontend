import type { Property } from "@/app/lib/api";
import { getAllPropertiesAction } from "../../_actions/adminActions";

export default async function AdminPropertiesPage() {
  const result = await getAllPropertiesAction();

  if (!result.success) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            All Properties
          </h1>
          <p className="mt-2 text-muted-foreground">
            View all properties listed by landlords.
          </p>
        </div>

        <div className="rounded-xl border border-destructive/30 bg-card p-6">
          <p className="text-destructive">
            {result.message || "Failed to load properties."}
          </p>
        </div>
      </div>
    );
  }

  const properties: Property[] = result.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          All Properties
        </h1>

        <p className="mt-2 text-muted-foreground">
          View all properties listed by landlords.
        </p>
      </div>

      {properties.length === 0 ? (
        <div className="rounded-xl border bg-card p-8 text-center">
          <h2 className="text-xl font-semibold">
            No Properties Found
          </h2>

          <p className="mt-2 text-muted-foreground">
            There are no properties available.
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            Total Properties: {properties.length}
          </p>

          <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-5 py-4 text-left">Property</th>
                  <th className="px-5 py-4 text-left">Landlord</th>
                  <th className="px-5 py-4 text-left">Location</th>
                  <th className="px-5 py-4 text-left">Price</th>
                  <th className="px-5 py-4 text-left">Category</th>
                  <th className="px-5 py-4 text-left">Availability</th>
                </tr>
              </thead>

              <tbody>
                {properties.map((property) => (
                  <tr
                    key={property.id}
                    className="border-b last:border-0 transition-colors hover:bg-muted/40"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold">
                        {property.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {property.address}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium">
                        {property.landlord?.name || "N/A"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {property.landlord?.email || "N/A"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      {property.location}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 font-semibold">
                      ৳ {Number(property.price).toLocaleString("en-BD")}
                    </td>

                    <td className="px-5 py-4">
                      {property.category?.name || "N/A"}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          property.isAvailable
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                        }`}
                      >
                        {property.isAvailable
                          ? "Available"
                          : "Not Available"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}