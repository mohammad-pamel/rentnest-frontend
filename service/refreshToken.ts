"use server";

import { cookies } from "next/headers";

export const getNewAccessToken = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return { success: false, message: "Refresh token not found!" };
  }

  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/api/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}`,
      },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });
    const result = await response.json();

    if (!response.ok || !result.success || !result.data?.accessToken) {
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
      return {
        success: false,
        message: result.message || "Could not refresh your session. Please log in again.",
      };
    }

    const isProduction = process.env.NODE_ENV === "production";
    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return result;
  } catch {
    return { success: false, message: "Unable to refresh your session. Please try again." };
  }
};
