"use client";

import { useState } from "react";
import Link from "next/link";
// import { loginUser } from "@/lib/api";
// import { saveToken } from "@/lib/cookies";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/app/lib/api";
import { saveToken } from "@/app/lib/cookies";

export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        setLoading(true);

        const result = await loginUser({
            email,
            password,
        });

        setLoading(false);

        if (result.success) {

            saveToken(result.data.accessToken);

            alert("Login Successful");

            router.push("/");

        } else {

            alert(result.message);

        }
    }

    return (
        <Card className="p-8">

            <h1 className="mb-6 text-center text-3xl font-bold">
                Login
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <div>

                    <Label>Email</Label>

                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </div>

                <div>

                    <Label>Password</Label>

                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                >

                    {loading ? "Logging..." : "Login"}

                </Button>

            </form>

            <p className="mt-6 text-center">

                Dont have an account?

                <Link
                    href="/register"
                    className="ml-2 text-blue-600"
                >
                    Register
                </Link>

            </p>

        </Card>
    );
}