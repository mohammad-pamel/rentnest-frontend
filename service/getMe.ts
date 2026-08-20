"use server";

import { cookies } from "next/headers";

export const getMe = async () => {
  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
      data: null,
    };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/users/me`,
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
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
          "Failed to fetch user profile",
        data: null,
      };
    }

    return result;
  } catch (error) {
    console.error("Get me error:", error);

    return {
      success: false,
      message: "Failed to fetch user profile",
      data: null,
    };
  }
};