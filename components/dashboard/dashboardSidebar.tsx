// "use client";

// import { Profile, ProfileResponse } from "@/app/lib/api";
// import Link from "next/link";

// type DashboardSidebarProps = {
//   user: ProfileResponse;
// };

// export default function DashboardSidebar({
//   user,
// }: DashboardSidebarProps) {
//   const role = user?.data?.profile?.role 
//   // || user?.profile?.role || user?.role;
//   // const role = user?.role;

//   return (
//     <aside className="min-h-screen w-64 border-r bg-white p-6">
//       <h2 className="mb-8 text-2xl font-bold">
//         Dashboard
//       </h2>

//       <nav className="space-y-3">
//         {role === "TENANT" && (
//           <>
//             <Link
//               href="/tenant-dashboard"
//               className="block rounded-lg px-3 py-2 hover:bg-slate-100"
//             >
//               Dashboard
//             </Link>

//             <Link
//               href="/tenant-dashboard/rental-requests"
//               className="block rounded-lg px-3 py-2 hover:bg-slate-100"
//             >
//               My Rental Requests
//             </Link>

//             <Link
//               href="/payment"
//               className="block rounded-lg px-3 py-2 hover:bg-slate-100"
//             >
//               Payment
//             </Link>

//             <Link
//               href="/profile"
//               className="block rounded-lg px-3 py-2 hover:bg-slate-100"
//             >
//               My Profile
//             </Link>
//           </>
//         )}

//         {role === "LANDLORD" && (
//           <>
//           <Link
//               href="/landloard-dashboard"
//               className="block rounded-lg px-3 py-2 hover:bg-slate-100"
//             >
//               Dashboard
//             </Link>

//             <Link
//               href="/landloard-dashboard/my-properties"
//               className="block rounded-lg px-3 py-2 hover:bg-slate-100"
//             >
//               My Properties
//             </Link>

//             <Link
//               href="/landloard-dashboard/Properties/create"
//               className="block rounded-lg px-3 py-2 hover:bg-slate-100"
//             >
//               Add Property
//             </Link>

//             <Link
//               href="/landloard-dashboard/my-rental-requests"
//               className="block rounded-lg px-3 py-2 hover:bg-slate-100"
//             >
//               Rental Requests
//             </Link>

//             <Link
//               href="/profile"
//               className="block rounded-lg px-3 py-2 hover:bg-slate-100"
//             >
//               My Profile
//             </Link>
//           </>
//         )}

//         {role === "ADMIN" && (
//           <>
//           <Link
//               href="/admin-dashboard"
//               className="block rounded-lg px-3 py-2 hover:bg-slate-100"
//             >
//               Dashboard
//             </Link>

//             <Link
//               href="/admin-dashboard/users"
//               className="block rounded-lg px-3 py-2 hover:bg-slate-100"
//             >
//               Users
//             </Link>

//             <Link
//               href="/admin-dashboard/properties"
//               className="block rounded-lg px-3 py-2 hover:bg-slate-100"
//             >
//               Properties
//             </Link>

//             <Link
//               href="/admin-dashboard/rentals"
//               className="block rounded-lg px-3 py-2 hover:bg-slate-100"
//             >
//               Rental Requests
//             </Link>

//             <Link
//               href="/admin-dashboard/categories"
//               className="block rounded-lg px-3 py-2 hover:bg-slate-100"
//             >
//               Categories
//             </Link>

//             <Link
//               href="/profile"
//               className="block rounded-lg px-3 py-2 hover:bg-slate-100"
//             >
//               My Profile
//             </Link>
//           </>
//         )}
//       </nav>
//     </aside>
//   );
// }