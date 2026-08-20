// import Link from "next/link";

// import { Button } from "@/components/ui/button";
// import { getAllUsersAction, getAllPropertiesAction, getAllRentalsAction } from "../_actions/adminActions";

// export default async function AdminDashboard() {
//   const [usersResult, propertiesResult, rentalsResult] =
//     await Promise.all([
//       getAllUsersAction(),
//       getAllPropertiesAction(),
//       getAllRentalsAction(),
//     ]);

//   const users = usersResult.data || [];
//   const properties = propertiesResult.data || [];
//   const rentals = rentalsResult.data || [];

//   const activeUsers = users.filter(
//     (user: any) => user.status === "ACTIVE"
//   ).length;

//   const bannedUsers = users.filter(
//     (user: any) => user.status === "BANNED"
//   ).length;

//   const pendingRentals = rentals.filter(
//     (rental: any) => rental.status === "PENDING"
//   ).length;

//   const approvedRentals = rentals.filter(
//     (rental: any) => rental.status === "APPROVED"
//   ).length;

//   const activeRentals = rentals.filter(
//     (rental: any) => rental.status === "ACTIVE"
//   ).length;

//   const completedPayments = rentals.filter(
//     (rental: any) =>
//       rental.payment?.status === "COMPLETED"
//   ).length;

//   return (
//     <div className="space-y-8">



//       <div>
//         <h1 className="text-3xl font-bold">
//           Admin Dashboard
//         </h1>

//         <p className="mt-2 text-gray-500">
//           Manage and monitor the RentNest platform.
//         </p>
//       </div>




//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">



//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <p className="text-sm text-gray-500">
//             Total Users
//           </p>

//           <h2 className="mt-2 text-3xl font-bold">
//             {users.length}
//           </h2>

//           <p className="mt-2 text-sm text-green-600">
//             Active: {activeUsers}
//           </p>

//           <p className="text-sm text-red-500">
//             Banned: {bannedUsers}
//           </p>
//         </div>




//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <p className="text-sm text-gray-500">
//             Total Properties
//           </p>

//           <h2 className="mt-2 text-3xl font-bold">
//             {properties.length}
//           </h2>

//           <Link
//             href="/admin-dashboard/properties"
//             className="mt-3 inline-block text-sm text-blue-600 hover:underline"
//           >
//             View Properties →
//           </Link>
//         </div>




//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <p className="text-sm text-gray-500">
//             Total Rentals
//           </p>

//           <h2 className="mt-2 text-3xl font-bold">
//             {rentals.length}
//           </h2>

//           <p className="mt-2 text-sm text-yellow-600">
//             Pending: {pendingRentals}
//           </p>
//         </div>




//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <p className="text-sm text-gray-500">
//             Completed Payments
//           </p>

//           <h2 className="mt-2 text-3xl font-bold">
//             {completedPayments}
//           </h2>

//           <p className="mt-2 text-sm text-green-600">
//             Successful transactions
//           </p>
//         </div>

//       </div>




//       <div className="grid gap-6 md:grid-cols-3">

//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <p className="text-sm text-gray-500">
//             Pending Requests
//           </p>

//           <h2 className="mt-2 text-2xl font-bold">
//             {pendingRentals}
//           </h2>
//         </div>


//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <p className="text-sm text-gray-500">
//             Approved Requests
//           </p>

//           <h2 className="mt-2 text-2xl font-bold">
//             {approvedRentals}
//           </h2>
//         </div>


//         <div className="rounded-xl border bg-white p-6 shadow-sm">
//           <p className="text-sm text-gray-500">
//             Active Rentals
//           </p>

//           <h2 className="mt-2 text-2xl font-bold">
//             {activeRentals}
//           </h2>
//         </div>

//       </div>




//       <div className="rounded-xl border bg-white p-6 shadow-sm">

//         <h2 className="text-xl font-bold">
//           Quick Actions
//         </h2>

//         <div className="mt-5 flex flex-wrap gap-4">

//           <Link href="/admin-dashboard/users">
//             <Button>
//               Manage Users
//             </Button>
//           </Link>

//           <Link href="/admin-dashboard/properties">
//             <Button variant="outline">
//               View Properties
//             </Button>
//           </Link>

//           <Link href="/admin-dashboard/rentals">
//             <Button variant="outline">
//               View Rental Requests
//             </Button>
//           </Link>

//           <Link href="/admin-dashboard/categories">
//             <Button variant="outline">
//               Categories
//             </Button>
//           </Link>

//         </div>

//       </div>

//     </div>
//   );
// }





import Link from "next/link";

import { Button } from "@/components/ui/button";
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

  const users: AdminUser[] = usersResult.data || [];
  const properties: AdminProperty[] =
    propertiesResult.data || [];
  const rentals: AdminRental[] =
    rentalsResult.data || [];

  const activeUsers = users.filter(
    (user: AdminUser) =>
      user.status === "ACTIVE"
  ).length;

  const bannedUsers = users.filter(
    (user: AdminUser) =>
      user.status === "BANNED"
  ).length;

  const pendingRentals = rentals.filter(
    (rental: AdminRental) =>
      rental.status === "PENDING"
  ).length;

  const approvedRentals = rentals.filter(
    (rental: AdminRental) =>
      rental.status === "APPROVED"
  ).length;

  const activeRentals = rentals.filter(
    (rental: AdminRental) =>
      rental.status === "ACTIVE"
  ).length;

  const completedPayments = rentals.filter(
    (rental: AdminRental) =>
      rental.payment?.status === "COMPLETED"
  ).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Manage and monitor the RentNest platform.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Users
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {users.length}
          </h2>

          <p className="mt-2 text-sm text-green-600">
            Active: {activeUsers}
          </p>

          <p className="text-sm text-red-500">
            Banned: {bannedUsers}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Properties
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {properties.length}
          </h2>

          <Link
            href="/admin-dashboard/properties"
            className="mt-3 inline-block text-sm text-blue-600 hover:underline"
          >
            View Properties →
          </Link>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Rentals
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {rentals.length}
          </h2>

          <p className="mt-2 text-sm text-yellow-600">
            Pending: {pendingRentals}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Completed Payments
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {completedPayments}
          </h2>

          <p className="mt-2 text-sm text-green-600">
            Successful transactions
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Pending Requests
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {pendingRentals}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Approved Requests
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {approvedRentals}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Active Rentals
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {activeRentals}
          </h2>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">
          Quick Actions
        </h2>

        <div className="mt-5 flex flex-wrap gap-4">
          <Link href="/admin-dashboard/users">
            <Button>
              Manage Users
            </Button>
          </Link>

          <Link href="/admin-dashboard/properties">
            <Button variant="outline">
              View Properties
            </Button>
          </Link>

          <Link href="/admin-dashboard/rentals">
            <Button variant="outline">
              View Rental Requests
            </Button>
          </Link>

          <Link href="/admin-dashboard/categories">
            <Button variant="outline">
              Categories
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}