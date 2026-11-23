import { getAllUsersAction } from "../../_actions/adminActions";
import UserManageTable from "../../_components/userManageTable";

export default async function AdminUsersPage() {
  const result = await getAllUsersAction();

  if (!result.success) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Manage Users
          </h1>
          <p className="mt-2 text-muted-foreground">
            View and manage all registered users.
          </p>
        </div>

        <div className="rounded-xl border border-destructive/30 bg-card p-6">
          <p className="text-destructive">
            {result.message || "Failed to load users."}
          </p>
        </div>
      </div>
    );
  }

  const users = result.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Manage Users
        </h1>

        <p className="mt-2 text-muted-foreground">
          View and manage all registered users.
        </p>
      </div>

      {users.length === 0 ? (
        <div className="rounded-xl border bg-card p-8 text-center">
          <h2 className="text-xl font-semibold">No Users Found</h2>
          <p className="mt-2 text-muted-foreground">
            There are no registered users yet.
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            Total Users: {users.length}
          </p>

          <UserManageTable users={users} />
        </>
      )}
    </div>
  );
}