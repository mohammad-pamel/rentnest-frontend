import Link from "next/link";
import {
  Users,
  Building2,
  Home,
  CreditCard,
  Clock,
  CheckCircle,
  Activity,
  Ban,
  ArrowRight,
} from "lucide-react";

import {
  getAllUsersAction,
  getAllPropertiesAction,
  getAllRentalsAction,
} from "../_actions/adminActions";

type UserRole = "ADMIN" | "TENANT" | "LANDLORD";
type UserStatus = "ACTIVE" | "BANNED";

type RentalStatus =
  | "PENDING"
  | "APPROVED"
  | "ACTIVE"
  | "REJECTED"
  | "COMPLETED";

type PaymentStatus =
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  profileImage: string | null;
  role: UserRole;
  status: UserStatus;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AdminProperty {
  id: string;
  title: string;
  description: string;
  location: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities: string[];
  images: string[];
  categoryId: string;
  landlordId: string;
  isAvailable: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AdminPayment {
  id: string;
  status: PaymentStatus;
}

interface AdminRental {
  id: string;
  tenantId: string;
  propertyId: string;
  moveInDate: string;
  months: number;
  status: RentalStatus;
  message: string;
  createdAt: string;
  updatedAt: string;
  payment: AdminPayment | null;
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconColor,
}: {
  title: string;
  value: number;
  description?: string;
  icon: React.ElementType;
  iconColor: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">
          {title}
        </p>

        <div
          className={`flex size-11 items-center justify-center rounded-lg ${iconColor}`}
        >
          <Icon size={22} />
        </div>
      </div>

      <h2 className="mt-4 text-3xl font-bold tabular-nums">
        {value.toLocaleString("en-BD")}
      </h2>

      {description && (
        <p className="mt-2 text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}

const quickActions = [
  {
    title: "Manage Users",
    description: "View, activate or ban platform users.",
    href: "/admin-dashboard/users",
    icon: Users,
  },
  {
    title: "Manage Properties",
    description: "Monitor all property listings.",
    href: "/admin-dashboard/properties",
    icon: Building2,
  },
  {
    title: "Rental Requests",
    description: "Monitor rental requests and statuses.",
    href: "/admin-dashboard/rentals",
    icon: Home,
  },
  {
    title: "Categories",
    description: "Manage property categories.",
    href: "/admin-dashboard/categories",
    icon: Activity,
  },
];

export default async function AdminDashboard() {
  const [
    usersResult,
    propertiesResult,
    rentalsResult,
  ] = await Promise.all([
    getAllUsersAction(),
    getAllPropertiesAction(),
    getAllRentalsAction(),
  ]);

  const hasError =
    !usersResult.success ||
    !propertiesResult.success ||
    !rentalsResult.success;

  const users: AdminUser[] = usersResult.success
    ? usersResult.data ?? []
    : [];

  const properties: AdminProperty[] = propertiesResult.success
    ? propertiesResult.data ?? []
    : [];

  const rentals: AdminRental[] = rentalsResult.success
    ? rentalsResult.data ?? []
    : [];

  const activeUsers = users.filter(
    (user) => user.status === "ACTIVE"
  ).length;

  const bannedUsers = users.filter(
    (user) => user.status === "BANNED"
  ).length;

  const pendingRentals = rentals.filter(
    (rental) => rental.status === "PENDING"
  ).length;

  const approvedRentals = rentals.filter(
    (rental) => rental.status === "APPROVED"
  ).length;

  const activeRentals = rentals.filter(
    (rental) => rental.status === "ACTIVE"
  ).length;

  const completedPayments = rentals.filter(
    (rental) => rental.payment?.status === "COMPLETED"
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage and monitor the RentNest platform.
        </p>
      </div>

      {/* API Error */}
      {hasError && (
        <div className="rounded-xl border border-destructive/30 bg-card p-5">
          <p className="font-medium text-destructive">
            Some dashboard statistics could not be loaded.
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            {[
              !usersResult.success && "Users",
              !propertiesResult.success && "Properties",
              !rentalsResult.success && "Rentals",
            ]
              .filter(Boolean)
              .join(", ")}{" "}
            data is currently unavailable.
          </p>
        </div>
      )}

      {/* Main Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Users"
          value={users.length}
          description={`${activeUsers} active users`}
          icon={Users}
          iconColor="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
        />

        <StatCard
          title="Total Properties"
          value={properties.length}
          description="Registered property listings"
          icon={Building2}
          iconColor="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
        />

        <StatCard
          title="Total Rentals"
          value={rentals.length}
          description={`${pendingRentals} requests pending`}
          icon={Home}
          iconColor="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
        />

        <StatCard
          title="Completed Payments"
          value={completedPayments}
          description="Successful transactions"
          icon={CreditCard}
          iconColor="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
        />
      </div>

      {/* User Statistics */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">
          User Overview
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <StatCard
            title="Active Users"
            value={activeUsers}
            icon={CheckCircle}
            iconColor="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
          />

          <StatCard
            title="Banned Users"
            value={bannedUsers}
            icon={Ban}
            iconColor="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
          />
        </div>
      </section>

      {/* Rental Statistics */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">
          Rental Overview
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            title="Pending Requests"
            value={pendingRentals}
            icon={Clock}
            iconColor="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
          />

          <StatCard
            title="Approved Requests"
            value={approvedRentals}
            icon={CheckCircle}
            iconColor="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
          />

          <StatCard
            title="Active Rentals"
            value={activeRentals}
            icon={Home}
            iconColor="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
          />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="space-y-5">
        <div>
          <h2 className="text-xl font-bold">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Quickly access important administration sections.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
                className="group rounded-xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon size={22} />
                  </div>

                  <ArrowRight
                    size={18}
                    className="text-muted-foreground transition-transform group-hover:translate-x-1"
                  />
                </div>

                <h3 className="mt-4 font-bold">
                  {action.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {action.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}