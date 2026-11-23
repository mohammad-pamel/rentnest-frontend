import Link from "next/link";
import {
  Building2,
  PlusCircle,
  ClipboardList,
  ArrowRight,
} from "lucide-react";

const dashboardCards = [
  {
    title: "My Properties",
    description: "View and manage all your rental properties.",
    href: "/landloard-dashboard/my-properties",
    buttonText: "My Properties",
    icon: Building2,
  },
  {
    title: "Add Property",
    description: "Create a new property listing.",
    href: "/landloard-dashboard/Properties/create",
    buttonText: "Add New Property",
    icon: PlusCircle,
  },
  {
    title: "Rental Requests",
    description: "Accept or reject rental requests from tenants.",
    href: "/landloard-dashboard/my-rental-requests",
    buttonText: "View Requests",
    icon: ClipboardList,
  },
];

export default function LandlordDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Landlord Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your properties and rental requests.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {dashboardCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="flex flex-col rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-5 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon size={25} />
              </div>

              <h2 className="text-xl font-bold">{card.title}</h2>

              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                {card.description}
              </p>

              <Link href={card.href} className="mt-6">
                <span className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                  {card.buttonText}
                  <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}