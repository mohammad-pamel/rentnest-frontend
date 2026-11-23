"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { updateUserStatusAction } from "../_actions/adminActions";

type User = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "TENANT" | "LANDLORD";
  status: "ACTIVE" | "BANNED";
};

type UserManageTableProps = {
  users: User[];
};

export default function UserManageTable({
  users,
}: UserManageTableProps) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleStatusChange = async (
    id: string,
    status: "ACTIVE" | "BANNED"
  ) => {
    const action = status === "BANNED" ? "ban" : "activate";

    // if (!window.confirm(`Are you sure you want to ${action} this user?`)) {
    //   return;
    // }

    try {
      setLoadingId(id);

      const result = await updateUserStatusAction(id, status);

      if (!result.success) {
        toast.error(result.message || "Failed to update status");
        return;
      }

      toast.success(`User ${action}d successfully`);
      router.refresh();
    } catch (error) {
      console.error("User status update error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border bg-card">
      <table className="w-full text-sm">
        <thead className="border-b bg-muted/50">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b last:border-0">
              <td className="p-4 font-medium">{user.name}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.role}</td>

              <td className="p-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    user.status === "BANNED"
                      ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                      : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                  }`}
                >
                  {user.status}
                </span>
              </td>

              <td className="p-4">
                {user.status === "BANNED" ? (
                  <Button
                    size="sm"
                    disabled={loadingId === user.id}
                    onClick={() => handleStatusChange(user.id, "ACTIVE")}
                  >
                    {loadingId === user.id ? "Updating..." : "Activate"}
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={loadingId === user.id}
                    onClick={() => handleStatusChange(user.id, "BANNED")}
                  >
                    {loadingId === user.id ? "Updating..." : "Ban User"}
                  </Button>
                )}
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan={5} className="p-8 text-center text-muted-foreground">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}