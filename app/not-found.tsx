import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold">404</h1>

      <p className="mt-3 text-gray-600">
        Page not found.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-emerald-600 px-5 py-2 text-white hover:bg-emerald-700"
      >
        Back to Home
      </Link>
    </div>
  );
}