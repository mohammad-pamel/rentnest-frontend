
"use client";

import type { ProfileResponse } from "@/app/lib/api";
import {
  LayoutDashboard,
  Users,
  Building2,
  ClipboardList,
  Tags,
  CreditCard,
  UserRound,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type DashboardSidebarProps = {
  user: ProfileResponse;
};

type SidebarItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

const dashboardMenus: Record<string, SidebarItem[]> = {
  TENANT: [
    { label: "Dashboard", href: "/tenant-dashboard", icon: LayoutDashboard },
    { label: "My Rental Requests", href: "/tenant-dashboard/rental-requests", icon: ClipboardList },
    { label: "Payment", href: "/payment", icon: CreditCard },
    { label: "My Profile", href: "/profile", icon: UserRound },
  ],

  LANDLORD: [
    { label: "Dashboard", href: "/landloard-dashboard", icon: LayoutDashboard },
    { label: "My Properties", href: "/landloard-dashboard/my-properties", icon: Building2 },
    { label: "Add Property", href: "/landloard-dashboard/Properties/create", icon: Plus },
    { label: "Rental Requests", href: "/landloard-dashboard/my-rental-requests", icon: ClipboardList },
    { label: "My Profile", href: "/profile", icon: UserRound },
  ],

  ADMIN: [
    { label: "Dashboard", href: "/admin-dashboard", icon: LayoutDashboard },
    { label: "Users", href: "/admin-dashboard/users", icon: Users },
    { label: "Properties", href: "/admin-dashboard/properties", icon: Building2 },
    { label: "Rental Requests", href: "/admin-dashboard/rentals", icon: ClipboardList },
    { label: "Categories", href: "/admin-dashboard/categories", icon: Tags },
    { label: "My Profile", href: "/profile", icon: UserRound },
  ],
};

export default function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();

  const role = user?.data?.profile?.role;
  const menuItems = dashboardMenus[role] ?? [];

  const isActive = (href: string) => {
    if (pathname === href) return true;

    const dashboardRoots = [
      "/tenant-dashboard",
      "/landloard-dashboard",
      "/admin-dashboard",
    ];

    if (dashboardRoots.includes(href)) return false;

    return pathname.startsWith(`${href}/`);
  };

  return (
    <aside className="w-full shrink-0 border-b border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950 md:min-h-screen md:w-64 md:border-b-0 md:border-r md:p-5">
      <div className="mb-4 md:mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white md:text-2xl">
          Dashboard
        </h2>

        <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">
          {role ?? "User"} Panel
        </p>
      </div>

      <nav className="flex flex-wrap gap-2 md:flex-col md:space-y-1 md:gap-0">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`inline-flex min-w-0 items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors md:w-full md:gap-3 md:px-4 ${
                active
                  ? "bg-green-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-green-700 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-green-400"
              }`}
            >
              <Icon size={18} className="shrink-0" />
              <span className="break-words">{item.label}</span>
            </Link>
          );
        })}

        {menuItems.length === 0 && (
          <p className="rounded-lg bg-slate-100 p-3 text-sm text-slate-500 dark:bg-slate-900">
            No dashboard menu available.
          </p>
        )}
      </nav>
    </aside>
  );
}