
"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { loginAction } from "../_actions/authActions";

type LoginState = {
  success: boolean;
  message: string;
};

const initialState: LoginState = {
  success: false,
  message: "",
};

export default function LoginForm() {
  const [state, action, pending] = useActionState(
    loginAction,
    initialState,
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state.success, state.message]);

  return (
    <form action={action}>
      <Card className="space-y-5 p-6">
        <div>
          <h2 className="text-2xl font-bold">
            Welcome Back
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Login to continue to your RentNest account.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address
          </label>

          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            required
            disabled={pending}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>

          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            disabled={pending}
          />
        </div>

        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={pending}
          className="w-full"
        >
          {pending ? "Logging in..." : "Login"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          No account yet?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Register
          </Link>
        </p>
      </Card>
    </form>
  );
}
