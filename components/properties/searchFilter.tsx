
"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Category } from "@/app/lib/api";

interface SearchFilterProps {
  categories: Category[];
}

export default function SearchFilter({
  categories,
}: SearchFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const [location, setLocation] = useState(
    searchParams.get("location") || ""
  );

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || ""
  );

  const [minPrice, setMinPrice] = useState(
    searchParams.get("minPrice") || ""
  );

  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("maxPrice") || ""
  );

  const [categoryId, setCategoryId] = useState(
    searchParams.get("categoryId") || ""
  );

  const [bedrooms, setBedrooms] = useState(
    searchParams.get("bedrooms") || ""
  );

  const [isAvailable, setIsAvailable] = useState(
    searchParams.get("isAvailable") || ""
  );

  const [sort, setSort] = useState(() => {
    const sortBy = searchParams.get("sortBy");
    const sortOrder = searchParams.get("sortOrder");

    if (sortBy === "price" && sortOrder === "asc") {
      return "price-low";
    }

    if (sortBy === "price" && sortOrder === "desc") {
      return "price-high";
    }

    if (sortBy === "createdAt" && sortOrder === "asc") {
      return "oldest";
    }

    if (sortBy === "createdAt" && sortOrder === "desc") {
      return "newest";
    }

    return "";
  });

  const handleSearch = () => {
    if (
      minPrice &&
      maxPrice &&
      Number(minPrice) > Number(maxPrice)
    ) {
      return;
    }

    const params = new URLSearchParams();

    if (location.trim()) {
      params.set("location", location.trim());
    }

    if (searchTerm.trim()) {
      params.set("searchTerm", searchTerm.trim());
    }

    if (minPrice) {
      params.set("minPrice", minPrice);
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    }

    if (categoryId) {
      params.set("categoryId", categoryId);
    }

    if (bedrooms) {
      params.set("bedrooms", bedrooms);
    }

    if (isAvailable) {
      params.set("isAvailable", isAvailable);
    }

    if (sort === "price-low") {
      params.set("sortBy", "price");
      params.set("sortOrder", "asc");
    } else if (sort === "price-high") {
      params.set("sortBy", "price");
      params.set("sortOrder", "desc");
    } else if (sort === "newest") {
      params.set("sortBy", "createdAt");
      params.set("sortOrder", "desc");
    } else if (sort === "oldest") {
      params.set("sortBy", "createdAt");
      params.set("sortOrder", "asc");
    }

    params.set("page", "1");

    const queryString = params.toString();

    startTransition(() => {
      router.push(
        queryString
          ? `/property?${queryString}`
          : "/property"
      );
    });
  };

  const handleReset = () => {
    setLocation("");
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setCategoryId("");
    setBedrooms("");
    setIsAvailable("");
    setSort("");

    startTransition(() => {
      router.push("/property");
    });
  };

  return (
    <section className="mb-10 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      {/* Heading */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
          <SlidersHorizontal className="h-5 w-5" />
        </div>

        <div>
          <h2 className="font-semibold text-foreground">
            Find Your Property
          </h2>

          <p className="text-sm text-muted-foreground">
            Filter properties based on your preferences
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Input
          placeholder="Location"
          aria-label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <Input
          placeholder="Search property..."
          aria-label="Search property"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Input
          type="number"
          min="0"
          placeholder="Minimum price"
          aria-label="Minimum price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <Input
          type="number"
          min="0"
          placeholder="Maximum price"
          aria-label="Maximum price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <Select
          value={categoryId}
          onValueChange={setCategoryId}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>

          <SelectContent>
            {categories.map((category) => (
              <SelectItem
                key={category.id}
                value={category.id}
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={bedrooms}
          onValueChange={setBedrooms}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any Bedrooms" />
          </SelectTrigger>

          <SelectContent>
            {[1, 2, 3, 4, 5].map((number) => (
              <SelectItem
                key={number}
                value={String(number)}
              >
                {number} {number === 1 ? "Bedroom" : "Bedrooms"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={isAvailable}
          onValueChange={setIsAvailable}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any Availability" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="true">
              Available
            </SelectItem>

            <SelectItem value="false">
              Unavailable
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sort}
          onValueChange={setSort}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="newest">
              Newest First
            </SelectItem>

            <SelectItem value="oldest">
              Oldest First
            </SelectItem>

            <SelectItem value="price-low">
              Price: Low to High
            </SelectItem>

            <SelectItem value="price-high">
              Price: High to Low
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Validation */}
      {minPrice &&
        maxPrice &&
        Number(minPrice) > Number(maxPrice) && (
          <p className="mt-3 text-sm text-red-500">
            Minimum price cannot be greater than maximum price.
          </p>
        )}

      {/* Actions */}
      <div className="mt-5 flex flex-col justify-end gap-3 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          disabled={isPending}
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>

        <Button
          type="button"
          onClick={handleSearch}
          disabled={
            isPending ||
            (!!minPrice &&
              !!maxPrice &&
              Number(minPrice) > Number(maxPrice))
          }
          className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
        >
          <Search className="h-4 w-4" />
          {isPending ? "Searching..." : "Search Properties"}
        </Button>
      </div>
    </section>
  );
}
