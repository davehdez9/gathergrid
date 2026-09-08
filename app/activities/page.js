import Link from "next/link";

export default function ActivitiesPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href="/"
        className="text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        ← Back to Home
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-gray-900">Activities</h1>

      <p className="mt-3 text-gray-600">
        Browse local workshops and hobby activities.
      </p>

      <div className="mt-8 space-y-4">
        <Link
          href="/activities/1"
          className="block rounded-lg border border-gray-200 bg-white p-5 hover:border-gray-400"
        >
          <h2 className="font-semibold text-gray-900">
            Beginner Photography Walk
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Practice photography with a local group.
          </p>
        </Link>

        <Link
          href="/activities/2"
          className="block rounded-lg border border-gray-200 bg-white p-5 hover:border-gray-400"
        >
          <h2 className="font-semibold text-gray-900">
            Intro to Woodworking
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Learn basic woodworking skills in a beginner-friendly workshop.
          </p>
        </Link>
      </div>
    </main>
  );
}