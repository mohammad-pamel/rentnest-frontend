import { getAllRentalsAction } from "../../_actions/adminActions";

type RentalStatus =
  | "PENDING"
  | "APPROVED"
  | "ACTIVE"
  | "REJECTED"
  | "COMPLETED"
  | "CANCELLED";

type PaymentStatus =
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED";

interface AdminRental {
  id: string;
  moveInDate: string;
  months: number;
  status: RentalStatus;
  tenant?: {
    id: string;
    name: string;
    email: string;
  } | null;
  property?: {
    id: string;
    title: string;
    location: string;
  } | null;
  payment?: {
    id: string;
    status: PaymentStatus;
  } | null;
}

const rentalStatusStyles: Record<RentalStatus, string> = {
  PENDING:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  APPROVED:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  ACTIVE:
    "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  REJECTED:
    "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  COMPLETED:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  CANCELLED:
    "bg-muted text-muted-foreground",
};

const paymentStatusStyles: Record<PaymentStatus, string> = {
  PENDING:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  COMPLETED:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  FAILED:
    "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  CANCELLED:
    "bg-muted text-muted-foreground",
};

export default async function AdminRentalsPage() {
  const result = await getAllRentalsAction();

  if (!result.success) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            All Rental Requests
          </h1>
          <p className="mt-2 text-muted-foreground">
            Monitor all rental requests from tenants.
          </p>
        </div>

        <div className="rounded-xl border border-destructive/30 bg-card p-6">
          <p className="text-destructive">
            {result.message || "Failed to load rental requests."}
          </p>
        </div>
      </div>
    );
  }

  const rentals: AdminRental[] = result.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          All Rental Requests
        </h1>

        <p className="mt-2 text-muted-foreground">
          Monitor all rental requests from tenants.
        </p>
      </div>

      {rentals.length === 0 ? (
        <div className="rounded-xl border bg-card p-8 text-center">
          <h2 className="text-xl font-semibold">
            No Rental Requests Found
          </h2>

          <p className="mt-2 text-muted-foreground">
            There are no rental requests yet.
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            Total Rental Requests: {rentals.length}
          </p>

          <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-5 py-4 text-left">Tenant</th>
                  <th className="px-5 py-4 text-left">Property</th>
                  <th className="px-5 py-4 text-left">Move In</th>
                  <th className="px-5 py-4 text-left">Duration</th>
                  <th className="px-5 py-4 text-left">Payment</th>
                  <th className="px-5 py-4 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {rentals.map((rental) => (
                  <tr
                    key={rental.id}
                    className="border-b last:border-0 transition-colors hover:bg-muted/40"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold">
                        {rental.tenant?.name || "N/A"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {rental.tenant?.email || "N/A"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-semibold">
                        {rental.property?.title || "N/A"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {rental.property?.location || "N/A"}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4">
                      {rental.moveInDate
                        ? new Date(rental.moveInDate).toLocaleDateString(
                            "en-BD"
                          )
                        : "N/A"}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4">
                      {rental.months} months
                    </td>

                    <td className="px-5 py-4">
                      {rental.payment ? (
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            paymentStatusStyles[rental.payment.status]
                          }`}
                        >
                          {rental.payment.status}
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                          Not Paid
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          rentalStatusStyles[rental.status]
                        }`}
                      >
                        {rental.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}