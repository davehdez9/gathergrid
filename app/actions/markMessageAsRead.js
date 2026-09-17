'use server'

import connectDB from '@/config/database';
import Message from '@/models/Message';
import getSessionUser from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

const markMessageAsRead = async (messageId) => {
    await connectDB()

    const sessionUser = await getSessionUser()

    const { userId } = sessionUser || {}

    if (!userId) {
        throw new Error('User ID is required')
    }

    const message = await Message.findById(messageId)

    if (!message) {
        throw new Error('Message not found')
    }

    if (message.recipient.toString() !== userId) {
        throw new Error('Unauthorized')
    }

    message.read = !message.read

    await message.save()

    revalidatePath('/messages', 'page')

    return message.read
}

export default markMessageAsRead;
