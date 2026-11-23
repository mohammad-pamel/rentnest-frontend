
import Image from "next/image";
import Link from "next/link";

import {
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  ArrowUpRight,
} from "lucide-react";


import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Property {
  id: string;
  title: string;
  location: string;
  price: number | string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images?: string[];
  isAvailable?: boolean;
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({
  property,
}: PropertyCardProps) {
  const image = property.images?.[0];

  const formattedPrice = Number(property.price).toLocaleString("en-BD");

  return (
    <Card className="group h-full overflow-hidden rounded-2xl border border-border bg-card py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Property Image */}
      <div className="relative h-56 w-full overflow-hidden bg-muted">
        {image ? (
          <Image
            src={image}
            alt={property.title || "Rental property"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <Maximize className="h-8 w-8" />
            <span className="text-sm">No Image Available</span>
          </div>
        )}

        {/* Availability */}
        <div className="absolute left-4 top-4">
          <Badge
            className={
              property.isAvailable === false
                ? "border-0 bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-950 dark:text-red-400"
                : "border-0 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-400"
            }
          >
            {property.isAvailable === false ? "Unavailable" : "Available"}
          </Badge>
        </div>

        {/* Image Overlay Link */}
        <Link
          href={`/property/${property.id}`}
          aria-label={`View ${property.title}`}
          className="absolute inset-0"
        />
      </div>

      {/* Property Details */}
      <CardContent className="space-y-4 px-5 pt-5">
        <div>
          <div className="mb-2 flex items-start justify-between gap-3">
            <h3 className="line-clamp-1 text-lg font-bold text-foreground transition-colors group-hover:text-emerald-600">
              {property.title}
            </h3>
          </div>

          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0 text-emerald-600" />
            <span className="line-clamp-1">{property.location}</span>
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 rounded-xl bg-muted/60 p-3">
          <div className="flex flex-col items-center gap-1 text-center">
            <BedDouble className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-semibold text-foreground">
              {property.bedrooms}
            </span>
            <span className="text-xs text-muted-foreground">Beds</span>
          </div>

          <div className="flex flex-col items-center gap-1 border-x border-border text-center">
            <Bath className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-semibold text-foreground">
              {property.bathrooms}
            </span>
            <span className="text-xs text-muted-foreground">Baths</span>
          </div>

          <div className="flex flex-col items-center gap-1 text-center">
            <Maximize className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-semibold text-foreground">
              {property.area}
            </span>
            <span className="text-xs text-muted-foreground">Sqft</span>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">Monthly Rent</p>

          <p className="mt-1 text-2xl font-bold tracking-tight text-emerald-700 dark:text-emerald-400">
            ৳ {formattedPrice}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              / month
            </span>
          </p>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="px-5 pb-5">
        <Button
          asChild
          className="w-full gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
        >
          <Link href={`/property/${property.id}`}>
            View Details
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
