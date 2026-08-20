"use server";

import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_API_URL;


export const createPropertyAction = async (
  data: {
    title: string;
    description: string;
    location: string;
    address: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    area: number;
    amenities: string[];
    images: string[];
    categoryId: string;
  }
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
      `${process.env.BACKEND_API_URL}/api/properties`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message:
          result.message ||
          "Failed to create property",
      };
    }

    return result;
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to create property",
    };
  }
};

export const getMyPropertiesAction = async () => {
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

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties/my`,
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
        "Failed to fetch your properties",
      data: [],
    };
  }

  return result;
  
};

export const updatePropertyAction = async (
  id: string,
  data: {
    title?: string;
    description?: string;
    location?: string;
    address?: string;
    price?: number;
    bedrooms?: number;
    bathrooms?: number;
    area?: number;
    amenities?: string[];
    images?: string[];
    categoryId?: string;
  }
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
    `${process.env.BACKEND_API_URL}/api/properties/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }
  );

  const result = await res.json();

  if (!res.ok || !result.success) {
    return {
      success: false,
      message:
        result.message ||
        "Failed to update property",
    };
  }

  return result;
};





export const deletePropertyAction = async (
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
      `${process.env.BACKEND_API_URL}/api/properties/${id}`,
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
          "Failed to delete property",
      };
    }

    return result;
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to delete property",
    };
  }
};