"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Props {
  page: number;
  totalPage: number;
}

export default function Pagination({
  page,
  totalPage,
}: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const changePage = (newPage: number) => {
    const query = new URLSearchParams(params.toString());

    query.set("page", String(newPage));

    router.push(`/property?${query.toString()}`);
  };

  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      <Button
        variant="outline"
        disabled={page <= 1}
        onClick={() => changePage(page - 1)}
      >
        Previous
      </Button>

      <span className="font-semibold">
        {page} / {totalPage}
      </span>

      <Button
        variant="outline"
        disabled={page >= totalPage}
        onClick={() => changePage(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}