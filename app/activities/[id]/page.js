import Link from "next/link";
import connectDB from "@/config/database";
import Activity from "@/models/Activity";
import mongoose from "mongoose";
import { notFound } from "next/navigation";
import ActivityImages from "@/components/ActivityImages";
import ActivityMap from "@/components/ActivityMap";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import ActivityContactForm from "@/components/ActivityContactForm";

export default async function ActivityPage({ params }) {
  const { id } = await params;

  if (!mongoose.isValidObjectId(id)) {
    notFound();
  }

  await connectDB();

  const databaseActivity = await Activity.findById(id).lean();

  if (!databaseActivity) {
    notFound();
  }

  const { _id, ...activityData } = databaseActivity;

  const activity = {
    ...activityData,
    id: _id.toString(),
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/activities"
        className="text-sm font-semibold text-gray-500 transition hover:text-gray-900"
      >
        ← Back to Activities
      </Link>

      <header className="mt-6">
        <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
          {activity.category}
        </span>

        <h1 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          {activity.title}
        </h1>

        <p className="mt-4 flex items-center text-base font-medium text-gray-500">
          <span aria-hidden="true" className="mr-2">
            📍
          </span>
          {activity.location}
        </p>
      </header>

      <section className="mt-8 overflow-hidden rounded-2xl">
        <ActivityImages images={activity.images} />
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-8">
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              About this activity
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              What to expect
            </h2>

            <p className="mt-4 whitespace-pre-line text-base leading-8 text-gray-600">
              {activity.description}
            </p>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              Contact
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              Interested in this activity?
            </h2>

            <p className="mt-2 text-gray-600">
              Send a message to the activity organizer for more information.
            </p>

            <div className="mt-6">
              <ActivityContactForm activityId={activity.id} />
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-6 py-5 sm:px-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                Location
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                Where it happens
              </h2>

              <p className="mt-2 text-gray-600">
                {activity.location}
              </p>
            </div>

            <ActivityMap location={activity.location} />
          </section>
        </div>

        <aside className="lg:self-start">
          <div className="space-y-6 lg:sticky lg:top-24">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                Save activity
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Keep this activity handy so you can find it again later.
              </p>

              <div className="mt-5">
                <BookmarkButton activityId={activity.id} />
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                Share
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Know someone who might be interested? Share this activity with
                them.
              </p>

              <div className="mt-5">
                <ShareButtons
                  activityId={activity.id}
                  title={activity.title}
                />
              </div>
            </section>
          </div>
        </aside>
      </div>
    </main>
  );
}