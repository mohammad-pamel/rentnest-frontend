
"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { createRentalRequestAction } from "../_actions/RentalRequestActions";

type RequestRentalFormProps = {
  propertyId: string;
};

type RentalRequestState = {
  success: boolean;
  message: string;
};

const initialState: RentalRequestState = {
  success: false,
  message: "",
};

export default function RequestRentalForm({
  propertyId,
}: RequestRentalFormProps) {
  const [state, action, pending] = useActionState(
    createRentalRequestAction,
    initialState,
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state.success, state.message]);

  return (
    <form action={action}>
      <Card className="space-y-5 p-5">
        <div>
          <h2 className="text-xl font-bold">
            Request to Rent
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Submit your rental request to the landlord.
          </p>
        </div>

        <input
          type="hidden"
          name="propertyId"
          value={propertyId}
        />

        <div className="space-y-2">
          <label
            htmlFor="moveInDate"
            className="text-sm font-medium"
          >
            Preferred Move-in Date
          </label>

          <Input
            id="moveInDate"
            name="moveInDate"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            required
            disabled={pending}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="months"
            className="text-sm font-medium"
          >
            Rental Duration (Months)
          </label>

          <Input
            id="months"
            name="months"
            type="number"
            min="1"
            max="120"
            placeholder="How many months?"
            required
            disabled={pending}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-sm font-medium"
          >
            Message to Landlord
          </label>

          <Textarea
            id="message"
            name="message"
            placeholder="Write your message..."
            rows={4}
            required
            disabled={pending}
          />
        </div>

        <Button
          type="submit"
          disabled={pending}
          className="w-full"
        >
          {pending ? "Submitting Request..." : "Request to Rent"}
        </Button>
      </Card>
    </form>
  );
}
