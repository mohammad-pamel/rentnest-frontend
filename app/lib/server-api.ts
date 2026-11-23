
import "server-only";

import { cookies } from "next/headers";
import type { ProfileResponse } from "./api";

export type MyProfileResult =
  | ProfileResponse
  | {
      success: false;
      message: string;
      data: null;
    };

export async function getMyProfile(): Promise<MyProfileResult> {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "You are not logged in",
        data: null,
      };
    }

    const backendUrl = process.env.BACKEND_API_URL;

    if (!backendUrl) {
      throw new Error("BACKEND_API_URL is not configured");
    }

    const res = await fetch(`${backendUrl}/api/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    const result = (await res.json()) as ProfileResponse;

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to fetch profile",
        data: null,
      };
    }

    return result;
  } catch (error) {
    console.error("Get profile error:", error);

    return {
      success: false,
      message: "Failed to fetch profile",
      data: null,
    };
  }
}
