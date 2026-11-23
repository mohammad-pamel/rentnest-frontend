export const dynamic = "force-dynamic";
import { getAllCategoriesAction } from "../../_actions/categoryActions";
import CategoryManager from "../../_components/categoryManager";


export default async function CategoriesPage() {
  const result = await getAllCategoriesAction();

  if (!result.success) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Categories
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage property categories.
          </p>
        </div>

        <div className="rounded-xl border border-destructive/30 bg-card p-6">
          <p className="text-destructive">
            {result.message || "Failed to load categories."}
          </p>
        </div>
      </div>
    );
  }

  const categories = result.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Categories
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage property categories.
        </p>
      </div>

      <CategoryManager categories={categories} />
    </div>
  );
}