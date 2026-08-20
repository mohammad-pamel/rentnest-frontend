// import { cookies } from "next/headers";
// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// interface PropertyParams {
//   searchTerm?: string;
//   location?: string;
//   minPrice?: string;
//   maxPrice?: string;
//   categoryId?: string;
//   bedrooms?: string;
//   isAvailable?: string;
//   page?: string;
//   limit?: string;
//   sortBy?: string;
//   sortOrder?: string;
// }



// interface PropertyParams {
//   searchTerm?: string;
//   location?: string;
//   minPrice?: string;
//   maxPrice?: string;
//   categoryId?: string;
//   bedrooms?: string;
//   isAvailable?: string;
//   page?: string;
//   limit?: string;
//   sortBy?: string;
//   sortOrder?: string;
// }

// export async function getProperties(params?: PropertyParams) {
//   const searchParams = new URLSearchParams();

//   if (params?.location)
//     searchParams.append("location", params.location);

//   if (params?.minPrice)
//     searchParams.append("minPrice", params.minPrice);

//   if (params?.maxPrice)
//     searchParams.append("maxPrice", params.maxPrice);

//   if (params?.categoryId)
//     searchParams.append("categoryId", params.categoryId);

//   if (params?.searchTerm)
//     searchParams.append("searchTerm", params.searchTerm);

//   if (params?.bedrooms)
//     searchParams.append("bedrooms", params.bedrooms);

//   if (params?.isAvailable)
//     searchParams.append("isAvailable", params.isAvailable);

//   if (params?.page)
//     searchParams.append("page", params.page);

//   if (params?.limit)
//     searchParams.append("limit", params.limit);

//   if (params?.sortBy)
//     searchParams.append("sortBy", params.sortBy);

//   if (params?.sortOrder)
//     searchParams.append("sortOrder", params.sortOrder);

//   const res = await fetch(
//     `${API_URL}/api/properties?${searchParams.toString()}`,
//     {
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch properties");
//   }

//   return res.json();
// }



// export async function getProperty(id: string) {
//   const res = await fetch(
//     `${API_URL}/api/properties/${id}`,
//     {
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch property");
//   }

//   return res.json();
// }




// export async function createProperty(data: any) {

//   const res = await fetch(
//     `${API_URL}/api/properties`,
//     {
//       method: "POST",

//       headers: {
//         "Content-Type": "application/json",
//       },

//       credentials: "include",

//       body: JSON.stringify(data),
//     }
//   );

//   const result = await res.json();

//   if (!res.ok || !result.success) {
//     throw new Error(
//       result.message || "Failed to create property"
//     );
//   }

//   return result;
// }



// export async function updateProperty(
//   id: string,
//   data: any
// ) {

//   const res = await fetch(
//     `${API_URL}/api/properties/${id}`,
//     {
//       method: "PATCH",

//       headers: {
//         "Content-Type": "application/json",
//       },

//       credentials: "include",

//       body: JSON.stringify(data),
//     }
//   );

//   const result = await res.json();

//   if (!res.ok || !result.success) {
//     throw new Error(
//       result.message || "Failed to update property"
//     );
//   }

//   return result;
// }



// export async function deleteProperty(
//   id: string
// ) {

//   const res = await fetch(
//     `${API_URL}/api/properties/${id}`,
//     {
//       method: "DELETE",

//       credentials: "include",
//     }
//   );

//   const result = await res.json();

//   if (!res.ok || !result.success) {
//     throw new Error(
//       result.message || "Failed to delete property"
//     );
//   }

//   return result;
// }



// export async function getCategories() {

//   const res = await fetch(
//     `${API_URL}/api/categories`,
//     {
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch categories");
//   }

//   return res.json();
// }



// export async function loginUser(data: any) {

//   const res = await fetch(
//     `${API_URL}/api/auth/login`,
//     {
//       method: "POST",

//       headers: {
//         "Content-Type": "application/json",
//       },

//       credentials: "include",

//       body: JSON.stringify(data),
//     }
//   );

//   return res.json();
// }



// export async function registerUser(data: any) {

//   const res = await fetch(
//     `${API_URL}/api/auth/register`,
//     {
//       method: "POST",

//       headers: {
//         "Content-Type": "application/json",
//       },

//       body: JSON.stringify(data),
//     }
//   );

//   return res.json();
// }


// export const getMyProfile = async () => {
//   try {
//     const cookieStore = await cookies();

//     const accessToken =
//       cookieStore.get("accessToken")?.value;

//     if (!accessToken) {
//       return {
//         success: false,
//         message: "You are not logged in",
//         data: null,
//       };
//     }

//     const res = await fetch(
//       `${process.env.BACKEND_API_URL}/api/users/me`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//         cache: "no-store",
//       }
//     );

//     const result = await res.json();

//     if (!res.ok || !result.success) {
//       return {
//         success: false,
//         message:
//           result.message ||
//           "Failed to fetch profile",
//         data: null,
//       };
//     }

//     return result;
//   } catch (error) {
//     console.error(
//       "Get profile error:",
//       error
//     );

//     return {
//       success: false,
//       message: "Failed to fetch profile",
//       data: null,
//     };
//   }
// };











import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface PropertyParams {
  searchTerm?: string;
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  categoryId?: string;
  bedrooms?: string;
  isAvailable?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface Category {
  id: string;
  name: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Landlord {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage: string | null;
  role: string;
  status: string;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Property {
  id: string;
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
  landlordId: string;

  isAvailable: boolean;
  isDeleted: boolean;
  deletedAt: string | null;

  createdAt: string;
  updatedAt: string;

  category: Category;
  landlord?: Landlord;
}

export interface PropertyListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Property[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage?: number;
  };
}

export interface PropertyResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Property;
}

export interface CreatePropertyInput {
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

export interface UpdatePropertyInput {
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

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: "TENANT" | "LANDLORD";
}

export interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken?: string;
    user?: {
      id: string;
      name: string;
      email: string;
      role: "ADMIN" | "TENANT" | "LANDLORD";
      status: "ACTIVE" | "BANNED";
    };
  };
}

export interface RegisterResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      phone?: string | null;
      role: "TENANT" | "LANDLORD";
      status: "ACTIVE" | "BANNED";
      isDeleted: boolean;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  profileImage: string | null;
  role: "ADMIN" | "TENANT" | "LANDLORD";
  status: "ACTIVE" | "BANNED";
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  properties: Property[];
}

export interface ProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    profile: Profile;
  };
}

export async function getProperties(
  params?: PropertyParams
): Promise<PropertyListResponse> {
  const searchParams = new URLSearchParams();

  if (params?.location) {
    searchParams.append("location", params.location);
  }

  if (params?.minPrice) {
    searchParams.append("minPrice", params.minPrice);
  }

  if (params?.maxPrice) {
    searchParams.append("maxPrice", params.maxPrice);
  }

  if (params?.categoryId) {
    searchParams.append("categoryId", params.categoryId);
  }

  if (params?.searchTerm) {
    searchParams.append("searchTerm", params.searchTerm);
  }

  if (params?.bedrooms) {
    searchParams.append("bedrooms", params.bedrooms);
  }

  if (params?.isAvailable) {
    searchParams.append("isAvailable", params.isAvailable);
  }

  if (params?.page) {
    searchParams.append("page", params.page);
  }

  if (params?.limit) {
    searchParams.append("limit", params.limit);
  }

  if (params?.sortBy) {
    searchParams.append("sortBy", params.sortBy);
  }

  if (params?.sortOrder) {
    searchParams.append("sortOrder", params.sortOrder);
  }

  const res = await fetch(
    `${API_URL}/api/properties?${searchParams.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch properties");
  }

  return (await res.json()) as PropertyListResponse;
}

export async function getProperty(
  id: string
): Promise<PropertyResponse> {
  const res = await fetch(
    `${API_URL}/api/properties/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch property");
  }

  return (await res.json()) as PropertyResponse;
}

export async function createProperty(
  data: CreatePropertyInput
): Promise<PropertyResponse> {
  const res = await fetch(
    `${API_URL}/api/properties`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );

  const result =
    (await res.json()) as PropertyResponse;

  if (!res.ok || !result.success) {
    throw new Error(
      result.message || "Failed to create property"
    );
  }

  return result;
}

export async function updateProperty(
  id: string,
  data: UpdatePropertyInput
): Promise<PropertyResponse> {
  const res = await fetch(
    `${API_URL}/api/properties/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );

  const result =
    (await res.json()) as PropertyResponse;

  if (!res.ok || !result.success) {
    throw new Error(
      result.message || "Failed to update property"
    );
  }

  return result;
}

export async function deleteProperty(
  id: string
): Promise<{
  success: boolean;
  statusCode: number;
  message: string;
  data: Property;
}> {
  const res = await fetch(
    `${API_URL}/api/properties/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const result =
    (await res.json()) as {
      success: boolean;
      statusCode: number;
      message: string;
      data: Property;
    };

  if (!res.ok || !result.success) {
    throw new Error(
      result.message || "Failed to delete property"
    );
  }

  return result;
}

export async function getCategories(): Promise<{
  success: boolean;
  statusCode: number;
  message: string;
  data: Category[];
}> {
  const res = await fetch(
    `${API_URL}/api/categories`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return (await res.json()) as {
    success: boolean;
    statusCode: number;
    message: string;
    data: Category[];
  };
}

export async function loginUser(
  data: LoginInput
): Promise<LoginResponse> {
  const res = await fetch(
    `${API_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );

  return (await res.json()) as LoginResponse;
}

export async function registerUser(
  data: RegisterInput
): Promise<RegisterResponse> {
  const res = await fetch(
    `${API_URL}/api/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return (await res.json()) as RegisterResponse;
}

export const getMyProfile =
  async (): Promise<ProfileResponse | {
    success: false;
    message: string;
    data: null;
  }> => {
    try {
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

      const result =
        (await res.json()) as ProfileResponse;

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