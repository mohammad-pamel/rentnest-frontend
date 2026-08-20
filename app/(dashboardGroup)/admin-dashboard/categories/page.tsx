import {getAllCategoriesAction} from "../../_actions/categoryActions";
import CategoryManager from "../../_components/categoryManager";


export default async function CategoriesPage() {
  const result =
    await getAllCategoriesAction();

  const categories = result.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Categories
        </h1>

        <p className="mt-2 text-gray-500">
          Manage property categories.
        </p>
      </div>

      {!result.success && (
        <div className="rounded-lg border p-5 text-red-500">
          {result.message}
        </div>
      )}

      <CategoryManager
        categories={categories}
      />
    </div>
  );
}