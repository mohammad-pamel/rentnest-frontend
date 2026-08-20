"use server";

export const registerUserAction = async (data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: "TENANT" | "LANDLORD";
}) => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message:
          result.message || "Registration failed",
      };
    }

    return result;
  } catch (error) {
    console.error("Registration error:", error);

    return {
      success: false,
      message: "Something went wrong during registration",
    };
  }
};