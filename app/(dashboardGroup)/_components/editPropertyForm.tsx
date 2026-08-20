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

export default function EditPropertyForm({property, categories}: EditPropertyFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(property.title);
  const [description, setDescription] = useState(
    property.description
  );
  const [location, setLocation] = useState(
    property.location
  );
  const [address, setAddress] = useState(
    property.address
  );
  const [price, setPrice] = useState(
    String(property.price)
  );
  const [bedrooms, setBedrooms] = useState(
    String(property.bedrooms)
  );
  const [bathrooms, setBathrooms] = useState(
    String(property.bathrooms)
  );
  const [area, setArea] = useState(
    String(property.area)
  );
  const [categoryId, setCategoryId] = useState(
    property.categoryId
  );

  const [amenities, setAmenities] = useState(
    property.amenities?.join(", ") || ""
  );

  const [images, setImages] = useState(
    property.images?.join(", ") || ""
  );

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

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

      const result = await updatePropertyAction(
        property.id,
        data
      );

      if (!result.success) {
        toast.error(
          result.message ||
            "Failed to update property"
        );
        return;
      }

      toast.success(
        result.message ||
          "Property updated successfully"
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
          placeholder="WiFi, Parking, Balcony"
        />
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
          placeholder="https://image1.jpg, https://image2.jpg"
          required
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading
          ? "Updating..."
          : "Update Property"}
      </Button>
    </form>
  );
}