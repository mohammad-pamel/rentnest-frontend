"use server";

import { cookies } from "next/headers";

export const getMyRentalRequestsAction = async (
  query?: string
) => {
  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "You are not logged in",
      data: [],
      meta: {
        page: 1,
        limit: 10,
        total: 0,
      },
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rentals/my${
      query ? `?${query}` : ""
    }`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (!res.ok || !result.success) {
    return {
      success: false,
      message:
        result.message || "Failed to fetch rental requests",
      data: [],
      meta: {
        page: 1,
        limit: 10,
        total: 0,
      },
    };
  }

  return result;
};


export const getLandlordRequestsAction = async (
  query?: string
) => {
  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "You are not logged in",
      data: [],
      meta: {
        page: 1,
        limit: 10,
        total: 0,
      },
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rentals/landlord${
      query ? `?${query}` : ""
    }`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (!res.ok || !result.success) {
    return {
      success: false,
      message:
        result.message ||
        "Failed to fetch rental requests",
      data: [],
      meta: {
        page: 1,
        limit: 10,
        total: 0,
      },
    };
  }

  return result;
};


export const updateRentalStatusAction = async (
  id: string,
  status: "APPROVED" | "REJECTED"
) => {
  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "You are not logged in",
    };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/rentals/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          status,
        }),
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message:
          result.message ||
          "Failed to update rental status",
      };
    }

    return result;
  } catch (error) {
    console.error("Update rental status error:", error);

    return {
      success: false,
      message: "Something went wrong while updating rental status",
    };
  }
};


export const createPaymentAction = async (
  rentalRequestId: string
) => {
  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "You are not logged in",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/payments/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        rentalRequestId,
      }),
    }
  );

  const result = await res.json();

  console.log("Payment Result:", result);

  if (!res.ok || !result.success) {
    return {
      success: false,
      message:
        result.message ||
        "Payment initialization failed",
    };
  }

  return result;
};