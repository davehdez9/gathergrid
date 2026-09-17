import connectDB from '@/config/database';
import Message from '@/models/Message';
import Activity from '@/models/Activity';
import User from '@/models/User';
import getSessionUser from '@/utils/getSessionUser';
import convertToSerializableObject from "@/utils/convertToSerializableObject"
import MessageCard from "@/components/MessageCard"

const MessagesPage = async () => {
    await connectDB()

    const sessionUser = await getSessionUser()

    const { userId } = sessionUser || {}

    if (!userId) {
        throw new Error('User ID is required')
    }

    const unreadMessages = await Message.find({
        recipient: userId,
        read: false
    })
    .sort({ createdAt: -1 })
    .populate('sender', 'username')
    .populate('activity', 'title')
    .lean()

    const readMessages = await Message.find({
        recipient: userId,
        read: true,
    })
    .sort({ createdAt: -1 })
    .populate('sender', 'username')
    .populate('activity', 'title')
    .lean()

    const messages = [
        ...unreadMessages,
        ...readMessages
    ].map((messageDoc) => {
        const message = convertToSerializableObject(messageDoc)

        message.sender = convertToSerializableObject(messageDoc.sender)
        message.activity = convertToSerializableObject(messageDoc.activity)

        return message
    })

    return (
        <main>
            <h1>Your Messages</h1>
            
            {messages.length === 0 ? (
                <p>You have no messages</p>
            ) : (
                messages.map((message) => (
                    <MessageCard
                        key={message._id}
                        message={message}
                    />
                ))
            )}
        </main>
    )
}

export default MessagesPage;
