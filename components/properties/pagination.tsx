
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPage: number;
}

export default function Pagination({
  page,
  totalPage,
}: PaginationProps) {
  const router = useRouter();
  const params = useSearchParams();

  const safeTotalPage = Math.max(1, totalPage || 1);
  const safePage = Math.min(Math.max(1, page), safeTotalPage);

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > safeTotalPage) return;

    const query = new URLSearchParams(params.toString());
    query.set("page", String(newPage));

    router.push(`/property?${query.toString()}`, {
      scroll: true,
    });
  };

  if (safeTotalPage <= 1) return null;

  return (
    <nav
      aria-label="Property pagination"
      className="mt-10 flex flex-wrap items-center justify-center gap-3"
    >
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={safePage <= 1}
        onClick={() => changePage(safePage - 1)}
        className="gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {Array.from({ length: safeTotalPage }, (_, index) => index + 1)
          .filter(
            (number) =>
              number === 1 ||
              number === safeTotalPage ||
              Math.abs(number - safePage) <= 1
          )
          .map((number, index, visiblePages) => (
            <span key={number} className="contents">
              {index > 0 && number - visiblePages[index - 1] > 1 && (
                <span className="px-1 text-muted-foreground">...</span>
              )}

              <Button
                type="button"
                size="sm"
                variant={number === safePage ? "default" : "outline"}
                aria-current={number === safePage ? "page" : undefined}
                onClick={() => changePage(number)}
                className="min-w-9"
              >
                {number}
              </Button>
            </span>
          ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={safePage >= safeTotalPage}
        onClick={() => changePage(safePage + 1)}
        className="gap-1"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}
