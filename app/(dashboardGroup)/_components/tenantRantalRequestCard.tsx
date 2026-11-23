"use client";

import PaymentButton from "./PaymentButton";

type RentalRequest = {
  id: string;
  moveInDate: string;
  months: number;
  status: "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "CANCELLED" | "COMPLETED";
  message?: string | null;
  property: {
    title: string;
    location: string;
    price: number | string;
  };
};

type TenantRentalRequestCardProps = {
  request: RentalRequest;
};

const statusStyles: Record<RentalRequest["status"], string> = {
  PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  APPROVED: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  REJECTED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  ACTIVE: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  CANCELLED: "bg-muted text-muted-foreground",
  COMPLETED: "bg-muted text-muted-foreground",
};

export default function TenantRentalRequestCard({
  request,
}: TenantRentalRequestCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div>
        <h2 className="text-xl font-bold">
          {request.property.title}
        </h2>

        <p className="text-muted-foreground">
          {request.property.location}
        </p>

        <p className="mt-1 font-semibold">
          ৳ {Number(request.property.price).toLocaleString("en-BD")}
        </p>
      </div>

      <div className="my-4 border-t" />

      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <p className="text-sm text-muted-foreground">Move In Date</p>
          <p className="font-semibold">
            {new Date(request.moveInDate).toLocaleDateString("en-BD")}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Duration</p>
          <p className="font-semibold">{request.months} months</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Status</p>
          <span
            className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[request.status]}`}
          >
            {request.status}
          </span>
        </div>
      </div>

      {request.message && (
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">Your Message</p>
          <p className="mt-1">{request.message}</p>
        </div>
      )}

      {request.status === "PENDING" && (
        <div className="mt-5 rounded-lg bg-yellow-50 p-3 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300">
          Waiting for landlord approval.
        </div>
      )}

      {request.status === "APPROVED" && (
        <div className="mt-5 space-y-3">
          <div className="rounded-lg bg-green-50 p-3 text-green-700 dark:bg-green-900/20 dark:text-green-300">
            Your rental request has been approved.
          </div>

          <PaymentButton rentalRequestId={request.id} />
        </div>
      )}

      {request.status === "REJECTED" && (
        <div className="mt-5 rounded-lg bg-red-50 p-3 text-red-700 dark:bg-red-900/20 dark:text-red-300">
          Your rental request was rejected.
        </div>
      )}

      {request.status === "ACTIVE" && (
        <div className="mt-5 rounded-lg bg-blue-50 p-3 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
          Payment completed. Your rental is active.
        </div>
      )}

      {request.status === "CANCELLED" && (
        <div className="mt-5 rounded-lg bg-muted p-3 text-muted-foreground">
          This rental request was cancelled.
        </div>
      )}
    </div>
  );
}