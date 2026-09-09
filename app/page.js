import Link from "next/link";
import { activities } from "@/data/activities";
import ActivityCard from "@/components/ActivityCard";

export default function Home() {
  const featuredActivities = activities.slice(0, 3);

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">GatherGrid</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600">
        Discover local workshops and hobby activities in your community.
      </p>
      <Link href="/activities" className="mt-8 inline-block rounded-lg bg-gray-900 px-5 py-3 font-medium text-white hover:bg-gray-700">Browse Activities</Link>
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Featured Activities
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {featuredActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
