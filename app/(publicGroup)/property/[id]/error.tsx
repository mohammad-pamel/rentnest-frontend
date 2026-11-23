
"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function PropertyError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Property page error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-5 rounded-full bg-red-100 p-4 text-red-600 dark:bg-red-950 dark:text-red-400">
        <AlertTriangle size={32} />
      </div>

      <h2 className="text-2xl font-bold">
        Failed to Load Properties
      </h2>

      <p className="mt-3 max-w-md text-muted-foreground">
        Something went wrong while loading properties.
        Please try again.
      </p>

      <Button
        onClick={reset}
        className="mt-6 gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
      >
        <RefreshCw size={16} />
        Try Again
      </Button>
    </div>
  );
}
