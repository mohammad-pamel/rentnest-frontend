
import type { ReactNode } from "react";

import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getMe();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user} />

      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>
    </div>
  );
}
