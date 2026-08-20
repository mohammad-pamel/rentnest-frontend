"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/service/logout";
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

// Navigation items configuration
const navItems = [
  { label: "Home", href: "/" },
  { label: "Property", href: "/property" },
  { label: "Paymennt", href: "/payment" },
];

// User menu items configuration
const userMenuItems = [
  { label: "Profile", icon: User, action: "profile" },
  { label: "Settings", icon: Settings, action: "settings" },
];

/*
"data": {
        "profile": {
            "id": "245e986e-a3a9-46f4-be34-c9854dbe75c4",
            "name": "Tenant",
            "email": "tenant@gmail.com",
            "phone": "01798275025",
            "profileImage": null,
            "role": "TENANT",
            "status": "ACTIVE",
            "isDeleted": false,
            "deletedAt": null,
            "createdAt": "2026-07-08T19:27:52.856Z",
            "updatedAt": "2026-07-08T19:27:52.856Z",
            "properties": []
        }
    }
*/

type IUser = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    profile: {
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
      properties: [];
    };
  };
};

type NavbarProps = {
  user: IUser;
};


export function Navbar({ user }: NavbarProps) {
  const router = useRouter();

  const role = user?.data?.profile?.role;

  const dashboardHref =
    role === "TENANT"
      ? "/tenant-dashboard"
      : role === "LANDLORD"
        ? "/landloard-dashboard"
        : role === "ADMIN"
          ? "/admin-dashboard"
          : "/login";

  const handleUserMenuAction = async (action: string) => {
    if (action === "logout") {
      await logout();
      toast.success("User Logged Out Successfully!");
      router.push("/login");
    }
  };

  return (
    <nav className="border-2 border-b-green-700 mb-14">
      <div className="max-w-11/12 mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="shrink-0">
            <span className="text-2xl font-bold text-primary">
              Rentnest
            </span>
          </Link>

          <div className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:flex md:items-center md:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}

            {user.success && (
              <Link
                href={dashboardHref}
                className="text-foreground hover:text-primary transition-colors text-sm font-medium"
              >
                Dashboard
              </Link>
            )}
          </div>

          {user.success ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">
                      {user.data?.profile.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {user.data?.profile.email}
                    </p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {userMenuItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <DropdownMenuItem
                      key={item.action}
                      onClick={() =>
                        handleUserMenuAction(item.action)
                      }
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      <span>{item.label}</span>
                    </DropdownMenuItem>
                  );
                })}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={async () => {
                    await handleUserMenuAction("logout");
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button className="cursor-pointer">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}