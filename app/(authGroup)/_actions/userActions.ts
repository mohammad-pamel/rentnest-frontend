"use server";

import { cookies } from "next/headers";

export const getMyProfileAction = async () => {
  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "You are not logged in",
      data: null,
    };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/users/me`,
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
          "Failed to fetch profile",
        data: null,
      };
    }

    return result;
  } catch (error) {
    console.error(
      "Get profile error:",
      error
    );

    return {
      success: false,
      message: "Failed to fetch profile",
      data: null,
    };
  }
};