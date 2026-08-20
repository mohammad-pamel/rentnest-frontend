"use client";

import PaymentButton from './PaymentButton';

type TenantRentalRequestCardProps = {
  request: any;
};

export default function TenantRentalRequestCard({
  request,
}: TenantRentalRequestCardProps) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

     
      <div>
        <h2 className="text-xl font-bold">
          {request.property.title}
        </h2>

        <p className="text-gray-500">
          {request.property.location}
        </p>

        <p className="mt-1 font-semibold">
          ৳ {request.property.price}
        </p>
      </div>

      <div className="my-4 border-t" />

     
      <div className="grid gap-3 md:grid-cols-3">

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

        <div>
          <p className="text-sm text-gray-500">
            Status
          </p>

          <p className="font-semibold">
            {request.status}
          </p>
        </div>

      </div>

    
      {request.message && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Your Message
          </p>

          <p className="mt-1">
            {request.message}
          </p>
        </div>
      )}

      {request.status === "PENDING" && (
        <div className="mt-5 rounded-lg bg-yellow-50 p-3 text-yellow-700">
          Waiting for landlord approval.
        </div>
      )}

    
      {request.status === "APPROVED" && (
        <div className="mt-5">

          <div className="rounded-lg bg-green-50 p-3 text-green-700">
            Your rental request has been approved.
          </div>

          <PaymentButton
            rentalRequestId={request.id}
          />

        </div>
      )}

     
      {request.status === "REJECTED" && (
        <div className="mt-5 rounded-lg bg-red-50 p-3 text-red-700">
          Your rental request was rejected.
        </div>
      )}

    
      {request.status === "ACTIVE" && (
        <div className="mt-5 rounded-lg bg-blue-50 p-3 text-blue-700">
          Payment completed. Your rental is active.
        </div>
      )}

    </div>
  );
}