import Link from "next/link";

export default function ActivityPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href="/activities"
        className="text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        ← Back to Activities
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-gray-900">
        Activity Details
      </h1>

      <p className="mt-3 text-gray-600">
        This page represents a single activity.
      </p>
    </main>
  );
}