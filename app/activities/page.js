import Link from "next/link";
import connectDB from "@/config/database";
import Activity from "@/models/Activity";
import ActivityCard from "@/components/ActivityCard";
import ActivitySearchForm from "@/components/ActivitySearchForm";
import Pagination from "@/components/Pagination";

export default async function ActivitiesPage({ searchParams }) {
  await connectDB();

  const params = await searchParams;

  const page = Number(params.page || 1);
  const pageSize = 9;
  const skip = (page - 1) * pageSize;

  const totalActivities = await Activity.countDocuments({});

  const databaseActivities = await Activity.find({})
    .lean()
    .skip(skip)
    .limit(pageSize);

  const showPagination = totalActivities > pageSize;

  const activities = databaseActivities.map(({ _id, ...activity }) => ({
    ...activity,
    id: _id.toString(),
  }));

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm font-semibold text-gray-500 transition hover:text-gray-900"
        >
          ← Back to Home
        </Link>

        <div className="mt-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            Explore GatherGrid
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Discover Activities
          </h1>

          <p className="mt-3 max-w-2xl text-lg leading-8 text-gray-600">
            Browse workshops, creative meetups, and hobby activities happening
            in your community.
          </p>
        </div>
      </div>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <ActivitySearchForm />
      </section>

      <section className="mt-10">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              All Activities
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {totalActivities}{" "}
              {totalActivities === 1 ? "activity" : "activities"} available
            </p>
          </div>
        </div>

        {activities.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              No activities found
            </h3>

            <p className="mt-2 text-gray-600">
              Check back later for new activities.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
              />
            ))}
          </div>
        )}
      </section>

      {showPagination && (
        <div className="mt-10">
          <Pagination
            page={page}
            pageSize={pageSize}
            totalItems={totalActivities}
          />
        </div>
      )}
    </main>
  );
}