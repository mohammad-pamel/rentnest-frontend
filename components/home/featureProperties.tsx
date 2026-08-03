import { getProperties } from "@/app/lib/api";
import PropertyCard from "./propertyCard";

export default async function FeaturedProperties() {
  const result = await getProperties();

  const properties = result.data;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="mb-10 text-center text-4xl font-bold">
        Featured Properties
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property: any) => (
          <PropertyCard
            key={property.id}
            property={property}
          />
        ))}
      </div>
    </section>
  );
}