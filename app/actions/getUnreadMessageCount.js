'use server'

import connectDB from "@/config/database"
import Message from "@/models/Message"
import getSessionUser from "@/utils/getSessionUser"

const getUnreadMessageCount = async () => {
    await connectDB()

    const sessionUser = await getSessionUser()
    const { userId } = sessionUser || {}

    if (!userId) {
        return {
            count: 0
        }
    }

    const count = await Message.countDocuments({
        recipient: userId,
        read: false
    })

    return {
        count
    }
}

export default getUnreadMessageCount
