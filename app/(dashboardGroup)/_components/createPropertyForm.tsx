"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createPropertyAction } from "../_actions/propertyActions";

interface Category {
  id: string;
  name: string;
}

interface CreatePropertyFormProps {
  categories: Category[];
}

export default function CreatePropertyForm({
  categories,
}: CreatePropertyFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [area, setArea] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [amenities, setAmenities] = useState("");
  const [images, setImages] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    try {
      setLoading(true);

      const data = {
        title,
        description,
        location,
        address,
        price: Number(price),
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        area: Number(area),

        amenities: amenities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        images: images
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        categoryId,
      };

      const result =
        await createPropertyAction(data);

      if (!result.success) {
        toast.error(
          result.message ||
            "Failed to create property"
        );
        return;
      }

      toast.success(
        result.message ||
          "Property created successfully"
      );

      router.push(
        "/landloard-dashboard/Properties"
      );

      router.refresh();

    } catch (error) {
      toast.error(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border bg-white p-6 shadow-sm"
    >
      
      <div>
        <label className="mb-2 block font-medium">
          Property Title
        </label>

        <Input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="Enter property title"
          required
        />
      </div>

     
      <div>
        <label className="mb-2 block font-medium">
          Description
        </label>

        <Textarea
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          placeholder="Enter property description"
          required
        />
      </div>

   
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium">
            Location
          </label>

          <Input
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            placeholder="Chattogram"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Address
          </label>

          <Input
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            placeholder="Full address"
            required
          />
        </div>
      </div>

      
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium">
            Price
          </label>

          <Input
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            placeholder="25000"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Area (sqft)
          </label>

          <Input
            type="number"
            value={area}
            onChange={(e) =>
              setArea(e.target.value)
            }
            placeholder="1200"
            required
          />
        </div>
      </div>

  
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium">
            Bedrooms
          </label>

          <Input
            type="number"
            value={bedrooms}
            onChange={(e) =>
              setBedrooms(e.target.value)
            }
            placeholder="3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Bathrooms
          </label>

          <Input
            type="number"
            value={bathrooms}
            onChange={(e) =>
              setBathrooms(e.target.value)
            }
            placeholder="2"
            required
          />
        </div>
      </div>

      
      <div>
        <label className="mb-2 block font-medium">
          Category
        </label>

        <select
          value={categoryId}
          onChange={(e) =>
            setCategoryId(e.target.value)
          }
          className="w-full rounded-md border px-3 py-2"
          required
        >
          <option value="">
            Select Category
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      
      <div>
        <label className="mb-2 block font-medium">
          Amenities
        </label>

        <Input
          value={amenities}
          onChange={(e) =>
            setAmenities(e.target.value)
          }
          placeholder="WiFi, Parking, Balcony, Security"
        />

        <p className="mt-1 text-sm text-gray-500">
          Separate amenities using commas.
        </p>
      </div>

   
      <div>
        <label className="mb-2 block font-medium">
          Image URLs
        </label>

        <Textarea
          value={images}
          onChange={(e) =>
            setImages(e.target.value)
          }
          placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
          required
        />

        <p className="mt-1 text-sm text-gray-500">
          Separate image URLs using commas.
        </p>
      </div>

     
      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading
          ? "Creating..."
          : "Create Property"}
      </Button>
    </form>
  );
}