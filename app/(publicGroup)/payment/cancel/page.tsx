import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 text-center shadow-sm">

        <div className="mb-4 text-5xl">
          ❌
        </div>

        <h1 className="text-3xl font-bold">
          Payment Cancelled
        </h1>

        <p className="mt-3 text-gray-500">
          Your payment was cancelled. No payment
          was completed.
        </p>

        <div className="mt-6">
          <Link href="/tenant-dashboard">
            <Button className="w-full">
              Back to Dashboard
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}