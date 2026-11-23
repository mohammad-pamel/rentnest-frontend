
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Building2,
  Check,
  ChevronDown,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Sun,
  User,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { logout } from "@/service/logout";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  user: IUser | null;
};

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Properties", href: "/property", icon: Building2 },
  { label: "Payment", href: "/payment", icon: Check },
];

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const profile = user?.data?.profile;
  const isLoggedIn = Boolean(user?.success && profile);

  const role = profile?.role;

  const dashboardHref =
    role === "TENANT"
      ? "/tenant-dashboard"
      : role === "LANDLORD"
        ? "/landloard-dashboard"
        : role === "ADMIN"
          ? "/admin-dashboard"
          : "/login";

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href);

  const handleLogout = async () => {
    if (loggingOut) return;

    try {
      setLoggingOut(true);

      await logout();

      toast.success("Logged out successfully!");

      setMobileMenuOpen(false);
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Unable to logout. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const ThemeToggle = () => (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="rounded-full"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      title="Toggle dark/light mode"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex shrink-0 items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Building2 className="h-5 w-5" />
            </div>

            <span className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
              Rent<span className="text-primary">Nest</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}

            {isLoggedIn && (
              <Link
                href={dashboardHref}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  pathname.startsWith(dashboardHref)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Desktop Authentication */}
            <div className="hidden items-center gap-2 sm:flex">
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 rounded-full border border-border px-3"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <User className="h-4 w-4" />
                      </div>

                      <span className="max-w-28 truncate text-sm font-semibold">
                        {profile?.name}
                      </span>

                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-64"
                  >
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold">
                          {profile?.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {profile?.email}
                        </p>

                        <span className="mt-1 w-fit rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {profile?.role}
                        </span>
                      </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                      <Link href={dashboardHref}>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="cursor-pointer text-destructive focus:text-destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {loggingOut ? "Logging out..." : "Log out"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" className="font-semibold">
                      Login
                    </Button>
                  </Link>

                  <Link href="/register">
                    <Button className="rounded-full px-5 font-semibold shadow-sm">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="icon"
              className="rounded-lg sm:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-border py-4 sm:hidden">
            <div className="flex flex-col gap-1">

              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}

              {isLoggedIn && (
                <>
                  <Link
                    href={dashboardHref}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    Dashboard
                  </Link>

                  <div className="my-2 border-t border-border" />

                  <div className="flex items-center gap-3 px-4 py-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <User className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {profile?.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {profile?.email}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    disabled={loggingOut}
                    onClick={handleLogout}
                    className="mt-1 justify-start gap-3 px-4 text-destructive hover:text-destructive"
                  >
                    <LogOut className="h-5 w-5" />
                    {loggingOut ? "Logging out..." : "Log out"}
                  </Button>
                </>
              )}

              {!isLoggedIn && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    asChild
                    onClick={closeMobileMenu}
                  >
                    <Link href="/login">Login</Link>
                  </Button>

                  <Button
                    asChild
                    onClick={closeMobileMenu}
                  >
                    <Link href="/register">Get Started</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
