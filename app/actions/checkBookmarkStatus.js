'use server'

import connectDB from '@/config/database';
import User from '@/models/User';
import getSessionUser from '@/utils/getSessionUser';

const checkBookmarkStatus = async (activityId) => {
    await connectDB()

    const sessionUser = await getSessionUser()

    const { userId } = sessionUser || {}

    if (!userId) {
        return {
            isBookmarked: false
        }
    }

    const user = await User.findById(userId)

    if (!user) {
        return {
            isBookmarked: false
        }
    }

    const isBookmarked = user.bookmarks.some(
        (bookmark) => bookmark.toString() === activityId
    )

    return {
        isBookmarked
    }
}

export default checkBookmarkStatus;
