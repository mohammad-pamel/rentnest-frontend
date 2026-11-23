
import { getMyRentalRequestsAction } from "../../_actions/rentalActions";
import PaymentButton from "../../_components/PaymentButton";

interface RentalRequest {
  id: string;
  status: string;
  moveInDate: string;
  months: number;
  message: string;
  property?: {
    title?: string;
    location?: string;
    price?: number | string;
  } | null;
  payment?: {
    status: string;
  } | null;
}

function getStatusStyle(status: string) {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300";

    case "APPROVED":
      return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300";

    case "ACTIVE":
      return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300";

    case "REJECTED":
      return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300";

    case "CANCELLED":
      return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";

    default:
      return "bg-muted text-muted-foreground";
  }
}

export default async function RentalRequestsPage() {
  const result = await getMyRentalRequestsAction(
    "page=1&limit=10",
  );

  const requests: RentalRequest[] = result.success
    ? (result.data ?? [])
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          My Rental Requests
        </h1>

        <p className="mt-2 text-muted-foreground">
          View and manage the properties you have requested to rent.
        </p>
      </div>

      {!result.success && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-5 text-destructive">
          {result.message || "Failed to load rental requests."}
        </div>
      )}

      {result.success && requests.length === 0 && (
        <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold">
            No Rental Requests Found
          </h2>

          <p className="mt-2 text-muted-foreground">
            You have not submitted any rental requests yet.
          </p>
        </div>
      )}

      {result.success && requests.length > 0 && (
        <div className="grid gap-5">
          {requests.map((request) => (
            <div
              key={request.id}
              className="rounded-xl border bg-card p-5 shadow-sm sm:p-6"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <h2 className="text-xl font-semibold">
                    {request.property?.title || "Property"}
                  </h2>

                  <p className="mt-1 text-muted-foreground">
                    {request.property?.location || "Location unavailable"}
                  </p>
                </div>

                <span
                  className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${getStatusStyle(request.status)}`}
                >
                  {request.status}
                </span>
              </div>

              <div className="my-5 border-t" />

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Property Price
                  </p>

                  <p className="mt-1 font-semibold">
                    ৳ {Number(request.property?.price ?? 0).toLocaleString("en-BD")}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Move-in Date
                  </p>

                  <p className="mt-1 font-semibold">
                    {request.moveInDate
                      ? new Date(request.moveInDate).toLocaleDateString("en-BD")
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Rental Duration
                  </p>

                  <p className="mt-1 font-semibold">
                    {request.months} months
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-sm text-muted-foreground">
                  Your Message
                </p>

                <p className="mt-1 whitespace-pre-wrap">
                  {request.message || "No message provided."}
                </p>
              </div>

              {request.status === "APPROVED" &&
                !request.payment && (
                  <div className="mt-5 border-t pt-5">
                    <p className="mb-3 text-sm text-muted-foreground">
                      Your request has been approved. Complete your payment
                      to proceed.
                    </p>

                    <PaymentButton
                      rentalRequestId={request.id}
                    />
                  </div>
                )}

              {request.payment?.status === "COMPLETED" && (
                <div className="mt-5 rounded-lg bg-green-50 p-3 text-sm font-medium text-green-700 dark:bg-green-950/30 dark:text-green-300">
                  Payment completed successfully.
                </div>
              )}

              {request.payment?.status === "PENDING" && (
                <div className="mt-5 rounded-lg bg-yellow-50 p-3 text-sm text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-300">
                  Payment is pending.
                </div>
              )}

              {request.payment?.status === "FAILED" && (
                <div className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">
                  Payment failed. Please try again if payment is available.
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
