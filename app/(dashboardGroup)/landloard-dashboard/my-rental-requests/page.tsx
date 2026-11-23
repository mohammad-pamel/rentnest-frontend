import { getLandlordRequestsAction } from "../../_actions/rentalActions";
import RentalRequestCard from "../../_components/rentalRequestCard";

type RentalRequest = {
  id: string;
  moveInDate: string;
  months: number;
  status:
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "ACTIVE"
    | "CANCELLED"
    | "COMPLETED";
  message?: string | null;
  property: {
    id: string;
    title: string;
    location: string;
    price: number | string;
  };
  tenant: {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
  };
};

export default async function RentalRequestsPage() {
  const result = await getLandlordRequestsAction("page=1&limit=10");

  if (!result.success) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Rental Requests
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage rental requests from tenants.
          </p>
        </div>

        <div className="rounded-xl border border-destructive/30 bg-card p-6">
          <p className="text-destructive">
            {result.message || "Failed to load rental requests."}
          </p>
        </div>
      </div>
    );
  }

  const requests: RentalRequest[] = result.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Rental Requests
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage rental requests from tenants.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="rounded-xl border bg-card p-8 text-center">
          <h2 className="text-xl font-semibold">
            No Rental Requests
          </h2>

          <p className="mt-2 text-muted-foreground">
            You don't have any rental requests yet.
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            Total Requests: {requests.length}
          </p>

          <div className="grid gap-5">
            {requests.map((request) => (
              <RentalRequestCard
                key={request.id}
                request={request}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}