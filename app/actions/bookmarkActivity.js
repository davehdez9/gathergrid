'use server'

import connectDB from "@/config/database"
import User from "@/models/User"
import getSessionUser from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"

const bookmarkActivity = async (activityId) => {
    await connectDB()

    const sessionUser = await getSessionUser()

    const { userId } = sessionUser || {}

    if (!userId) {
        throw new Error("User ID is required")
    }

    const user = await User.findById(userId)

    if (!user) {
        throw new Error("User not found")
    }

    const isAlreadyBookmarked = user.bookmarks.some(
        (bookmark) => bookmark.toString() === activityId
    )

    let message
    let isBookmarked

    if (isAlreadyBookmarked) {
        user.bookmarks.pull(activityId)
        message = 'Bookmark removed'
        isBookmarked = false
    } else {
        user.bookmarks.push(activityId)
        message = 'Bookmark added'
        isBookmarked = true
    }

    await user.save()
    
    revalidatePath('/activities/saved')

    return {
        message,
        isBookmarked
    }
}

export default bookmarkActivity