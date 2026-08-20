import { getAllRentalsAction } from "../../_actions/adminActions";

export default async function AdminRentalsPage() {
  const result = await getAllRentalsAction();

  const rentals = result.data || [];

  return (
    <div className="space-y-6">

   
      <div>
        <h1 className="text-3xl font-bold">
          All Rental Requests
        </h1>

        <p className="mt-2 text-gray-500">
          Monitor all rental requests from tenants.
        </p>
      </div>

  
      {!result.success && (
        <div className="rounded-lg border bg-white p-5 text-red-500">
          {result.message}
        </div>
      )}

    
      {result.success && rentals.length === 0 && (
        <div className="rounded-lg border bg-white p-8 text-center">
          <h2 className="text-xl font-semibold">
            No Rental Requests Found
          </h2>

          <p className="mt-2 text-gray-500">
            There are no rental requests yet.
          </p>
        </div>
      )}


      {rentals.length > 0 && (
        <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">

          <table className="w-full text-sm">

            <thead className="border-b bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-left">
                  Tenant
                </th>

                <th className="px-5 py-4 text-left">
                  Property
                </th>

                <th className="px-5 py-4 text-left">
                  Move In
                </th>

                <th className="px-5 py-4 text-left">
                  Duration
                </th>

                <th className="px-5 py-4 text-left">
                  Payment
                </th>

                <th className="px-5 py-4 text-left">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {rentals.map((rental: any) => (
                <tr
                  key={rental.id}
                  className="border-b last:border-0 hover:bg-slate-50"
                >

                 
                  <td className="px-5 py-4">
                    <p className="font-semibold">
                      {rental.tenant?.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {rental.tenant?.email}
                    </p>
                  </td>

                  
                  <td className="px-5 py-4">
                    <p className="font-semibold">
                      {rental.property?.title}
                    </p>

                    <p className="text-xs text-gray-500">
                      {rental.property?.location}
                    </p>
                  </td>

               
                  <td className="px-5 py-4">
                    {rental.moveInDate
                      ? new Date(
                          rental.moveInDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>

                
                  <td className="px-5 py-4">
                    {rental.months} months
                  </td>

                 
                  <td className="px-5 py-4">
                    {rental.payment ? (
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          rental.payment.status ===
                          "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {rental.payment.status}
                      </span>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                        Not Paid
                      </span>
                    )}
                  </td>

                 
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        rental.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : rental.status === "ACTIVE"
                          ? "bg-blue-100 text-blue-700"
                          : rental.status === "REJECTED"
                          ? "bg-red-100 text-red-700"
                          : rental.status === "COMPLETED"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {rental.status}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}