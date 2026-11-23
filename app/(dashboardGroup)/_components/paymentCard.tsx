
interface PaymentProperty {
  id: string;
  title: string;
  location: string;
}

interface PaymentRentalRequest {
  id: string;
  property?: PaymentProperty | null;
}

interface Payment {
  id: string;
  amount: number | string;
  status: "COMPLETED" | "PENDING" | "FAILED" | "CANCELLED" | string;
  provider?: string | null;
  transactionId?: string | null;
  paidAt?: string | null;
  rentalRequest?: PaymentRentalRequest | null;
}

type PaymentCardProps = {
  payment: Payment;
};

export default function PaymentCard({
  payment,
}: PaymentCardProps) {
  const property = payment.rentalRequest?.property;

  const statusStyle =
    payment.status === "COMPLETED"
      ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
      : payment.status === "PENDING"
        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
        : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300";

  const formattedAmount = Number(payment.amount).toLocaleString(
    "en-BD",
    {
      maximumFractionDigits: 2,
    }
  );

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h2 className="text-xl font-bold">
            {property?.title || "Property"}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {property?.location || "Location unavailable"}
          </p>
        </div>

        <span
          className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ${statusStyle}`}
        >
          {payment.status}
        </span>
      </div>

      <div className="my-5 border-t" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-sm text-muted-foreground">
            Amount
          </p>

          <p className="mt-1 font-semibold">
            ৳ {formattedAmount}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Provider
          </p>

          <p className="mt-1 font-semibold">
            {payment.provider || "N/A"}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Transaction ID
          </p>

          <p className="mt-1 break-all text-sm font-semibold">
            {payment.transactionId || "Not available"}
          </p>
        </div>
      </div>

      {payment.paidAt && (
        <p className="mt-5 text-sm text-muted-foreground">
          Paid At:{" "}
          {new Date(payment.paidAt).toLocaleString("en-BD")}
        </p>
      )}
    </div>
  );
}
