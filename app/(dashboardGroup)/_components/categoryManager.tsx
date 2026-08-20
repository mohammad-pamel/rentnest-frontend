"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  createCategoryAction,
  updateCategoryAction,
  deleteCategoryAction,
} from "../_actions/categoryActions";

interface Category {
  id: string;
  name: string;
}

interface CategoryManagerProps {
  categories: Category[];
}

export default function CategoryManager({
  categories,
}: CategoryManagerProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] =
    useState<string | null>(null);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      setLoading(true);

      const result = editingId
        ? await updateCategoryAction(
            editingId,
            name.trim()
          )
        : await createCategoryAction(
            name.trim()
          );

      if (!result.success) {
        toast.error(
          result.message ||
            "Something went wrong"
        );
        return;
      }

      toast.success(
        result.message ||
          "Category saved successfully"
      );

      setName("");
      setEditingId(null);

      window.location.reload();
    } catch (error) {
      toast.error(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (
    category: Category
  ) => {
    setEditingId(category.id);
    setName(category.name);
  };

  const handleDelete = async (
    id: string
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const result =
        await deleteCategoryAction(id);

      if (!result.success) {
        toast.error(
          result.message ||
            "Failed to delete category"
        );
        return;
      }

      toast.success(
        result.message ||
          "Category deleted successfully"
      );

      window.location.reload();
    } catch (error) {
      toast.error(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setName("");
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border bg-white p-6 shadow-sm"
      >
        <h2 className="text-xl font-bold">
          {editingId
            ? "Edit Category"
            : "Add Category"}
        </h2>

        <div className="mt-4 flex gap-3">
          <Input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Enter category name"
            disabled={loading}
          />

          <Button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : editingId
                ? "Update"
                : "Add"}
          </Button>

          {editingId && (
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b p-5">
          <h2 className="text-xl font-bold">
            All Categories
          </h2>
        </div>

        {categories.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No categories found.
          </div>
        ) : (
          <div className="divide-y">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-5"
              >
                <p className="font-medium">
                  {category.name}
                </p>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleEdit(category)
                    }
                    disabled={loading}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() =>
                      handleDelete(category.id)
                    }
                    disabled={loading}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}