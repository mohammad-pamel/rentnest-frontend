"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { updateUserStatusAction } from "../_actions/adminActions";

type UserManageTableProps = {
  users: any[];
};

export default function UserManageTable({
  users,
}: UserManageTableProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleStatusChange = async (
    id: string,
    status: "ACTIVE" | "BANNED"
  ) => {
    try {
      setLoadingId(id);

      const result =
        await updateUserStatusAction(id, status);

      if (!result.success) {
        toast.error(
          result.message || "Failed to update status"
        );
        return;
      }

      toast.success(
        `User ${status.toLowerCase()} successfully`
      );

      window.location.reload();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="w-full text-sm">
        <thead className="border-b bg-slate-50">
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
            <tr
              key={user.id}
              className="border-b"
            >
              <td className="p-4 font-medium">
                {user.name}
              </td>

              <td className="p-4">
                {user.email}
              </td>

              <td className="p-4">
                {user.role}
              </td>

              <td className="p-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    user.status === "BANNED"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
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
                    onClick={() =>
                      handleStatusChange(
                        user.id,
                        "ACTIVE"
                      )
                    }
                  >
                    {loadingId === user.id
                      ? "Updating..."
                      : "Activate"}
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={loadingId === user.id}
                    onClick={() =>
                      handleStatusChange(
                        user.id,
                        "BANNED"
                      )
                    }
                  >
                    {loadingId === user.id
                      ? "Updating..."
                      : "Ban User"}
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}