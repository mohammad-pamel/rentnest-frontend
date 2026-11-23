
import { getMe } from "@/service/getMe";

export default async function ProfilePage() {
  const result = await getMe();

  if (!result.success || !result.data?.profile) {
    return (
      <div className="rounded-xl border bg-card p-8">
        <h1 className="text-2xl font-bold">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-destructive">
          {result.message || "Unable to load profile information."}
        </p>
      </div>
    );
  }

  const user = result.data.profile;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <p className="mt-2 text-muted-foreground">
          View your account information.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-5 border-b pb-6">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary/10 text-3xl font-bold text-primary">
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className="min-w-0">
            <h2 className="text-2xl font-bold">
              {user.name || "N/A"}
            </h2>

            <p className="break-all text-muted-foreground">
              {user.email || "N/A"}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">
              Full Name
            </p>
            <p className="mt-1 font-semibold">
              {user.name || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Email
            </p>
            <p className="mt-1 font-semibold">
              {user.email || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Phone
            </p>
            <p className="mt-1 font-semibold">
              {user.phone || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Role
            </p>
            <p className="mt-1 font-semibold">
              {user.role || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Account Status
            </p>
            <p className="mt-1 font-semibold">
              {user.status || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Member Since
            </p>
            <p className="mt-1 font-semibold">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-BD", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
