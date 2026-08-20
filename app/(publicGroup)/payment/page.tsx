import { getMyPaymentsAction } from '@/app/(dashboardGroup)/_actions/paymentActions';


export default async function PaymentsPage() {
  const result =
    await getMyPaymentsAction();

  const payments = result.data || [];

  return (
    <div className="space-y-6 p-6">

      
      <div>
        <h1 className="text-3xl font-bold">
          Payment History
        </h1>

        <p className="mt-1 text-gray-500">
          View all your rental payments.
        </p>
      </div>

     
      {!result.success && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-600">
          {result.message}
        </div>
      )}

    
      {result.success &&
        payments.length === 0 && (
          <div className="rounded-xl border bg-white p-8 text-center shadow-sm">

            <h2 className="text-xl font-semibold">
              No Payments Found
            </h2>

            <p className="mt-2 text-gray-500">
              You have not made any payment yet.
            </p>

          </div>
        )}

     
      <div className="space-y-5">

        {payments.map((payment: any) => (
          <div
            key={payment.id}
            className="rounded-xl border bg-white p-6 shadow-sm"
          >

          
            <div className="flex flex-col justify-between gap-4 md:flex-row">

              <div>
                <h2 className="text-xl font-bold">
                  {payment.rentalRequest?.property?.title}
                </h2>

                <p className="mt-1 text-gray-500">
                  {payment.rentalRequest?.property?.location}
                </p>
              </div>

             
              <div>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
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

            </div>

            <div className="my-5 border-t" />

        
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

              <div>
                <p className="text-sm text-gray-500">
                  Amount
                </p>

                <p className="mt-1 text-lg font-bold">
                  ৳ {payment.amount}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Provider
                </p>

                <p className="mt-1 font-semibold">
                  {payment.provider}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Payment Date
                </p>

                <p className="mt-1 font-semibold">
                  {payment.paidAt
                    ? new Date(
                        payment.paidAt
                      ).toLocaleDateString()
                    : "Not paid yet"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Transaction ID
                </p>

                <p className="mt-1 break-all text-sm font-medium">
                  {payment.transactionId}
                </p>
              </div>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}