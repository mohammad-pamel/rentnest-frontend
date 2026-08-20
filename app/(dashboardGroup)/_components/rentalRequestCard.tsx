"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { updateRentalStatusAction } from "../_actions/rentalActions";

type RentalRequestCardProps = {
  request: any;
};

const RentalRequestCard = ({
  request,
}: RentalRequestCardProps) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleStatusUpdate = async (
    status: "APPROVED" | "REJECTED"
  ) => {
    try {
      setLoading(true);

      const result = await updateRentalStatusAction(
        request.id,
        status
      );

      if (!result.success) {
        toast.error(
          result.message || "Failed to update request"
        );

        return;
      }

      toast.success(
        status === "APPROVED"
          ? "Rental request accepted successfully"
          : "Rental request rejected successfully"
      );

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong while updating request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border p-5 shadow-sm">
      {/* Property */}
      <div>
        <h2 className="text-xl font-bold">
          {request.property.title}
        </h2>

        <p className="text-gray-500">
          {request.property.location}
        </p>

        <p className="mt-1 font-semibold">
          ৳ {request.property.price}
        </p>
      </div>

      <div className="my-4 border-t" />

      {/* Tenant */}
      <div>
        <h3 className="font-semibold">
          Tenant Information
        </h3>

        <p>
          Name: {request.tenant.name}
        </p>

        <p>
          Email: {request.tenant.email}
        </p>

        <p>
          Phone: {request.tenant.phone}
        </p>
      </div>

      <div className="my-4 border-t" />

      {/* Rental Information */}
      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <p className="text-sm text-gray-500">
            Move In Date
          </p>

          <p className="font-semibold">
            {new Date(
              request.moveInDate
            ).toLocaleDateString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Duration
          </p>

          <p className="font-semibold">
            {request.months} months
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Status
          </p>

          <p className="font-semibold">
            {request.status}
          </p>
        </div>
      </div>

      {/* Message */}
      <div className="mt-4">
        <p className="text-sm text-gray-500">
          Tenant Message
        </p>

        <p className="mt-1">
          {request.message}
        </p>
      </div>

      {/* Accept / Reject */}
      {request.status === "PENDING" && (
        <div className="mt-6 flex gap-3">
          <Button
            disabled={loading}
            onClick={() =>
              handleStatusUpdate("APPROVED")
            }
          >
            {loading ? "Processing..." : "Accept"}
          </Button>

          <Button
            variant="destructive"
            disabled={loading}
            onClick={() =>
              handleStatusUpdate("REJECTED")
            }
          >
            {loading ? "Processing..." : "Reject"}
          </Button>
        </div>
      )}

      {/* Approved */}
      {request.status === "APPROVED" && (
        <div className="mt-6 rounded-lg bg-green-50 p-3 text-green-700">
          This rental request has been approved.
        </div>
      )}

      {/* Rejected */}
      {request.status === "REJECTED" && (
        <div className="mt-6 rounded-lg bg-red-50 p-3 text-red-700">
          This rental request has been rejected.
        </div>
      )}
    </div>
  );
};

export default RentalRequestCard;