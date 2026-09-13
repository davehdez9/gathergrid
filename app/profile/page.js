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
        throw Error('User ID is required')
    }

    const activityDocs = await Activity.find({ owner: userId }).lean()

    const activities = activityDocs.map(( activityDoc) =>
        convertToSerializableObject(activityDoc)
    )

    return (
        <>
            <section className="max-w-xl mx-auto mt-10">

                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <Image
                        src={sessionUser.user.image}
                        alt={sessionUser.user.name}
                        width={100}
                        height={100}
                        className="rounded-full mx-auto mb-4"
                        loading="eager"
                    />
                    <h1 className="text-2xl font-bold">
                        {sessionUser.user.name}
                    </h1>
                    <p>{sessionUser.user.email}</p>
                </div>
            </section>

            <section>
                <h2>Your Activities</h2>

                <ProfileActivities initialActivities={activities}/>
            </section>
        </>
    )
}

export default ProfilePage