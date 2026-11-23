
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { updateRentalStatusAction } from "../_actions/rentalActions";

type RentalStatus =
  | "PENDING"
  | "APPROVED"
  | "ACTIVE"
  | "REJECTED"
  | "CANCELLED"
  | "COMPLETED";

interface RentalProperty {
  id: string;
  title: string;
  location: string;
  price: number | string;
}

interface RentalTenant {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
}

interface RentalRequest {
  id: string;
  moveInDate: string;
  months: number;
  status: RentalStatus;
  message?: string | null;
  property: RentalProperty;
  tenant: RentalTenant;
}

type RentalRequestCardProps = {
  request: RentalRequest;
};

export default function RentalRequestCard({
  request,
}: RentalRequestCardProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleStatusUpdate = async (
    status: "APPROVED" | "REJECTED"
  ) => {
    if (loading) return;

    const confirmed = window.confirm(
      status === "APPROVED"
        ? "Are you sure you want to approve this rental request?"
        : "Are you sure you want to reject this rental request?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const result = await updateRentalStatusAction(
        request.id,
        status
      );

      if (!result.success) {
        toast.error(
          result.message || "Failed to update rental request"
        );
        return;
      }

      toast.success(
        result.message ||
          (status === "APPROVED"
            ? "Rental request approved successfully"
            : "Rental request rejected successfully")
      );

      router.refresh();
    } catch (error) {
      console.error("Rental status update error:", error);

      toast.error(
        "Something went wrong while updating request"
      );
    } finally {
      setLoading(false);
    }
  };

  const statusStyle: Record<RentalStatus, string> = {
    PENDING:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
    APPROVED:
      "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    ACTIVE:
      "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
    REJECTED:
      "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
    CANCELLED:
      "bg-muted text-muted-foreground",
    COMPLETED:
      "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  };

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      {/* Property Information */}
      <div>
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
          <div>
            <h2 className="text-xl font-bold">
              {request.property.title}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {request.property.location}
            </p>

            <p className="mt-2 font-semibold">
              ৳{" "}
              {Number(request.property.price).toLocaleString("en-BD")}
            </p>
          </div>

          <span
            className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ${statusStyle[request.status]}`}
          >
            {request.status}
          </span>
        </div>
      </div>

      <div className="my-5 border-t" />

      {/* Tenant Information */}
      <div>
        <h3 className="font-semibold">
          Tenant Information
        </h3>

        <div className="mt-2 space-y-1 text-sm">
          <p>
            Name:{" "}
            <span className="font-medium">
              {request.tenant.name}
            </span>
          </p>

          <p>
            Email:{" "}
            <span className="font-medium">
              {request.tenant.email}
            </span>
          </p>

          <p>
            Phone:{" "}
            <span className="font-medium">
              {request.tenant.phone || "Not provided"}
            </span>
          </p>
        </div>
      </div>

      <div className="my-5 border-t" />

      {/* Rental Information */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <p className="text-sm text-muted-foreground">
            Move-in Date
          </p>

          <p className="mt-1 font-semibold">
            {new Date(request.moveInDate).toLocaleDateString("en-BD")}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Duration
          </p>

          <p className="mt-1 font-semibold">
            {request.months} months
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Request Status
          </p>

          <p className="mt-1 font-semibold">
            {request.status}
          </p>
        </div>
      </div>

      {/* Tenant Message */}
      <div className="mt-5">
        <p className="text-sm text-muted-foreground">
          Tenant Message
        </p>

        <p className="mt-1 whitespace-pre-wrap text-sm">
          {request.message || "No message provided."}
        </p>
      </div>

      {/* Accept / Reject */}
      {request.status === "PENDING" && (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            disabled={loading}
            onClick={() => handleStatusUpdate("APPROVED")}
          >
            {loading ? "Processing..." : "Accept Request"}
          </Button>

          <Button
            variant="destructive"
            disabled={loading}
            onClick={() => handleStatusUpdate("REJECTED")}
          >
            {loading ? "Processing..." : "Reject Request"}
          </Button>
        </div>
      )}

      {request.status === "APPROVED" && (
        <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300">
          This rental request has been approved.
        </div>
      )}

      {request.status === "REJECTED" && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          This rental request has been rejected.
        </div>
      )}

      {request.status === "ACTIVE" && (
        <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300">
          This rental is currently active.
        </div>
      )}

      {request.status === "COMPLETED" && (
        <div className="mt-6 rounded-lg border bg-muted p-3 text-sm text-muted-foreground">
          This rental has been completed.
        </div>
      )}
    </div>
  );
}
