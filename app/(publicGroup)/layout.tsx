
import Footer from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

export default async function PublicGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user} />

      <div className="flex-1">
        {children}
      </div>

      <Footer />
    </div>
  );
}
