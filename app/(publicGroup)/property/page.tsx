import { getCategories, getProperties, PropertyListResponse } from "@/app/lib/api";
import Pagination from "@/components/properties/pagination";
import PropertyGrid from "@/components/properties/propertyGrid";
import SearchFilter from "@/components/properties/searchFilter";


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

    const propertyData : PropertyListResponse = await getProperties(params);

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
                page={propertyData.meta?.page as number}
                totalPage={propertyData.meta?.totalPage as number}
            />

        </main>
    );
}