"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deletePropertyAction } from "../_actions/propertyActions";
import type { Property } from "@/app/lib/api";

type PropertyManageCardProps = {
  property: Property;
};

export default function PropertyManageCard({
  property,
}: PropertyManageCardProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const result = await deletePropertyAction(property.id);

      if (result.success) {
        toast.success(
          result.message || "Property deleted successfully"
        );

        window.location.reload();
      } else {
        toast.error(
          result.message || "Failed to delete property"
        );
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      
      <div className="relative h-56 w-full">
        <Image
          src={property.images?.[0] || "/placeholder.jpg"}
          alt={property.title}
          fill
          className="object-cover"
        />
      </div>

     
      <div className="space-y-3 p-5">
        <h2 className="text-xl font-bold">
          {property.title}
        </h2>

        <p className="text-gray-500">
          {property.location}
        </p>

        <p className="text-2xl font-bold text-green-700">
          ৳ {property.price}
        </p>

        <div className="grid grid-cols-2 gap-2 text-sm">
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
            <span className="font-semibold">
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