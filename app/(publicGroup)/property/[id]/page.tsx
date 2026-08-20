import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProperty } from "@/app/lib/api";
import RequestRentalForm from "../../_components/RentalRequestForm";
import ReviewList from "@/app/(dashboardGroup)/_components/reviewList";
import ReviewForm from "@/app/(dashboardGroup)/_components/reviewForm";

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log(id)

  const result = await getProperty(id);

  console.log(result)

  const property = result.data;

  console.log(property)

  if (!property) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">
          Property Not Found
        </h1>

        <p className="mt-2 text-gray-500">
          This property does not exist or is no longer available.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">

      <div>

        <Image
          src={property.images[0]}
          alt={property.title}
          width={700}
          height={450}
          className="rounded-xl object-cover"
        />

      </div>


      <div>

        <h1 className="text-4xl font-bold">

          {property.title}

        </h1>

        <p className="mt-3 text-gray-600">

          {property.location}

        </p>

        <h2 className="mt-5 text-3xl font-bold text-green-700">

          ৳ {property.price}

        </h2>

        <Separator className="my-6" />

        <div className="grid grid-cols-2 gap-4">

          <p>

            Bedrooms : {property.bedrooms}

          </p>

          <p>

            Bathrooms : {property.bathrooms}

          </p>

          <p>

            Area : {property.area} sqft

          </p>

          <p>

            Category : {property.category.name}

          </p>

        </div>

        <Separator className="my-6" />

        <h3 className="font-bold">

          Amenities
        </h3>

        <div className="mt-3 flex flex-wrap gap-2">

          {property.amenities.map(
            (item: string) => (
              <Badge
                key={item}
              >
                {item}
              </Badge>
            )
          )}

        </div>

        <Separator className="my-6" />

        <h3 className="font-bold">

          Description

        </h3>

        <p className="mt-2 text-gray-600">

          {property.description}

        </p>

        <RequestRentalForm propertyId={property.id} />

        <Separator className="my-6" />

        <ReviewList propertyId={property.id} />

        <Separator className="my-6" />

        <ReviewForm propertyId={property.id} />

      </div>

    </div>
  );
}