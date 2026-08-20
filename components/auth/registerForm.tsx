// "use client";

// import { useState } from "react";
// import Link from "next/link";
// // import { registerUser } from "@/lib/api";
// import { useRouter } from "next/navigation";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Select } from "../ui/select";
// import { registerUser } from "@/app/lib/api";

// export default function LoginForm() {
//     const [loading, setLoading] = useState(false);
//     const router = useRouter();

//     const [name, setName] = useState("");

//     const [email, setEmail] = useState("");

//     const [password, setPassword] = useState("");

//     const [phone, setPhone] = useState("");

//     const [role, setRole] = useState("TENANT");

//     const handleSubmit = async (
//         e: React.FormEvent
//     ) => {

//         e.preventDefault();

//         setLoading(true);

//         const result = await registerUser({

//             name,

//             email,

//             password,

//             phone,

//             role,

//         });

//         setLoading(false);

//         if (result.success) {

//             alert("Registration Successful");

//             router.push("/login");

//         } else {

//             alert(result.message);

//         }

//     }

//     return (
//         <Card className="p-8">

//             <h1 className="mb-6 text-center text-3xl font-bold">
//                 Login
//             </h1>

//             <form
//                 onSubmit={handleSubmit}
//                 className="space-y-5"
//             >

//                 <div>

//                     <Label>Name</Label>

//                     <Input
//                         type="name"
//                         placeholder="Enter Name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                     />

//                 </div>
//                 <div>

//                     <Label>Email</Label>

//                     <Input
//                         type="email"
//                         placeholder="Enter Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />

//                 </div>
//                 <div>

//                     <Label>Phone</Label>

//                     <Input
//                         type="phone"
//                         placeholder="Enter Phone"
//                         value={phone}
//                         onChange={(e) => setPhone(e.target.value)}
//                     />

//                 </div>
//                 <div>

//                     <Label>Role</Label>

//                     <Select
//                     value={role}
//                     onValueChange={setRole}
//                 ></Select>

//                 </div>

//                 <div>

//                     <Label>Password</Label>

//                     <Input
//                         type="password"
//                         placeholder="Enter Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />

//                 </div>

//                 <Button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full"
//                 >

//                     {loading ? "Registering..." : "Register"}

//                 </Button>

//             </form>

//             <p className="mt-6 text-center">

//                 Dont have an account?

//                 <Link
//                     href="/register"
//                     className="ml-2 text-blue-600"
//                 >
//                     Register
//                 </Link>

//             </p>

//         </Card>
//     );
// }