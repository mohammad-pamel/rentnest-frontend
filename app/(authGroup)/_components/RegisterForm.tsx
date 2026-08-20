"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { registerUserAction } from "../_actions/registerActions";

export default function RegisterForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<
    "TENANT" | "LANDLORD"
  >("TENANT");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await registerUserAction({
        name,
        email,
        password,
        phone: phone || undefined,
        role,
      });

      if (!result.success) {
        toast.error(
          result.message || "Registration failed"
        );
        return;
      }

      toast.success(
        result.message ||
          "Registration successful"
      );

      router.push("/login");
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block font-medium">
          Name
        </label>

        <Input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Enter your name"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Email
        </label>

        <Input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Password
        </label>

        <Input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          placeholder="Enter your password"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Phone
        </label>

        <Input
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          placeholder="Enter your phone number"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Register As
        </label>

        <select
          value={role}
          onChange={(e) =>
            setRole(
              e.target.value as
                | "TENANT"
                | "LANDLORD"
            )
          }
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="TENANT">
            Tenant
          </option>

          <option value="LANDLORD">
            Landlord
          </option>
        </select>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading
          ? "Creating Account..."
          : "Create Account"}
      </Button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
}