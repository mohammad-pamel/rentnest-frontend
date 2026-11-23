
import Link from "next/link";
import {
  ClipboardList,
  CheckCircle,
  Home,
  CreditCard,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { getMyRentalRequestsAction } from "../_actions/rentalActions";
import { getMyPaymentsAction } from "../_actions/paymentActions";

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
}

interface RentalRequest {
  id: string;
  propertyId: string;
  tenantId: string;
  moveInDate: string;
  months: number;
  status: RentalStatus;
  property?: RentalProperty | null;
}

interface Payment {
  id: string;
  status: string;
}

function StatCard({
  title,
  value,
  icon: Icon,
  description,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  description: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">
          {title}
        </p>

        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <h2 className="mt-4 text-3xl font-bold">
        {value}
      </h2>

      <p className="mt-1 text-xs text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export default async function TenantDashboard() {
  const [rentalResult, paymentResult] = await Promise.all([
    getMyRentalRequestsAction("page=1&limit=100"),
    getMyPaymentsAction(),
  ]);

  const rentals: RentalRequest[] = rentalResult.success
    ? (rentalResult.data ?? [])
    : [];

  const payments: Payment[] = paymentResult.success
    ? (paymentResult.data ?? [])
    : [];

  const pendingCount = rentals.filter(
    (item) => item.status === "PENDING",
  ).length;

  const approvedCount = rentals.filter(
    (item) => item.status === "APPROVED",
  ).length;

  const activeCount = rentals.filter(
    (item) => item.status === "ACTIVE",
  ).length;

  const completedPayments = payments.filter(
    (item) => item.status === "COMPLETED",
  ).length;

  const activeRentals = rentals
    .filter((item) => item.status === "ACTIVE")
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Tenant Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your rental requests and payments.
        </p>
      </div>

      {/* API Error Messages */}
      {!rentalResult.success && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          Failed to load rental requests: {rentalResult.message}
        </div>
      )}

      {!paymentResult.success && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          Failed to load payments: {paymentResult.message}
        </div>
      )}

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Pending Requests"
          value={pendingCount}
          icon={ClipboardList}
          description="Waiting for landlord approval"
        />

        <StatCard
          title="Approved Requests"
          value={approvedCount}
          icon={CheckCircle}
          description="Approved by landlords"
        />

        <StatCard
          title="Active Rentals"
          value={activeCount}
          icon={Home}
          description="Currently active rentals"
        />

        <StatCard
          title="Completed Payments"
          value={completedPayments}
          icon={CreditCard}
          description="Successfully completed payments"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ClipboardList className="h-6 w-6" />
          </div>

          <h2 className="text-xl font-bold">
            My Rental Requests
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            View and track all your rental requests.
          </p>

          <Link
            href="/tenant-dashboard/rental-requests"
            className="mt-5 block"
          >
            <Button className="w-full">
              View Rental Requests
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <CreditCard className="h-6 w-6" />
          </div>

          <h2 className="text-xl font-bold">
            My Payments
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            View your payment history and transactions.
          </p>

          <Link
            href="/tenant-dashboard/payments"
            className="mt-5 block"
          >
            <Button variant="outline" className="w-full">
              View Payments
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Active Rentals */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold">
              Active Rentals
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Your currently active rental properties.
            </p>
          </div>

          <Link href="/tenant-dashboard/rental-requests">
            <Button variant="outline">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-6 space-y-4">
          {activeRentals.map((rental) => (
            <div
              key={rental.id}
              className="rounded-lg border p-4"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row">
                <div>
                  <h3 className="font-semibold">
                    {rental.property?.title || "Property"}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {rental.property?.location || "Location unavailable"}
                  </p>
                </div>

                <span className="h-fit w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-950 dark:text-green-300">
                  {rental.status}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <p className="text-muted-foreground">
                  Duration:{" "}
                  <span className="font-semibold text-foreground">
                    {rental.months} months
                  </span>
                </p>

                <p className="text-muted-foreground">
                  Move-in:{" "}
                  <span className="font-semibold text-foreground">
                    {new Date(rental.moveInDate).toLocaleDateString("en-BD")}
                  </span>
                </p>
              </div>
            </div>
          ))}

          {rentalResult.success && activeCount === 0 && (
            <div className="py-8 text-center">
              <Home className="mx-auto h-10 w-10 text-muted-foreground" />

              <p className="mt-3 font-medium">
                No Active Rentals
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                You do not have any active rental yet.
              </p>

              <Link href="/property" className="mt-4 inline-block">
                <Button variant="outline">
                  Explore Properties
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
