// "use server";

// import { cookies } from "next/headers";

// export const createReviewAction = async (
//   data: {
//     propertyId: string;
//     rating: number;
//     comment: string;
//   }
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

//   try {
//     const res = await fetch(
//       `${process.env.BACKEND_API_URL}/api/reviews`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify(data),
//       }
//     );

//     const result = await res.json();

//     if (!res.ok || !result.success) {
//       return {
//         success: false,
//         message:
//           result.message ||
//           "Failed to create review",
//       };
//     }

//     return result;
//   } catch (error) {
//     console.error("Create review error:", error);

//     return {
//       success: false,
//       message: "Something went wrong",
//     };
//   }
// };

// export const getPropertyReviewsAction = async (
//   propertyId: string
// ) => {
//   try {
//     const res = await fetch(
//       `${process.env.BACKEND_API_URL}/api/reviews/${propertyId}`,
//       {
//         method: "GET",
//         cache: "no-store",
//       }
//     );

//     const result = await res.json();

//     if (!res.ok || !result.success) {
//       return {
//         success: false,
//         message:
//           result.message ||
//           "Failed to fetch reviews",
//         data: [],
//       };
//     }

//     return result;
//   } catch (error) {
//     console.error("Get reviews error:", error);

//     return {
//       success: false,
//       message: "Failed to fetch reviews",
//       data: [],
//     };
//   }
// };




// "use server";

// import { cookies } from "next/headers";

// interface CreateReviewData {
//   propertyId: string;
//   rating: number;
//   comment: string;
// }

// interface Review {
//   id: string;
//   rating: number;
//   comment: string;
//   tenantId: string;
//   propertyId: string;
//   createdAt: string;
//   tenant?: {
//     id: string;
//     name: string;
//     email: string;
//     phone: string | null;
//     profileImage: string | null;
//     role: string;
//     status: string;
//   };
// }

// interface ReviewResponse {
//   success: boolean;
//   statusCode?: number;
//   message: string;
//   data?: Review;
// }

// interface ReviewsResponse {
//   success: boolean;
//   statusCode?: number;
//   message: string;
//   data: Review[];
// }

// export const createReviewAction = async (
//   data: CreateReviewData
// ): Promise<ReviewResponse> => {
//   const cookieStore = await cookies();

//   const accessToken =
//     cookieStore.get("accessToken")?.value;

//   if (!accessToken) {
//     return {
//       success: false,
//       message: "You are not logged in",
//     };
//   }

//   try {
//     const res = await fetch(
//       `${process.env.BACKEND_API_URL}/api/reviews`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify(data),
//       }
//     );

//     const result: ReviewResponse = await res.json();

//     if (!res.ok || !result.success) {
//       return {
//         success: false,
//         message:
//           result.message ||
//           "Failed to create review",
//       };
//     }

//     return result;
//   } catch (error) {
//     console.error(
//       "Create review error:",
//       error
//     );

//     return {
//       success: false,
//       message: "Something went wrong",
//     };
//   }
// };

// export const getPropertyReviewsAction = async (
//   propertyId: string
// ): Promise<ReviewsResponse> => {
//   try {
//     const res = await fetch(
//       `${process.env.BACKEND_API_URL}/api/reviews/${propertyId}`,
//       {
//         method: "GET",
//         cache: "no-store",
//       }
//     );

//     const result: ReviewsResponse =
//       await res.json();

//     if (!res.ok || !result.success) {
//       return {
//         success: false,
//         message:
//           result.message ||
//           "Failed to fetch reviews",
//         data: [],
//       };
//     }

//     return result;
//   } catch (error) {
//     console.error(
//       "Get reviews error:",
//       error
//     );

//     return {
//       success: false,
//       message: "Failed to fetch reviews",
//       data: [],
//     };
//   }
// };








// "use server";

// import { cookies } from "next/headers";

// interface CreateReviewData {
//   propertyId: string;
//   rating: number;
//   comment: string;
// }

// interface ReviewActionResponse {
//   success: boolean;
//   statusCode: number;
//   message: string;
//   data?: unknown;
// }

// interface ReviewsResponse {
//   success: boolean;
//   statusCode: number;
//   message: string;
//   data: unknown[];
// }

// export const createReviewAction = async (
//   data: CreateReviewData
// ): Promise<ReviewActionResponse> => {
//   const cookieStore = await cookies();

//   const accessToken =
//     cookieStore.get("accessToken")?.value;

//   if (!accessToken) {
//     return {
//       success: false,
//       statusCode: 401,
//       message: "You are not logged in",
//     };
//   }

//   try {
//     const res = await fetch(
//       `${process.env.BACKEND_API_URL}/api/reviews`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify(data),
//       }
//     );

//     const result = await res.json();

//     if (!res.ok || !result.success) {
//       return {
//         success: false,
//         statusCode: res.status,
//         message:
//           result.message ||
//           "Failed to create review",
//       };
//     }

//     return {
//       success: true,
//       statusCode: res.status,
//       message: result.message,
//       data: result.data,
//     };
//   } catch (error) {
//     console.error("Create review error:", error);

//     return {
//       success: false,
//       statusCode: 500,
//       message: "Something went wrong",
//     };
//   }
// };

// export const getPropertyReviewsAction = async (
//   propertyId: string
// ): Promise<ReviewsResponse> => {
//   try {
//     const res = await fetch(
//       `${process.env.BACKEND_API_URL}/api/reviews/${propertyId}`,
//       {
//         method: "GET",
//         cache: "no-store",
//       }
//     );

//     const result = await res.json();

//     if (!res.ok || !result.success) {
//       return {
//         success: false,
//         statusCode: res.status,
//         message:
//           result.message ||
//           "Failed to fetch reviews",
//         data: [],
//       };
//     }

//     return {
//       success: true,
//       statusCode: res.status,
//       message: result.message,
//       data: result.data || [],
//     };
//   } catch (error) {
//     console.error("Get reviews error:", error);

//     return {
//       success: false,
//       statusCode: 500,
//       message: "Failed to fetch reviews",
//       data: [],
//     };
//   }
// };










"use server";

import { cookies } from "next/headers";

export interface CreateReviewData {
  propertyId: string;
  rating: number;
  comment: string;
}

export interface ReviewTenant {
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
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  tenantId: string;
  propertyId: string;
  createdAt: string;
  tenant: ReviewTenant;
}

export interface CreateReviewResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: Review;
}

export interface ReviewsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Review[];
}

export const createReviewAction = async (
  data: CreateReviewData
): Promise<CreateReviewResponse> => {
  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: "You are not logged in",
    };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/reviews`,
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
        statusCode: res.status,
        message:
          result.message ||
          "Failed to create review",
      };
    }

    return {
      success: true,
      statusCode: res.status,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.error("Create review error:", error);

    return {
      success: false,
      statusCode: 500,
      message: "Something went wrong",
    };
  }
};

export const getPropertyReviewsAction = async (
  propertyId: string
): Promise<ReviewsResponse> => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/reviews/${propertyId}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        statusCode: res.status,
        message:
          result.message ||
          "Failed to fetch reviews",
        data: [],
      };
    }

    return {
      success: true,
      statusCode: res.status,
      message: result.message,
      data: result.data || [],
    };
  } catch (error) {
    console.error("Get reviews error:", error);

    return {
      success: false,
      statusCode: 500,
      message: "Failed to fetch reviews",
      data: [],
    };
  }
};