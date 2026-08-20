import DashboardSidebar from "@/components/dashboard/dashboardSidebar";
import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();

  return (
    <div className="flex min-h-screen bg-slate-100">

     
      <DashboardSidebar user={user} />

     
      <main className="flex-1">

        <Navbar user={user} />

        <div className="p-8">
          {children}
        </div>

      </main>

    </div>
  );
}