import Image from "next/image"
import connectDB from "@/config/database"
import getSessionUser from "@/utils/getSessionUser"
import Activity from "@/models/Activity"
import ProfileActivities from "@/components/ProfileActivities"
import convertToSerializableObject from "@/utils/convertToSerializableObject"

const ProfilePage = async () => {
    await connectDB()

    const sessionUser = await getSessionUser()
    const { userId } = sessionUser || {}

    if (!userId) {
        throw new Error('User ID is required')
    }

    const activityDocs = await Activity.find({
        owner: userId
    }).lean()

    const activities = activityDocs.map((activityDoc) =>
        convertToSerializableObject(activityDoc)
    )

    return (
        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <header>
                <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                    Your account
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Profile
                </h1>

                <p className="mt-3 max-w-2xl text-lg leading-8 text-gray-600">
                    Manage your account and the activities you have created.
                </p>
            </header>

            <section className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="flex flex-col items-center gap-5 p-6 text-center sm:flex-row sm:p-8 sm:text-left">
                    <Image
                        src={sessionUser.user.image}
                        alt={sessionUser.user.name || "Profile"}
                        width={112}
                        height={112}
                        className="h-28 w-28 rounded-full object-cover ring-4 ring-gray-100"
                        loading="eager"
                    />

                    <div>
                        <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                            GatherGrid member
                        </p>

                        <h2 className="mt-2 text-2xl font-bold text-gray-900">
                            {sessionUser.user.name}
                        </h2>

                        <p className="mt-1 text-gray-600">
                            {sessionUser.user.email}
                        </p>
                    </div>
                </div>
            </section>

            <section className="mt-12">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                            Manage
                        </p>

                        <h2 className="mt-2 text-2xl font-bold text-gray-900">
                            Your Activities
                        </h2>

                        <p className="mt-2 text-gray-600">
                            Edit or remove the activities you have published.
                        </p>
                    </div>

                    <p className="text-sm font-medium text-gray-500">
                        {activities.length}{" "}
                        {activities.length === 1
                            ? "activity"
                            : "activities"}
                    </p>
                </div>

                <ProfileActivities
                    initialActivities={activities}
                />
            </section>
        </main>
    )
}

export default ProfilePage
