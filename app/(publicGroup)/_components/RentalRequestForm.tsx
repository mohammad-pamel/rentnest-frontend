"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useActionState, useEffect } from "react";
import { createRentalRequestAction } from "../_actions/RentalRequestActions";

type RequestRentalFormProps = {
  propertyId: string;
};

const initialState = {
  success: false,
  message: "",
};

const RequestRentalForm = ({
  propertyId,
}: RequestRentalFormProps) => {
  const [state, action, pending] = useActionState(
    createRentalRequestAction,
    initialState
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(
        state.message || "Rental request submitted successfully"
      );
    } else {
      toast.error(
        state.message || "Failed to submit rental request"
      );
    }
  }, [state]);

  return (
    <form action={action} className="space-y-4">
      <Card className="space-y-4 p-5">

        <input
          type="hidden"
          name="propertyId"
          value={propertyId}
        />

        <Input
          name="moveInDate"
          type="date"
          required
        />

        <Input
          name="months"
          type="number"
          min="1"
          placeholder="How many months?"
          required
        />

        <Textarea
          name="message"
          placeholder="Write your message..."
          required
        />

        <Button
          type="submit"
          disabled={pending}
          className="w-full"
        >
          {pending
            ? "Submitting..."
            : "Request To Rent"}
        </Button>

      </Card>
    </form>
  );
};

export default RequestRentalForm;