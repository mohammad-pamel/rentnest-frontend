"use client";

import Link from "next/link";

export default function DashboardSidebar() {
  return (
    <aside className="w-64 bg-white border-r p-6">

      <h2 className="text-2xl font-bold mb-8">
        RentNest
      </h2>

      <nav className="space-y-3">

        <Link
          href="/dashboard"
          className="block"
        >
          Dashboard
        </Link>

        <Link
          href="/dashboard/tenant-dashboard"
          className="block"
        >
          Tenant
        </Link>

        <Link
          href="/dashboard/landloard-dashboard"
          className="block"
        >
          Landlord
        </Link>

        <Link
          href="/dashboard/admin-dashboard"
          className="block"
        >
          Admin
        </Link>

      </nav>

    </aside>
  );
}