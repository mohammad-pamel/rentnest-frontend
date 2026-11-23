
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { updatePropertyAction } from "../_actions/propertyActions";

interface Category {
  id: string;
  name: string;
}

interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities: string[];
  images: string[];
  categoryId: string;
}

interface EditPropertyFormProps {
  property: Property;
  categories: Category[];
}

export default function EditPropertyForm({
  property,
  categories,
}: EditPropertyFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(property.title);
  const [description, setDescription] = useState(property.description);
  const [location, setLocation] = useState(property.location);
  const [address, setAddress] = useState(property.address);
  const [price, setPrice] = useState(String(property.price));
  const [bedrooms, setBedrooms] = useState(String(property.bedrooms));
  const [bathrooms, setBathrooms] = useState(String(property.bathrooms));
  const [area, setArea] = useState(String(property.area));
  const [categoryId, setCategoryId] = useState(property.categoryId);

  const [amenities, setAmenities] = useState(
    property.amenities?.join(", ") || ""
  );

  const [images, setImages] = useState(
    property.images?.join(", ") || ""
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Property title is required");
      return;
    }

    if (!description.trim()) {
      toast.error("Description is required");
      return;
    }

    if (!location.trim() || !address.trim()) {
      toast.error("Location and address are required");
      return;
    }

    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    if (!price || !Number.isFinite(Number(price)) || Number(price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    if (
      bedrooms === "" ||
      bathrooms === "" ||
      area === "" ||
      !Number.isFinite(Number(bedrooms)) ||
      !Number.isFinite(Number(bathrooms)) ||
      !Number.isFinite(Number(area)) ||
      Number(bedrooms) < 0 ||
      Number(bathrooms) < 0 ||
      Number(area) <= 0
    ) {
      toast.error("Please enter valid property details");
      return;
    }

    const imageList = images
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (imageList.length === 0) {
      toast.error("At least one property image URL is required");
      return;
    }

    try {
      setLoading(true);

      const data = {
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        address: address.trim(),
        price: Number(price),
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        area: Number(area),

        amenities: amenities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        images: imageList,

        categoryId,
      };

      const result = await updatePropertyAction(property.id, data);

      if (!result.success) {
        toast.error(result.message || "Failed to update property");
        return;
      }

      toast.success(
        result.message || "Property updated successfully"
      );

      router.push("/landloard-dashboard/Properties");
      router.refresh();
    } catch (error) {
      console.error("Update property error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border bg-card p-6 shadow-sm"
    >
      <div>
        <label className="mb-2 block font-medium">
          Property Title
        </label>

        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Description
        </label>

        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
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
            onChange={(e) => setLocation(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Address
          </label>

          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={loading}
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
            min="0.01"
            step="any"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Area (sqft)
          </label>

          <Input
            type="number"
            min="0.01"
            step="any"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            disabled={loading}
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
            min="0"
            step="1"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Bathrooms
          </label>

          <Input
            type="number"
            min="0"
            step="1"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            disabled={loading}
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
          onChange={(e) => setCategoryId(e.target.value)}
          disabled={loading}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          required
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
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
          onChange={(e) => setAmenities(e.target.value)}
          placeholder="WiFi, Parking, Balcony"
          disabled={loading}
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Image URLs
        </label>

        <Textarea
          value={images}
          onChange={(e) => setImages(e.target.value)}
          placeholder="https://image1.jpg, https://image2.jpg"
          disabled={loading}
          required
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Updating..." : "Update Property"}
      </Button>
    </form>
  );
}
