import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandlordDashboard() {
  return (
    <div className="space-y-8">

     
      <div>
        <h1 className="text-3xl font-bold">
          Landlord Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your properties and rental requests.
        </p>
      </div>

     
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

     
        <div className="rounded-xl border bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold">
            My Properties
          </h2>

          <p className="mt-2 text-gray-500">
            View and manage all your rental properties.
          </p>

          <Link
            href="/landloard-dashboard/my-properties"
            className="block rounded-lg px-3 py-2 hover:bg-slate-100"
          >
            <Button className="w-full">
              My Properties
            </Button>

          </Link>

        </div>

        
        <div className="rounded-xl border bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold">
            Add Property
          </h2>

          <p className="mt-2 text-gray-500">
            Create a new property listing.
          </p>

          <Link
            href="/landloard-dashboard/Properties/create"
            className="mt-5 block"
          >
            <Button className="w-full">
              Add New Property
            </Button>
          </Link>

        </div>

       
        <div className="rounded-xl border bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold">
            Rental Requests
          </h2>

          <p className="mt-2 text-gray-500">
            Accept or reject rental requests from tenants.
          </p>

          <Link
            href="/landloard-dashboard/my-rental-requests"
            className="mt-5 block"
          >
            <Button className="w-full">
              View Requests
            </Button>
          </Link>

        </div>

      </div>

    </div>
  );
}