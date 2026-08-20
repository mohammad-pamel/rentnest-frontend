"use server";

import { cookies } from "next/headers";

const getAccessToken = async () => {
  const cookieStore = await cookies();

  return cookieStore.get("accessToken")?.value;
};


export const getAllUsersAction = async () => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return {
      success: false,
      message: "You are not logged in",
      data: [],
    };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/users`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const result = await res.json();

    console.log("ADMIN USERS RESPONSE:", result);

    if (!res.ok || !result.success) {
      return {
        success: false,
        message:
          result.message || "Failed to fetch users",
        data: [],
      };
    }

    return result;
  } catch (error) {
    console.error("Get users error:", error);

    return {
      success: false,
      message: "Failed to fetch users",
      data: [],
    };
  }
};

export const updateUserStatusAction = async (
  id: string,
  status: "ACTIVE" | "BANNED"
) => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return {
      success: false,
      message: "You are not logged in",
    };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/users/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          status,
        }),
      }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message:
          result.message || "Failed to update user status",
      };
    }

    return result;
  } catch (error) {
    console.error("Update user status error:", error);

    return {
      success: false,
      message: "Failed to update user status",
    };
  }
};


export const getAllPropertiesAction = async () => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return {
      success: false,
      message: "You are not logged in",
      data: [],
    };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/properties`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const result = await res.json();

    console.log(
      "ADMIN PROPERTIES RESPONSE:",
      result
    );

    if (!res.ok || !result.success) {
      return {
        success: false,
        message:
          result.message ||
          "Failed to fetch properties",
        data: [],
      };
    }

    return result;
    
  } catch (error) {
    console.error(
      "Get properties error:",
      error
    );

    return {
      success: false,
      message: "Failed to fetch properties",
      data: [],
    };
  }
};


export const getAllRentalsAction = async () => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return {
      success: false,
      message: "You are not logged in",
      data: [],
    };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/rentals`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const result = await res.json();

    console.log(
      "ADMIN RENTALS RESPONSE:",
      result
    );

    if (!res.ok || !result.success) {
      return {
        success: false,
        message:
          result.message ||
          "Failed to fetch rentals",
        data: [],
      };
    }

    return result;
  } catch (error) {
    console.error(
      "Get rentals error:",
      error
    );

    return {
      success: false,
      message: "Failed to fetch rentals",
      data: [],
    };
  }
};