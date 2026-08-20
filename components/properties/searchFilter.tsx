"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Category {
    id: string;
    name: string;
}

interface SearchFilterProps {
    categories: Category[];
}

export default function SearchFilter({
    categories,
}: SearchFilterProps) {
    const router = useRouter();

    const searchParams = useSearchParams();

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

    const [sort, setSort] = useState(
        searchParams.get("sort") || ""
    );

    const handleSearch = () => {
        const params = new URLSearchParams();

        if (location)
            params.set("location", location);

        if (searchTerm) {
            params.set("searchTerm", searchTerm);
        }

        if (minPrice)
            params.set("minPrice", minPrice);

        if (maxPrice)
            params.set("maxPrice", maxPrice);

        if (categoryId)
            params.set("categoryId", categoryId);

        if (bedrooms)
            params.set("bedrooms", bedrooms);

        if (isAvailable)
            params.set("isAvailable", isAvailable);

        if (sort === "price-low") {
            params.set("sortBy", "price");
            params.set("sortOrder", "asc");
        }

        if (sort === "price-high") {
            params.set("sortBy", "price");
            params.set("sortOrder", "desc");
        }

        if (sort === "newest") {
            params.set("sortBy", "createdAt");
            params.set("sortOrder", "desc");
        }

        if (sort === "oldest") {
            params.set("sortBy", "createdAt");
            params.set("sortOrder", "asc");
        }

        router.push(`/property?${params.toString()}`);
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

        router.push("/property");
    };

    return (
        <div className="mb-10 rounded-xl border bg-white p-6 shadow-sm">

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                <Input
                    placeholder="Location"
                    value={location}
                    onChange={(e) =>
                        setLocation(e.target.value)
                    }
                />

                <Input
                    placeholder="Search property..."
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                />

                <Input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) =>
                        setMinPrice(e.target.value)
                    }
                />

                <Input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) =>
                        setMaxPrice(e.target.value)
                    }
                />

                <Select
                    value={categoryId}
                    onValueChange={setCategoryId}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Category" />
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

                        <SelectValue placeholder="Bedrooms" />

                    </SelectTrigger>

                    <SelectContent>

                        <SelectItem value="1">1</SelectItem>

                        <SelectItem value="2">2</SelectItem>

                        <SelectItem value="3">3</SelectItem>

                        <SelectItem value="4">4</SelectItem>

                        <SelectItem value="5">5</SelectItem>

                    </SelectContent>

                </Select>

                <Select
                    value={isAvailable}
                    onValueChange={setIsAvailable}
                >

                    <SelectTrigger>

                        <SelectValue placeholder="Availability" />

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

                        <SelectValue placeholder="Sort" />

                    </SelectTrigger>

                    <SelectContent>

                        <SelectItem value="newest">

                            Newest

                        </SelectItem>

                        <SelectItem value="oldest">

                            Oldest

                        </SelectItem>

                        <SelectItem value="price-low">

                            Price Low → High

                        </SelectItem>

                        <SelectItem value="price-high">

                            Price High → Low

                        </SelectItem>

                    </SelectContent>

                </Select>

                <div className="flex gap-2">

                    <Button
                        className="flex-1"
                        onClick={handleSearch}
                    >
                        Search
                    </Button>

                    <Button
                        variant="outline"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>

                </div>

            </div>

        </div>
    );
}