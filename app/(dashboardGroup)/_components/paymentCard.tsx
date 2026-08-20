type PaymentCardProps = {
  payment: any;
};

export default function PaymentCard({
  payment,
}: PaymentCardProps) {
  const property =
    payment.rentalRequest?.property;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">
            {property?.title || "Property"}
          </h2>

          <p className="mt-1 text-gray-500">
            {property?.location}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${
            payment.status === "COMPLETED"
              ? "bg-green-100 text-green-700"
              : payment.status === "PENDING"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {payment.status}
        </span>
      </div>

      <div className="my-5 border-t" />

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <p className="text-sm text-gray-500">
            Amount
          </p>

          <p className="font-semibold">
            ${payment.amount}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Provider
          </p>

          <p className="font-semibold">
            {payment.provider}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Transaction ID
          </p>

          <p className="break-all text-sm font-semibold">
            {payment.transactionId}
          </p>
        </div>
      </div>

      {payment.paidAt && (
        <p className="mt-4 text-sm text-gray-500">
          Paid At:{" "}
          {new Date(
            payment.paidAt
          ).toLocaleString()}
        </p>
      )}
    </div>
  );
}