import Image from "next/image";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PropertyCard({
    property,
}: {
    property: any;
}) {
    return (
        <Card className="overflow-hidden">

            <div className="relative h-60 w-full">
                <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    className="object-cover"
                />
            </div>

            <CardHeader>
                <CardTitle>{property.title}</CardTitle>
            </CardHeader>

            <CardContent>

                <Badge>{property.location}</Badge>

                <p className="mt-3 font-semibold">
                    {property.bedrooms} Bedrooms
                </p>

                <p>{property.bathrooms} Bathrooms</p>

                <p className="mt-4 text-2xl font-bold text-green-700">
                    ${property.price}/month
                </p>

            </CardContent>

            <CardFooter>

                <Link href={`/property/${property.id}`}>
                    <Button>
                        View Details
                    </Button>
                </Link>

            </CardFooter>

        </Card>
    );
}