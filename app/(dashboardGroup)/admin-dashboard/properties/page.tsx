import { Property } from "@/app/lib/api";
import { getAllPropertiesAction } from "../../_actions/adminActions";



export default async function AdminPropertiesPage() {
  const result = await getAllPropertiesAction();

  const properties = result.data || [];

  return (
    <div className="space-y-6">

     
      <div>
        <h1 className="text-3xl font-bold">
          All Properties
        </h1>

        <p className="mt-2 text-gray-500">
          View all properties listed by landlords.
        </p>
      </div>


      {!result.success && (
        <div className="rounded-lg border bg-white p-5 text-red-500">
          {result.message}
        </div>
      )}

  
      {result.success && properties.length === 0 && (
        <div className="rounded-lg border bg-white p-8 text-center">
          <h2 className="text-xl font-semibold">
            No Properties Found
          </h2>

          <p className="mt-2 text-gray-500">
            There are no properties available.
          </p>
        </div>
      )}

   
      {properties.length > 0 && (
        <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">

          <table className="w-full text-sm">

            <thead className="border-b bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-left">
                  Property
                </th>

                <th className="px-5 py-4 text-left">
                  Landlord
                </th>

                <th className="px-5 py-4 text-left">
                  Location
                </th>

                <th className="px-5 py-4 text-left">
                  Price
                </th>

                <th className="px-5 py-4 text-left">
                  Category
                </th>

                <th className="px-5 py-4 text-left">
                  Availability
                </th>
              </tr>
            </thead>

            <tbody>
              {properties.map((property: Property) => (
                <tr
                  key={property.id}
                  className="border-b last:border-0 hover:bg-slate-50"
                >

                 
                  <td className="px-5 py-4">
                    <p className="font-semibold">
                      {property.title}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {property.address}
                    </p>
                  </td>

                 
                  <td className="px-5 py-4">
                    <p className="font-medium">
                      {property.landlord?.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {property.landlord?.email}
                    </p>
                  </td>


                  <td className="px-5 py-4">
                    {property.location}
                  </td>

                
                  <td className="px-5 py-4 font-semibold">
                    ৳ {property.price}
                  </td>


                  <td className="px-5 py-4">
                    {property.category?.name || "N/A"}
                  </td>

                 
                  <td className="px-5 py-4">
                    {property.isAvailable ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        Available
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                        Not Available
                      </span>
                    )}
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