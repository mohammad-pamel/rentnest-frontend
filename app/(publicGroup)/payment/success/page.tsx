
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

  const sessionId = params.session_id;

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 text-center shadow-sm dark:bg-card">

        <div className="mb-4 text-5xl">
          {sessionId ? "✅" : "⚠️"}
        </div>

        <h1 className="text-3xl font-bold">
          {sessionId
            ? "Payment Received"
            : "Payment Verification Required"}
        </h1>

        <p className="mt-3 text-gray-500 dark:text-muted-foreground">
          {sessionId
            ? "Your payment session has been received. Please allow some time for payment confirmation."
            : "We could not find your payment session. Please check your payment history before trying again."}
        </p>

        {sessionId && (
          <div className="mt-4 rounded-lg bg-gray-50 p-3 dark:bg-muted">
            <p className="text-xs text-gray-500 dark:text-muted-foreground">
              Stripe Session ID
            </p>

            <p className="mt-1 break-all text-xs font-medium">
              {sessionId}
            </p>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">

          <Link
            href="/tenant-dashboard"
            className="flex-1"
          >
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
