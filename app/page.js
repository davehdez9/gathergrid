import Link from "next/link";
import ActivityCard from "@/components/ActivityCard";
import connectDB from "@/config/database";
import Activity from "@/models/Activity";

export default async function Home() {
  await connectDB();

  const databaseActivities = await Activity.find({
    isFeatured: true,
  })
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  const featuredActivities = databaseActivities.map(
    ({ _id, ...activity }) => ({
      ...activity,
      id: _id.toString(),
    })
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-3xl bg-gray-900 px-6 py-12 text-white shadow-sm sm:px-10 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-300">
          Discover. Learn. Connect.
        </p>

        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Find local activities worth showing up for.
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">
          Discover workshops, creative meetups, and hobby activities happening
          in your community.
        </p>

        <Link
          href="/activities"
          className="mt-8 inline-flex rounded-lg bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-100"
        >
          Browse Activities
        </Link>
      </section>

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
