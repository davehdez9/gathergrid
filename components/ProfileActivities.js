'use client'

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import deleteActivity from "@/app/actions/deleteActivity"
import { toast } from "react-toastify"

const ProfileActivities = ({ initialActivities }) => {
    const [activities, setActivities] = useState(initialActivities)

    const handleDeleteActivity = async (activityId) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this activity?'
        )

        if (!confirmed) {
            return
        }

        await deleteActivity(activityId)

        setActivities((currentActivities) =>
            currentActivities.filter(
                (activity) => activity._id !== activityId
            )
        )

        toast.success("Activity deleted successfully")
    }

    if (activities.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                    No activities yet
                </h3>

                <p className="mx-auto mt-2 max-w-md text-gray-600">
                    You have not created any activities yet. Add your first one
                    when you are ready to share something with the community.
                </p>

                <Link
                    href="/activities/add"
                    className="mt-6 inline-flex rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-700"
                >
                    Add Activity
                </Link>
            </div>
        )
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
                <article
                    key={activity._id}
                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                    {activity.images?.length > 0 && (
                        <Link
                            href={`/activities/${activity._id}`}
                            className="group block overflow-hidden bg-gray-100"
                        >
                            <Image
                                src={activity.images[0]}
                                alt={activity.title}
                                width={600}
                                height={400}
                                className="h-48 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                            />
                        </Link>
                    )}

                    <div className="flex flex-1 flex-col p-5">
                        <div>
                            <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                                {activity.category}
                            </span>

                            <h3 className="mt-3 text-xl font-bold tracking-tight text-gray-900">
                                <Link
                                    href={`/activities/${activity._id}`}
                                    className="transition hover:text-gray-600"
                                >
                                    {activity.title}
                                </Link>
                            </h3>

                            <p className="mt-2 text-sm font-medium text-gray-500">
                                {activity.location}
                            </p>
                        </div>

                        <div className="mt-auto grid grid-cols-3 gap-2 pt-6">
                            <Link
                                href={`/activities/${activity._id}`}
                                className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700"
                            >
                                View
                            </Link>

                            <Link
                                href={`/activities/${activity._id}/edit`}
                                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                            >
                                Edit
                            </Link>

                            <button
                                type="button"
                                onClick={() =>
                                    handleDeleteActivity(activity._id)
                                }
                                className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-white px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    )
}

export default ProfileActivities