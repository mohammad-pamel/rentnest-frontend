"use server";

import { cookies } from "next/headers";


export const getAllCategoriesAction = async () => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/categories`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message:
          result.message ||
          "Failed to fetch categories",
        data: [],
      };
    }

    return result;
  } catch (error) {
    console.error(
      "Get categories error:",
      error
    );

    return {
      success: false,
      message: "Failed to fetch categories",
      data: [],
    };
  }
};


export const createCategoryAction = async (
  name: string
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
      `${process.env.BACKEND_API_URL}/api/categories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name,
        }),
      }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message:
          result.message ||
          "Failed to create category",
      };
    }

    return result;
  } catch (error) {
    console.error(
      "Create category error:",
      error
    );

    return {
      success: false,
      message: "Failed to create category",
    };
  }
};


export const updateCategoryAction = async (
  id: string,
  name: string
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
      `${process.env.BACKEND_API_URL}/api/categories/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name,
        }),
      }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message:
          result.message ||
          "Failed to update category",
      };
    }

    return result;
  } catch (error) {
    console.error(
      "Update category error:",
      error
    );

    return {
      success: false,
      message: "Failed to update category",
    };
  }
};


export const deleteCategoryAction = async (
  id: string
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
      `${process.env.BACKEND_API_URL}/api/categories/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message:
          result.message ||
          "Failed to delete category",
      };
    }

    return result;
  } catch (error) {
    console.error(
      "Delete category error:",
      error
    );

    return {
      success: false,
      message: "Failed to delete category",
    };
  }
};