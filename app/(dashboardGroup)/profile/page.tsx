import { getMe } from "@/service/getMe";

export default async function ProfilePage() {
  const result = await getMe();

  if (!result.success) {
    return (
      <div className="rounded-xl border bg-white p-8">
        <h1 className="text-2xl font-bold">
          Profile
        </h1>

        <p className="mt-2 text-red-500">
          {result.message}
        </p>
      </div>
    );
  }

  const user = result.data?.profile || result.data;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <p className="mt-2 text-gray-500">
          View your account information.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-5 border-b pb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-600">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              {user?.name}
            </h2>

            <p className="text-gray-500">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">
              Full Name
            </p>

            <p className="mt-1 font-semibold">
              {user?.name || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="mt-1 font-semibold">
              {user?.email || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Phone
            </p>

            <p className="mt-1 font-semibold">
              {user?.phone || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Role
            </p>

            <p className="mt-1 font-semibold">
              {user?.role || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Account Status
            </p>

            <p className="mt-1 font-semibold">
              {user?.status || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Member Since
            </p>

            <p className="mt-1 font-semibold">
              {user?.createdAt
                ? new Date(
                    user.createdAt
                  ).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}