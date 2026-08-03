import { getProperties } from "@/app/lib/api";
import PropertyGrid from "@/components/properties/propertyGrid";
import SearchFilter from "@/components/properties/searchFilter";

// import SearchFilter from "../components/properties/SearchFilter";
// import PropertyGrid from "../components/properties/PropertyGrid";

export default async function PropertiesPage() {

  const result = await getProperties();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      <h1 className="mb-8 text-4xl font-bold">
        All Properties
      </h1>

      <SearchFilter />

      <PropertyGrid
        properties={result.data}
      />

    </main>
  );
}