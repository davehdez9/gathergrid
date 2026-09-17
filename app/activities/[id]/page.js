import Link from "next/link";
import connectDB from "@/config/database";
import Activity from "@/models/Activity";
import mongoose from "mongoose";
import { notFound } from "next/navigation";
import ActivityImages from "@/components/ActivityImages";
import ActivityMap from "@/components/ActivityMap";
import BookmarkButton from '@/components/BookmarkButton';
import ShareButtons from "@/components/ShareButtons"
import ActivityContactForm from "@/components/ActivityContactForm"


export default async function ActivityPage({ params }) {
  const { id } = await params

  if(!mongoose.isValidObjectId(id)) {
    notFound()
  }

  await connectDB()

  const databaseActivity = await Activity.findById(id).lean()

  if(!databaseActivity) {
    notFound()
  }

  const { _id, ...activityData } = databaseActivity

  const activity = {
    ...activityData,
    id: _id.toString()
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href="/activities"
        className="text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        ← Back to Activities
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-gray-900">
        {activity.title}
      </h1>

      <p className="mt-3 text-gray-600">
        {activity.category}
      </p>
      <p className="mt-3 text-gray-600">
        {activity.location}
      </p>

      <p className="mt-3 text-gray-600">
        {activity.description}
      </p>

      <ActivityImages images={activity.images} />

      <BookmarkButton activityId={activity.id} />

      <ShareButtons
        activityId={activity.id}
        title={activity.title}
      />

      <ActivityContactForm activityId={activity.id} />

      <ActivityMap location={activity.location}/>
    </main>
  );
}
