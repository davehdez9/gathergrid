import Link from "next/link";
import connectDB from "@/config/database";
import Activity from "@/models/Activity";
import ActivityCard from "@/components/ActivityCard";
import ActivitySearchForm from "@/components/ActivitySearchForm";

const SearchPage = async ({ searchParams }) => {
  const params = await searchParams;

  const {
    keyword = "",
    category = "All",
  } = params;

  await connectDB();

  const query = {};

  if (keyword && keyword.trim()) {
    const keywordPattern = new RegExp(keyword.trim(), "i");

    query.$or = [
      { title: keywordPattern },
      { description: keywordPattern },
      { location: keywordPattern },
    ];
  }

  if (category !== "All") {
    query.category = category;
  }

  const activities = await Activity.find(query).lean();

  const serializedActivities = activities.map(({ _id, ...activity }) => ({
    ...activity,
    id: _id.toString(),
  }));

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/activities"
        className="text-sm font-semibold text-gray-500 transition hover:text-gray-900"
      >
        ← Back to All Activities
      </Link>

      <div className="mt-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
          Explore GatherGrid
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Search Results
        </h1>

        <p className="mt-3 max-w-2xl text-lg leading-8 text-gray-600">
          Refine your search or explore activities that match what you are
          looking for.
        </p>
      </div>

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <ActivitySearchForm />
      </section>

      <section className="mt-10">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Activities Found
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {serializedActivities.length}{" "}
            {serializedActivities.length === 1 ? "result" : "results"}
          </p>
        </div>

        {serializedActivities.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              No activities found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-gray-600">
              Try a different keyword or category, or return to all activities
              to keep exploring.
            </p>

            <Link
              href="/activities"
              className="mt-6 inline-flex rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-700"
            >
              Browse All Activities
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {serializedActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default SearchPage;