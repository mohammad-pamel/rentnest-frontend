import { getLandlordRequestsAction } from "../../_actions/rentalActions";
import RentalRequestCard from "../../_components/rentalRequestCard";

export default async function RentalRequestsPage() {
  const result =
    await getLandlordRequestsAction(
      "page=1&limit=10"
    );

  const requests = result.data || [];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">
          Rental Requests
        </h1>

        <p className="mt-1 text-gray-500">
          Manage rental requests from tenants
        </p>
      </div>

      {!result.success && (
        <div className="rounded-lg border p-5 text-red-500">
          {result.message}
        </div>
      )}

      {result.success &&
        requests.length === 0 && (
          <div className="rounded-lg border p-8 text-center">
            <h2 className="text-xl font-semibold">
              No Rental Requests
            </h2>

            <p className="mt-2 text-gray-500">
              You don't have any rental requests yet.
            </p>
          </div>
        )}

      <div className="grid gap-5">
        {requests.map((request: any) => (
          <RentalRequestCard
            key={request.id}
            request={request}
          />
        ))}
      </div>
    </div>
  );
}