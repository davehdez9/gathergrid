import Link from "next/link"
import connectDB from "@/config/database"
import Activity from "@/models/Activity"
import { notFound } from "next/navigation"
import convertToSerializableObject from "@/utils/convertToSerializableObject"
import ActivityEditForm from "@/components/ActivityEditForm"

const ActivityEditPage = async ({ params }) => {
    const { id } = await params

    await connectDB()

    const activityDoc = await Activity.findById(id).lean()

    if (!activityDoc) {
        notFound()
    }

    const activity = convertToSerializableObject(activityDoc)

    return (
        <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
            <Link
                href="/profile"
                className="text-sm font-semibold text-gray-500 transition hover:text-gray-900"
            >
                ← Back to Profile
            </Link>

            <header className="mt-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                    Manage
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Edit Activity
                </h1>

                <p className="mt-3 max-w-2xl text-lg leading-8 text-gray-600">
                    Update the information people see for this activity.
                </p>
            </header>

            <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <ActivityEditForm activity={activity} />
            </section>
        </main>
    )
}

export default ActivityEditPage