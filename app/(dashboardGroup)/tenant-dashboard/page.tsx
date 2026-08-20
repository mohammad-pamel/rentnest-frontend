import Link from "next/link";
import { Button } from "@/components/ui/button";

import { getMyRentalRequestsAction } from "../_actions/rentalActions";
import { getMyPaymentsAction } from "../_actions/paymentActions";

export default async function TenantDashboard() {
  const [rentalResult, paymentResult] =
    await Promise.all([
      getMyRentalRequestsAction("page=1&limit=100"),
      getMyPaymentsAction(),
    ]);

  const rentals = rentalResult.data || [];
  const payments = paymentResult.data || [];

  const pendingCount = rentals.filter(
    (item: any) => item.status === "PENDING"
  ).length;

  const approvedCount = rentals.filter(
    (item: any) => item.status === "APPROVED"
  ).length;

  const activeCount = rentals.filter(
    (item: any) => item.status === "ACTIVE"
  ).length;

  const completedPayments = payments.filter(
    (item: any) => item.status === "COMPLETED"
  ).length;

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Tenant Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your rental requests and payments.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Pending Requests
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {pendingCount}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Approved Requests
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {approvedCount}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Active Rentals
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {activeCount}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Completed Payments
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {completedPayments}
          </h2>
        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            My Rental Requests
          </h2>

          <p className="mt-2 text-gray-500">
            View and track all your rental requests.
          </p>

          <Link
            href="/tenant-dashboard/rental-requests"
            className="mt-5 block"
          >
            <Button className="w-full">
              View Rental Requests
            </Button>
          </Link>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            My Payments
          </h2>

          <p className="mt-2 text-gray-500">
            View your payment history and transactions.
          </p>

          <Link
            href="/payment"
            className="mt-5 block"
          >
            <Button className="w-full">
              View Payments
            </Button>
          </Link>
        </div>

      </div>
      

      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">
              Active Rentals
            </h2>

            <p className="mt-1 text-gray-500">
              Your currently active rental properties.
            </p>
          </div>

          <Link href="/tenant-dashboard/rental-requests">
            <Button variant="outline">
              View All
            </Button>
          </Link>
        </div>

        <div className="mt-6 space-y-4">

          {rentals
            .filter(
              (item: any) =>
                item.status === "ACTIVE"
            )
            .slice(0, 3)
            .map((rental: any) => (
              <div
                key={rental.id}
                className="rounded-lg border p-4"
              >
                <h3 className="font-semibold">
                  {rental.property?.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {rental.property?.location}
                </p>

                <p className="mt-1 text-sm">
                  Duration:{" "}
                  <span className="font-semibold">
                    {rental.months} months
                  </span>
                </p>

                <p className="text-sm">
                  Status:{" "}
                  <span className="font-semibold text-green-600">
                    {rental.status}
                  </span>
                </p>
              </div>
            ))}

          {activeCount === 0 && (
            <p className="py-6 text-center text-gray-500">
              You do not have any active rental yet.
            </p>
          )}

        </div>
      </div>
    </div>
  );
}