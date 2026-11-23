
import Image from "next/image";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
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

  const result = await getProperty(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const property = result.data;

  const mainImage = property.images?.[0];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">

        {/* Property Image */}
        <div className="relative h-[300px] overflow-hidden rounded-2xl bg-muted sm:h-[450px]">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={property.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No property image available
            </div>
          )}
        </div>

        {/* Property Information */}
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge
              variant={property.isAvailable ? "default" : "secondary"}
            >
              {property.isAvailable ? "Available" : "Unavailable"}
            </Badge>

            <Badge variant="outline">
              {property.category?.name ?? "Uncategorized"}
            </Badge>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {property.title}
          </h1>

          <p className="mt-3 text-muted-foreground">
            {property.address}, {property.location}
          </p>

          <h2 className="mt-6 text-3xl font-bold text-emerald-600">
            ৳ {property.price.toLocaleString("en-BD")}
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              / month
            </span>
          </h2>

          <Separator className="my-6" />

          {/* Property Features */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Bedrooms
              </p>
              <p className="mt-1 font-semibold">
                {property.bedrooms}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Bathrooms
              </p>
              <p className="mt-1 font-semibold">
                {property.bathrooms}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Area
              </p>
              <p className="mt-1 font-semibold">
                {property.area} sqft
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Category
              </p>
              <p className="mt-1 font-semibold">
                {property.category?.name ?? "N/A"}
              </p>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Amenities */}
          <div>
            <h3 className="text-lg font-semibold">
              Amenities
            </h3>

            <div className="mt-3 flex flex-wrap gap-2">
              {property.amenities?.length ? (
                property.amenities.map((item, index) => (
                  <Badge key={`${item}-${index}`} variant="secondary">
                    {item}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No amenities listed.
                </p>
              )}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold">
              Description
            </h3>

            <p className="mt-3 whitespace-pre-line leading-7 text-muted-foreground">
              {property.description}
            </p>
          </div>

          {/* Rental Request */}
          {property.isAvailable && (
            <div className="mt-8">
              <RequestRentalForm propertyId={property.id} />
            </div>
          )}
        </div>
      </div>

      <Separator className="my-10" />

      {/* Reviews */}
      <section className="space-y-8">
        <ReviewList propertyId={property.id} />

        <Separator />

        <ReviewForm propertyId={property.id} />
      </section>
    </main>
  );
}
