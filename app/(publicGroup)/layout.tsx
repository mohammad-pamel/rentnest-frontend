import { ReactNode } from "react";

interface PropertiesLayoutProps {
  children: ReactNode;
}

export default function PropertiesLayout({
  children,
}: PropertiesLayoutProps) {
  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {children}
      </div>
    </section>
  );
}