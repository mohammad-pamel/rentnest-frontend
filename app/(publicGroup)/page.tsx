import { getProperties } from "@/app/lib/api";
import PropertyGrid from "@/components/properties/propertyGrid";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import Link from "next/link";



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


  return (
    <main>

      <h1 className="mb-8 text-4xl font-bold">
        All Properties
      </h1>

      <PropertyGrid
        properties={propertyData.data}
      />

      <CardFooter>
                <Link href="/property">
                    <Button className="mt-12 ">
                        View All Property
                    </Button>
                </Link>
            </CardFooter>

    </main>
  );
}