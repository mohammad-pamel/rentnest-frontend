import DashboardSidebar from "@/components/dashboard/dashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">

      <DashboardSidebar />

      <main className="flex-1 p-8 bg-slate-100">

        {children}

      </main>

    </div>
  );
}