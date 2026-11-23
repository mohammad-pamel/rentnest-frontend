"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation"
import jwt, { JwtPayload }  from 'jsonwebtoken';

type LoginState = {
    success : true,
    statusCode : number,
    message : string,
    data : {
        accessToken : string,
        refreshToken : string
    }
}


export const loginAction = async (prevState: LoginState, formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    const payload = {
        email,
        password
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    const result = await res.json();

    // console.log(result);

        if(result.success){
        const cookieStore = await cookies()

        cookieStore.set("accessToken", result.data.accessToken , {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24,
            sameSite: "lax",
            path: "/",
        });
        cookieStore.set("refreshToken", result.data.refreshToken , {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax",
            path: "/",
        });

       const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

        if(decodedToken.role === "TENANT"){
            redirect("/tenant-dashboard");
        } else if (decodedToken.role === "ADMIN"){
            redirect("/admin-dashboard");
        } else if (decodedToken.role === "LANDLORD"){
            redirect("/landloard-dashboard");
        }
    }



    return result;
}