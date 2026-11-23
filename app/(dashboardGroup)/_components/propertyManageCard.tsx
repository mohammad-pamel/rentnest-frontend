
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { Property } from "@/app/lib/api";

import { deletePropertyAction } from "../_actions/propertyActions";

type PropertyManageCardProps = {
  property: Property;
};

export default function PropertyManageCard({
  property,
}: PropertyManageCardProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const result = await deletePropertyAction(property.id);

      if (!result.success) {
        toast.error(
          result.message || "Failed to delete property"
        );
        return;
      }

      toast.success(
        result.message || "Property deleted successfully"
      );

      router.refresh();
    } catch (error) {
      console.error("Delete property error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const imageUrl =
    property.images?.[0] || "/placeholder.jpg";

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="relative h-56 w-full">
        <Image
          src={imageUrl}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="space-y-3 p-5">
        <h2 className="text-xl font-bold">
          {property.title}
        </h2>

        <p className="text-sm text-muted-foreground">
          {property.location}
        </p>

        <p className="text-2xl font-bold text-primary">
          ৳ {Number(property.price).toLocaleString("en-BD")}
        </p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <p>
            Bedrooms:{" "}
            <span className="font-semibold">
              {property.bedrooms}
            </span>
          </p>

          <p>
            Bathrooms:{" "}
            <span className="font-semibold">
              {property.bathrooms}
            </span>
          </p>

          <p>
            Area:{" "}
            <span className="font-semibold">
              {property.area} sqft
            </span>
          </p>

          <p>
            Available:{" "}
            <span
              className={`font-semibold ${
                property.isAvailable
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {property.isAvailable ? "Yes" : "No"}
            </span>
          </p>
        </div>

        <div className="flex gap-3 pt-3">
          <Link
            href={`/landloard-dashboard/Properties/${property.id}/edit`}
            className="flex-1"
          >
            <Button
              variant="outline"
              className="w-full"
              disabled={loading}
            >
              Edit
            </Button>
          </Link>

          <Button
            variant="destructive"
            className="flex-1"
            disabled={loading}
            onClick={handleDelete}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
