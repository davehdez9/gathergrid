import connectDB from "@/config/database";
import User from "@/models/User";
import getSessionUser from "@/utils/getSessionUser";
import ActivityCard from "@/components/ActivityCard";

const SavedActivitiesPage = async () => {
    await connectDB()

    const sessionUser = await getSessionUser()

    const { userId } = sessionUser || {}

    if (!userId) {
        throw new Error("User ID is required")
    }

    const user = await User.findById(userId)
        .populate('bookmarks')
        .lean()

    if (!user) {
        throw new Error('user not found')
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
        <main>
            <h1>Saved Activities</h1>
            
            {activities.length === 0 ? (
                <p>No saved Activities</p>
            ) : (
                <div>
                    {activities.map((activity) => (
                        <ActivityCard
                            key={activity.id}
                            activity={activity}
                        />
                    ))}
                </div>
            )}
        </main>
    )
}

export default SavedActivitiesPage;