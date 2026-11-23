
import type { ReactNode } from "react";

import DashboardSidebar from "@/components/dashboard/dashboardSidebar";
import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getMe();

  return (
   <div className="flex min-h-screen flex-col bg-background md:flex-row">
  <DashboardSidebar user={user} />

  <div className="flex min-w-0 flex-1 flex-col">
    <Navbar user={user} />

    <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
      {children}
    </main>
  </div>
</div>
  );
}
