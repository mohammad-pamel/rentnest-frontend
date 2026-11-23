
"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { createPaymentAction } from "../_actions/rentalActions";

type PaymentButtonProps = {
  rentalRequestId: string;
};

export default function PaymentButton({
  rentalRequestId,
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const result = await createPaymentAction(
        rentalRequestId
      );

      if (!result.success) {
        toast.error(
          result.message || "Payment initialization failed"
        );
        return;
      }

      const checkoutUrl = result.data?.url?.checkoutUrl;

      if (!checkoutUrl) {
        toast.error("Payment checkout URL not found");
        return;
      }

      try {
        const url = new URL(checkoutUrl);

        if (url.protocol !== "https:") {
          toast.error("Invalid payment checkout URL");
          return;
        }
      } catch {
        toast.error("Invalid payment checkout URL");
        return;
      }

      window.location.assign(checkoutUrl);
    } catch (error) {
      console.error("Payment initialization error:", error);

      toast.error("Unable to initialize payment");
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handlePayment}
      disabled={loading}
      className="mt-5"
    >
      {loading ? "Redirecting..." : "Pay Now"}
    </Button>
  );
}
