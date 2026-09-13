'use client'

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import deleteActivity from "@/app/actions/deleteActivity"
import { toast } from "react-toastify"

const ProfileActivities = ({ initialActivities }) => {
    const [ activities, setActivities ] = useState( initialActivities )

    const handleDeleteActivity = async (activityId) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this activity?'
        )

        if (!confirmed) {
            return
        }

        await deleteActivity(activityId)

        setActivities((currentActivities) =>
            currentActivities.filter((activity) => activity._id !== activityId)
        )

        toast.success("Activity deleted successfully")
    }

    return (
        <section>
            {activities.map(( activity ) =>
                <div
                    key={activity._id}
                    className="bg-white rounded-lg shadow-md p-4"
                >
                    {activity.images?.length > 0 && (
                        <Image
                            src={activity.images[0]}
                            alt={activity.title}
                            width={500}
                            height={400}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                    )}

                    <h3 className="text-xl font-bold">
                        {activity.title}
                    </h3>

                    <p>{activity.category} · {activity.location}</p>

                    <div className="mt-4 flex gap-2">
                        <Link
                            href={`/activities/${activity._id}`}
                            className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
                        >
                            View
                        </Link>

                        <Link
                            href={`/activities/${activity._id}/edit`}
                            className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                        >
                            Edit
                        </Link>

                        <button
                            type="button"
                            onClick={() => handleDeleteActivity(activity._id)}
                            className="rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}

export default ProfileActivities;