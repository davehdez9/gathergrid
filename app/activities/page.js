import Link from "next/link";
import connectDB from "@/config/database";
import Activity from "@/models/Activity";
import ActivityCard from "@/components/ActivityCard";
import ActivitySearchForm from "@/components/ActivitySearchForm"

export default async function ActivitiesPage() {
  await connectDB()

  const databaseActivities = await Activity.find({}).lean()

  const activities = databaseActivities.map(({ _id, ...activity }) => ({
    ...activity,
    id: _id.toString()
  }))

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

      <ActivitySearchForm />

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