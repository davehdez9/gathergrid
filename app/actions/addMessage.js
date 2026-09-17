'use server'

import connectDB from "@/config/database"
import getSessionUser from "@/utils/getSessionUser"
import Activity from "@/models/Activity"
import Message from "@/models/Message"

const addMessage = async (previousState, formData) => {
    await connectDB()

    const sessionUser = await getSessionUser()
    const { userId } = sessionUser || {}

    if (!userId) {
        throw new Error('User ID is required')
    }

    const activityId = formData.get('activityId')

    const activity = await Activity.findById(activityId)

    if (!activity) {
        return {
            error: 'Activity not found'
        }
    }

    if (!activity.owner) {
        return {
            error: 'This activity cannot receive messages'
        }
    }

    if (activity.owner.toString() === userId) {
        return {
            error: 'You cannot send a message to yourself'
        }
    }

    const name = formData.get('name')
    const email = formData.get('email')
    const phone = formData.get('phone')
    const body = formData.get('body')

    const messageData = {
        sender: userId,
        recipient: activity.owner,
        activity: activity._id,
        name,
        email,
        phone,
        body
    }

    const newMessage = new Message(messageData)

    await newMessage.save()

    return {
        submitted: true
    }
}

export default addMessage
