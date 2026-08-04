import { getCategories, getProperties } from "@/app/lib/api";
import Pagination from "@/components/properties/pagination";
import PropertyGrid from "@/components/properties/propertyGrid";
import SearchFilter from "@/components/properties/searchFilter";
// import PropertyGrid from "../components/properties/PropertyGrid";
// import SearchFilter from "../components/properties/SearchFilter";

export default async function PropertiesPage({
    searchParams,
}: {
    searchParams: Promise<{
        location?: string;
        minPrice?: string;
        maxPrice?: string;
        categoryId?: string;
        searchTerm?: string;
    }>;
}) {
    const params = await searchParams;

    const propertyData = await getProperties(params);

    const categoryData = await getCategories();

    return (
        <main>

            <h1 className="mb-8 text-4xl font-bold">
                All Properties
            </h1>


            <SearchFilter
                categories={categoryData.data}
            />

            <PropertyGrid
                properties={propertyData.data}
            />

            <Pagination
                page={propertyData.meta.page}
                totalPage={propertyData.meta.totalPage}
            />

        </main>
    );
}