"use server";

import { cookies } from "next/headers";

// export const createPaymentAction = async (

//   rentalRequestId: string
// ) => {
//   const cookieStore = await cookies();

//   const accessToken =
//     cookieStore.get("accessToken")?.value;

//   if (!accessToken) {
//     return {
//       success: false,
//       message: "You are not logged in",
//     };
//   }

//   const res = await fetch(
//     `${process.env.BACKEND_API_URL}/api/payments/create`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: JSON.stringify({
//         rentalRequestId,
//       }),
//     }
//   );

//   const result = await res.json();

//   console.log("Payment API Result:", result);

//   if (!res.ok || !result.success) {
//     return {
//       success: false,
//       message:
//         result.message ||
//         "Payment initialization failed",
//     };
//   }

//   return result;
// };




export const getMyPaymentsAction = async () => {
  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "You are not logged in",
      data: [],
    };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/payments/my`,
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
          "Failed to fetch payments",
        data: [],
      };
    }

    return result;
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to fetch payments",
      data: [],
    };
  }
};