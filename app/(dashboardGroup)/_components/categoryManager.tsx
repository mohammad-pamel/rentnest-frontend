
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      setLoading(true);

      const result = editingId
        ? await updateCategoryAction(editingId, name.trim())
        : await createCategoryAction(name.trim());

      if (!result.success) {
        toast.error(result.message || "Something went wrong");
        return;
      }

      toast.success(
        result.message || "Category saved successfully"
      );

      setName("");
      setEditingId(null);

      router.refresh();
    } catch (error) {
      console.error("Category save error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setName(category.name);
  };

  const handleDelete = async (id: string) => {
    // const confirmed = toast(
    //   "Are you sure you want to delete this category?"
    // );

    // if (!confirmed) return;

    try {
      setLoading(true);

      const result = await deleteCategoryAction(id);

      if (!result.success) {
        toast.error(result.message || "Failed to delete category");
        return;
      }

      toast.success(
        result.message || "Category deleted successfully"
      );

      if (editingId === id) {
        setEditingId(null);
        setName("");
      }

      router.refresh();
    } catch (error) {
      console.error("Category delete error:", error);
      toast.error("Something went wrong");
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
        className="rounded-xl border bg-card p-6 shadow-sm"
      >
        <h2 className="text-xl font-bold">
          {editingId ? "Edit Category" : "Add Category"}
        </h2>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            disabled={loading}
            required
          />

          <Button type="submit" disabled={loading}>
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

      <div className="rounded-xl border bg-card shadow-sm">
        <div className="border-b p-5">
          <h2 className="text-xl font-bold">
            All Categories ({categories.length})
          </h2>
        </div>

        {categories.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No categories found.
          </div>
        ) : (
          <div className="divide-y">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center"
              >
                <p className="font-medium">{category.name}</p>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleEdit(category)}
                    disabled={loading}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(category.id)}
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
