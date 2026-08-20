import { getMyRentalRequestsAction } from "../../_actions/rentalActions";
import PaymentButton from "../../_components/PaymentButton";

export default async function RentalRequestsPage() {
    const result = await getMyRentalRequestsAction(
        "page=1&limit=10"
    );

    const requests = result.data || [];

    console.log("requestssss", result)

    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-3xl font-bold">
                    My Rental Requests
                </h1>

                <p className="text-gray-500">
                    Properties you have requested to rent
                </p>
            </div>

            {requests.length === 0 ? (
                <div className="rounded-lg border p-6 text-center">
                    <p className="text-gray-500">
                        You have no rental requests yet.
                    </p>
                </div>
            ) : (
                <div className="grid gap-5">
                    {requests.map((request: any) => (
                        <div
                            key={request.id}
                            className="rounded-xl border p-5 shadow-sm"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        {request.property.title}
                                    </h2>

                                    <p className="mt-1 text-gray-500">
                                        {request.property.location}
                                    </p>
                                </div>

                                <span
                                    className={`rounded-full px-3 py-1 text-sm font-medium ${request.status === "PENDING"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : request.status === "APPROVED"
                                            ? "bg-blue-100 text-blue-700" : request.status === "ACTIVE" ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {request.status}
                                </span>

                            </div>

                            <div className="mt-5 grid gap-3 md:grid-cols-3">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Property Price
                                    </p>

                                    <p className="font-semibold">
                                        ৳ {request.property.price}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Move In Date
                                    </p>

                                    <p className="font-semibold">
                                        {new Date(
                                            request.moveInDate
                                        ).toLocaleDateString()}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Duration
                                    </p>

                                    <p className="font-semibold">
                                        {request.months} months
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="text-sm text-gray-500">
                                    Your Message
                                </p>

                                <p className="mt-1">
                                    {request.message}
                                </p>
                            </div>

                            {request.status === "APPROVED" &&
                                !request.payment && (
                                    <PaymentButton
                                        rentalRequestId={request.id}
                                    />
                                )}

                        

                            {request.payment?.status === "COMPLETED" && (
                                <p className="mt-4 text-green-600">
                                    Payment completed
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}