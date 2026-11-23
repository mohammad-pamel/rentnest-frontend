
import {
  getCategories,
  getProperties,
  type PropertyParams,
} from "@/app/lib/api";

import SearchFilter from "@/components/properties/searchFilter";
import PropertyGrid from "@/components/properties/propertyGrid";
import Pagination from "@/components/properties/pagination";

interface PropertiesPageProps {
  searchParams: Promise<{
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    categoryId?: string;
    searchTerm?: string;
    bedrooms?: string;
    isAvailable?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}

export default async function PropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  const params = await searchParams;

  const apiParams: PropertyParams = {
    location: params.location,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    categoryId: params.categoryId,
    searchTerm: params.searchTerm,
    bedrooms: params.bedrooms,
    isAvailable: params.isAvailable,
    page: params.page || "1",
    limit: params.limit || "9",
    sortBy: params.sortBy,
    sortOrder: params.sortOrder,
  };

  const [propertyData, categoryData] = await Promise.all([
    getProperties(apiParams),
    getCategories(),
  ]);

  const properties = propertyData.data ?? [];
  const categories = categoryData.data ?? [];

  const currentPage = propertyData.meta?.page ?? 1;
  const totalPage = propertyData.meta?.totalPage ?? 1;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-600">
          Explore RentNest
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Find Your Perfect Property
        </h1>

        <p className="mt-3 max-w-2xl text-muted-foreground">
          Explore available rental properties and find a place
          that feels like home.
        </p>
      </div>

      <SearchFilter categories={categories} />

      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-foreground">
          Available Properties
        </h2>

        <p className="text-sm text-muted-foreground">
          {propertyData.meta?.total ?? properties.length} properties found
        </p>
      </div>

      <PropertyGrid properties={properties} />

      {properties.length > 0 && totalPage > 1 && (
        <div className="mt-10">
          <Pagination
            page={currentPage}
            totalPage={totalPage}
          />
        </div>
      )}
    </main>
  );
}
