import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PaymentSuccessPageProps {
  searchParams: Promise<{
    session_id?: string;
  }>;
}

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const params = await searchParams;

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 text-center shadow-sm">

        <div className="mb-4 text-5xl">
          ✅
        </div>

        <h1 className="text-3xl font-bold">
          Payment Successful
        </h1>

        <p className="mt-3 text-gray-500">
          Your payment has been completed successfully.
          Your rental is now active.
        </p>

        {params.session_id && (
          <p className="mt-4 break-all text-xs text-gray-400">
            Session ID: {params.session_id}
          </p>
        )}

        <div className="mt-6 flex gap-3">
          <Link href="/tenant-dashboard" className="flex-1">
            <Button className="w-full">
              Dashboard
            </Button>
          </Link>

          <Link
            href="/tenant-dashboard/payments"
            className="flex-1"
          >
            <Button
              variant="outline"
              className="w-full"
            >
              My Payments
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}