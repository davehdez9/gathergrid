import Link from "next/link";
import { activities } from "@/data/activities";
import ActivityCard from "@/components/ActivityCard";

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
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
          />
        ))}
      </div>
    </main>
  );
}