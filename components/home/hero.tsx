import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto flex min-h-[85vh] max-w-7xl items-center justify-between px-6 py-16">

        <div className="max-w-2xl">

          <p className="mb-3 inline-block rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            #1 Rental Marketplace
          </p>

          <h1 className="mb-6 text-6xl font-bold leading-tight">
            Find Your
            <span className="text-emerald-600">
              {" "}Perfect Rental Home
            </span>
          </h1>

          <p className="mb-8 text-lg text-gray-600">
            Browse thousands of verified rental properties.
            Safe payments, trusted landlords and simple rental management.
          </p>

          <div className="flex gap-4">

            <Link
              href="/properties"
              className="rounded-lg bg-emerald-600 px-7 py-3 text-white transition hover:bg-emerald-700"
            >
              Explore Properties
            </Link>

            <Link
              href="/register"
              className="rounded-lg border px-7 py-3 hover:bg-gray-100"
            >
              Get Started
            </Link>

          </div>

        </div>

        <div className="hidden lg:block">

          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900"
            alt="House"
            className="h-[550px] w-[550px] rounded-3xl object-cover shadow-2xl"
          />

        </div>

      </div>
    </section>
  );
}