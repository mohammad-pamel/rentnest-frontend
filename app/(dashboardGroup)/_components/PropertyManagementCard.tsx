"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {deletePropertyAction} from "../_actions/propertyActions";
import { toast } from "sonner";
import { useState } from "react";
import { Property } from "@/app/lib/api";

type Props = {
  property: Property;
};

export default function PropertyManagementCard({
  property,
}: Props) {

  const [loading, setLoading] =
    useState(false);

  const handleDelete = async () => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this property?"
      );

    if (!confirmed) return;

    try {

      setLoading(true);

      const result =
        await deletePropertyAction(
          property.id
        );

      if (result.success) {

        toast.success(
          "Property deleted successfully"
        );

        window.location.reload();

      } else {

        toast.error(
          result.message ||
            "Failed to delete property"
        );
      }

    } catch {

      toast.error(
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="overflow-hidden rounded-xl border shadow-sm">

      <div className="relative h-52 w-full">

        <Image
          src={property.images?.[0]}
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

        <p className="font-bold text-green-700">
          ৳ {property.price}
        </p>

        <p>
          {property.bedrooms} Bedrooms
          {" • "}
          {property.bathrooms} Bathrooms
        </p>

        <p>
          Status:{" "}
          <span className="font-semibold">
            {property.isAvailable
              ? "Available"
              : "Unavailable"}
          </span>
        </p>

        <div className="flex gap-2 pt-3">

          <Link
            href={`/landlord/Properties/${property.id}/edit`}
            className="flex-1"
          >
            <Button className="w-full">
              Edit
            </Button>
          </Link>

          <Button
            variant="destructive"
            disabled={loading}
            onClick={handleDelete}
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </Button>

        </div>

      </div>

    </div>
  );
}