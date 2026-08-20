import { getAllUsersAction } from "../../_actions/adminActions";
import UserManageTable from "../../_components/userManageTable";


export default async function AdminUsersPage() {
  const result = await getAllUsersAction();

  const users = result.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Manage Users
        </h1>

        <p className="mt-2 text-gray-500">
          View and manage all registered users.
        </p>
      </div>

      {!result.success && (
        <div className="rounded-lg border p-5 text-red-500">
          {result.message}
        </div>
      )}

      {result.success && users.length === 0 && (
        <div className="rounded-lg border bg-white p-8 text-center">
          No users found.
        </div>
      )}

      {users.length > 0 && (
        <UserManageTable users={users} />
      )}
    </div>
  );
}