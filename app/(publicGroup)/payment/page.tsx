import { getMyPaymentsAction } from "@/app/(dashboardGroup)/_actions/paymentActions";

interface Payment {
  id: string;
  amount: number | string;
  status: "COMPLETED" | "PENDING" | "FAILED" | string;
  provider: string;
  paidAt: string | null;
  transactionId: string | null;
  rentalRequest?: {
    property?: {
      title?: string;
      location?: string;
    };
  };
}

export default async function PaymentsPage() {
  const result = await getMyPaymentsAction();

  const payments: Payment[] = result.success
    ? (result.data ?? [])
    : [];

  return (
    <div className="mx-auto  w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-bold">
          Payment History
        </h1>

        <p className="mt-1 text-muted-foreground mb-5">
          View all your rental payments.
        </p>
      </div>

      {!result.success && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-600 dark:border-red-900 dark:bg-red-950/30">
          {result.message || "Failed to load payments."}
        </div>
      )}

      {result.success && payments.length === 0 && (
        <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold">
            No Payments Found
          </h2>

          <p className="mt-2 text-muted-foreground">
            You have not made any payment yet.
          </p>
        </div>
      )}

      {result.success && payments.length > 0 && (
        <div className="space-y-5">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="rounded-xl border bg-card p-6 shadow-sm"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row">
                <div>
                  <h2 className="text-xl font-bold">
                    {payment.rentalRequest?.property?.title ??
                      "Rental Property"}
                  </h2>

                  <p className="mt-1 text-muted-foreground">
                    {payment.rentalRequest?.property?.location ??
                      "Location unavailable"}
                  </p>
                </div>

                <div>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      payment.status === "COMPLETED"
                        ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                        : payment.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
                          : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                    }`}
                  >
                    {payment.status}
                  </span>
                </div>
              </div>

              <div className="my-5 border-t" />

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Amount
                  </p>
                  <p className="mt-1 text-lg font-bold">
                    ৳ {Number(payment.amount).toLocaleString("en-BD")}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Provider
                  </p>
                  <p className="mt-1 font-semibold">
                    {payment.provider}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Payment Date
                  </p>
                  <p className="mt-1 font-semibold">
                    {payment.paidAt
                      ? new Date(payment.paidAt).toLocaleDateString(
                          "en-BD",
                        )
                      : "Not paid yet"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Transaction ID
                  </p>
                  <p className="mt-1 break-all text-sm font-medium">
                    {payment.transactionId || "Not available"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}