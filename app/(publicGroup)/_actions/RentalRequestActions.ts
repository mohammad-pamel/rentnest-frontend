"use server";

import { cookies } from "next/headers";

type RentalRequestState = {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: unknown;
};

export const createRentalRequestAction = async (
  prevState: RentalRequestState,
  formData: FormData
): Promise<RentalRequestState> => {
  const propertyId = formData.get("propertyId");
  const message = formData.get("message");
  const moveInDate = formData.get("moveInDate");
  const months = formData.get("months");

  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "You must login first",
    };
  }

  const payload = {
    propertyId,
    message,
    moveInDate: new Date(`${moveInDate}T00:00:00.000Z`).toISOString(),
    months: Number(months),
  };

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rentals`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    }
  );

  const result = await res.json();

  if (!res.ok || !result.success) {
    return {
      success: false,
      statusCode: result.statusCode,
      message: result.message || "Failed to create rental request",
    };
  }

  return result;
};