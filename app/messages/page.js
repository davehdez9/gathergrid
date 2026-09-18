import connectDB from "@/config/database"
import Message from "@/models/Message"
import getSessionUser from "@/utils/getSessionUser"
import convertToSerializableObject from "@/utils/convertToSerializableObject"
import MessageCard from "@/components/MessageCard"

const MessagesPage = async () => {
    await connectDB()

    const sessionUser = await getSessionUser()

    const { userId } = sessionUser || {}

    if (!userId) {
        throw new Error("User ID is required")
    }

    const unreadMessages = await Message.find({
        recipient: userId,
        read: false
    })
        .sort({ createdAt: -1 })
        .populate("sender", "username")
        .populate("activity", "title")
        .lean()

    const readMessages = await Message.find({
        recipient: userId,
        read: true
    })
        .sort({ createdAt: -1 })
        .populate("sender", "username")
        .populate("activity", "title")
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
        <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
            <header>
                <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                    Inbox
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Your Messages
                </h1>

                <p className="mt-3 max-w-2xl text-lg leading-8 text-gray-600">
                    Read and manage inquiries people have sent about your
                    activities.
                </p>
            </header>

            <section className="mt-10">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Activity Inquiries
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {unreadMessages.length} unread
                        </p>
                    </div>

                    <p className="text-sm font-medium text-gray-500">
                        {messages.length}{" "}
                        {messages.length === 1
                            ? "message"
                            : "messages"}
                    </p>
                </div>

                {messages.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
                        <h3 className="text-lg font-semibold text-gray-900">
                            No messages yet
                        </h3>

                        <p className="mx-auto mt-2 max-w-md text-gray-600">
                            When someone sends an inquiry about one of your
                            activities, it will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {messages.map((message) => (
                            <MessageCard
                                key={message._id}
                                message={message}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    )
}

export default MessagesPage