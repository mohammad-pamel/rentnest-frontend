// // "use client";

// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuLabel,
// //   DropdownMenuSeparator,
// //   DropdownMenuTrigger,
// // } from "@/components/ui/dropdown-menu";
// // import { NavbarProps } from "@/lib/types";
// // import { logout } from "@/service/logout";
// // import { LayoutDashboard, LogOut, Settings, User } from "lucide-react";
// // import Link from "next/link";
// // import { useRouter } from "next/navigation";
// // import { toast } from "sonner";
// // import { Button } from "../ui/button";

// // // Navigation items configuration
// // const navItems = [
// //   { label: "Home", href: "/" },
// //   { label: "About", href: "/about" },
// //   { label: "Services", href: "/services" },
// //   { label: "Contact", href: "/contact" },
// //   { label: "News", href: "/news" },
// //   { label: "Premium", href: "/premium" },
// // ];

// // // User menu items configuration
// // const userMenuItems = [
// //   { label : "Dashboard", icon : LayoutDashboard, action : "dashboard"},
// //   { label: "Profile", icon: User, action: "profile" },
// //   { label: "Settings", icon: Settings, action: "settings" },
// // ];



// // export function Navbar({user} : NavbarProps) {
// //     const router = useRouter()
// //   const handleUserMenuAction = async (action: string) => {

// //     if(action === "dashboard" ){
// //       if(user.data.profile.role === "USER"){
// //         router.push("/dashboard")
// //       }
// //       else if(user.data.profile.role === "AUTHOR"){
// //         router.push("/author-dashboard")
// //       }
// //       else if(user.data.profile.role === "ADMIN"){
// //         router.push("/admin-dashboard")
// //       }

// //       return;
// //     }

// //     if(action === "logout"){
// //         await logout();
// //         toast.success("User Logged Out Successfully!");
// //         router.push("/login");
// //     }
// //   };

// //   return (
// //     <nav className="border-b border-border">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex items-center justify-between h-16">
// //           {/* Logo */}
// //           <Link href="/" className="shrink-0">
// //             <span className="text-2xl font-bold text-primary">
// //               NextJs Press
// //             </span>
// //           </Link>

// //           {/* Nav Links */}
// //           <div className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:flex md:items-center md:gap-8">
// //             {navItems.map((item) => (
// //               <Link
// //                 key={item.href}
// //                 href={item.href}
// //                 className="text-foreground hover:text-primary transition-colors text-sm font-medium"
// //               >
// //                 {item.label}
// //               </Link>
// //             ))}
// //           </div>

// //           {/* User Dropdown */}
// //           {
// //             user.success ? (
// //                 <DropdownMenu>
// //             <DropdownMenuTrigger asChild>
// //               <div className="cursor-pointer">
// //                 <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
// //                   <User className="w-4 h-4 text-primary" />
// //                 </div>
// //               </div>
// //             </DropdownMenuTrigger>
// //             <DropdownMenuContent align="end" className="w-56">
// //               <DropdownMenuLabel className="font-normal">
// //                 <div className="flex flex-col gap-1">
// //                   <p className="text-sm font-medium">
// //                     {user.data?.profile.name}
// //                   </p>
// //                   <p className="text-xs text-muted-foreground">
// //                     {user.data?.profile.email}
// //                   </p>
// //                 </div>
// //               </DropdownMenuLabel>
// //               <DropdownMenuSeparator />
// //               {userMenuItems.map((item) => {
// //                 const Icon = item.icon;
// //                 return (
// //                   <DropdownMenuItem
// //                     key={item.action}
// //                     onClick={() => handleUserMenuAction(item.action)}
// //                   >
// //                     <Icon className="w-4 h-4 mr-2" />
// //                     <span>{item.label}</span>
// //                   </DropdownMenuItem>
// //                 );
// //               })}
// //               <DropdownMenuSeparator />
// //               <DropdownMenuItem onClick={async () => {
// //                 await handleUserMenuAction("logout");
// //               }}>
// //                 <LogOut className="w-4 h-4 mr-2" />
// //                 <span>Log out</span>
// //               </DropdownMenuItem>
// //             </DropdownMenuContent>
// //           </DropdownMenu>
// //             ) : <Link href={"/login"} >
// //                    <Button className="cursor-pointer">
// //                         Login
// //                    </Button>
// //             </Link>
// //           }
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // }

// "use client";

// import Link from "next/link";
// import { Menu, House } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const Navbar = () => {
//   return (
//     <nav className="border-b bg-white">
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
//         {/* Logo */}
//         <Link
//           href="/"
//           className="flex items-center gap-2 text-2xl font-bold text-emerald-600"
//         >
//           <House className="h-7 w-7" />
//           RentNest
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden items-center gap-6 md:flex">
//           <Link href="/">Home</Link>

//           <Link href="/properties">
//             Properties
//           </Link>

//           <Link href="/login">
//             Login
//           </Link>

//           <Button asChild>
//             <Link href="/register">
//               Register
//             </Link>
//           </Button>
//         </div>

//         {/* Mobile */}
//         <Button
//           variant="outline"
//           size="icon"
//           className="md:hidden"
//         >
//           <Menu className="h-5 w-5" />
//         </Button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import Link from "next/link";
import { Button } from "../ui/button";
// import { Link } from 'next/link';

export default function Navbar() {
    return (
        <nav className="border-b bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <Link href="/" className="text-2xl font-bold text-green-700">
                    RentNest
                </Link>

                <div className="hidden gap-8 md:flex">
                    <Link href="/">Home</Link>
                    <Link href="/properties">Properties</Link>
                    <Link href="/dashboard">
                        Dashboard
                    </Link>
                    {/* <Link href="/login">Login</Link> */}
                    {/* <Link href="/register">Register</Link> */}
                    <Link href="/login">
                        <Button variant="outline">
                            Login
                        </Button>
                    </Link>

                    <Link href="/register">
                        <Button>
                            Register
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}