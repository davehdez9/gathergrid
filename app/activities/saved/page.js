import Link from "next/link"
import connectDB from "@/config/database"
import User from "@/models/User"
import getSessionUser from "@/utils/getSessionUser"
import ActivityCard from "@/components/ActivityCard"

const SavedActivitiesPage = async () => {
    await connectDB()

    const sessionUser = await getSessionUser()

    const { userId } = sessionUser || {}

    if (!userId) {
        throw new Error("User ID is required")
    }

    const user = await User.findById(userId)
        .populate("bookmarks")
        .lean()

    if (!user) {
        throw new Error("User not found")
    }

    const bookmarks = user.bookmarks

    const activities = bookmarks.map((bookmark) => {
        const { _id, ...activityData } = bookmark

        return {
            ...activityData,
            id: _id.toString()
        }
    })

    return (
        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <Link
                href="/activities"
                className="text-sm font-semibold text-gray-500 transition hover:text-gray-900"
            >
                ← Back to Activities
            </Link>

            <header className="mt-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                    Your collection
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Saved Activities
                </h1>

                <p className="mt-3 max-w-2xl text-lg leading-8 text-gray-600">
                    Keep track of activities you want to revisit later.
                </p>
            </header>

            <section className="mt-10">
                <div className="mb-6 flex items-end justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Your Saved List
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {activities.length}{" "}
                            {activities.length === 1
                                ? "activity"
                                : "activities"}{" "}
                            saved
                        </p>
                    </div>
                </div>

                {activities.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
                        <h3 className="text-lg font-semibold text-gray-900">
                            No saved activities yet
                        </h3>

                        <p className="mx-auto mt-2 max-w-md text-gray-600">
                            Save activities that interest you and they will
                            appear here for easy access later.
                        </p>

                        <Link
                            href="/activities"
                            className="mt-6 inline-flex rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-700"
                        >
                            Browse Activities
                        </Link>
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
        </main>
    )
}

export default SavedActivitiesPage