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
    try {
      setLoading(true);

      const result =
        await createPaymentAction(
          rentalRequestId
        );

      if (!result.success) {
        toast.error(
          result.message ||
            "Payment initialization failed"
        );
        return;
      }

      if (!result.data?.checkoutUrl) {
        toast.error(
          "Payment URL not found"
        );
        return;
      }

      toast.success(
        "Redirecting to payment..."
      );

      window.location.href =
        result.data.checkoutUrl;

    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      className="mt-5"
    >
      {loading
        ? "Processing..."
        : "Pay Now"}
    </Button>
  );
}