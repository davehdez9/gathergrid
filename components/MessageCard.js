'use client'

import { useState } from "react"
import { toast } from "react-toastify"
import markMessageAsRead from "@/app/actions/markMessageAsRead"
import deleteMessage from "@/app/actions/deleteMessage"
import { useGlobalContext } from "@/context/GlobalContext"

const MessageCard = ({ message }) => {
    const { setUnreadCount } = useGlobalContext()

    const [isRead, setIsRead] = useState(message.read)
    const [isDeleted, setIsDeleted] = useState(false)

    const handleReadClick = async () => {
        const read = await markMessageAsRead(message._id)

        setIsRead(read)

        setUnreadCount((previousCount) =>
            read
                ? previousCount - 1
                : previousCount + 1
        )

        toast.success(
            read ? "Marked as read" : "Marked as new"
        )
    }

    const handleDeleteClick = async () => {
        const result = await deleteMessage(message._id)

        if (result.deleted) {
            if (!isRead) {
                setUnreadCount(
                    (previousCount) => previousCount - 1
                )
            }

            setIsDeleted(true)
            toast.success("Message deleted")
        }
    }

    if (isDeleted) {
        return (
            <div className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-4">
                <p className="text-sm font-medium text-gray-500">
                    Message deleted
                </p>
            </div>
        )
    }

    return (
        <article
            className={`rounded-2xl border bg-white p-5 shadow-sm transition sm:p-6 ${
                isRead
                    ? "border-gray-200"
                    : "border-gray-300 ring-1 ring-gray-200"
            }`}
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    {!isRead && (
                        <span className="inline-flex rounded-full bg-gray-900 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                            New
                        </span>
                    )}

                    <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-gray-500">
                        Activity inquiry
                    </p>

                    <h2 className="mt-1 text-xl font-bold tracking-tight text-gray-900">
                        {message.activity.title}
                    </h2>
                </div>

                <p className="shrink-0 text-sm text-gray-500">
                    {new Date(message.createdAt).toLocaleString()}
                </p>
            </div>

            <div className="mt-5 rounded-xl bg-gray-50 p-5">
                <p className="whitespace-pre-line leading-7 text-gray-700">
                    {message.body}
                </p>
            </div>

            <div className="mt-5 grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        From
                    </p>

                    <p className="mt-1 font-medium text-gray-900">
                        {message.sender.username}
                    </p>
                </div>

                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Reply by email
                    </p>

                    <a
                        href={`mailto:${message.email}`}
                        className="mt-1 inline-block break-all font-medium text-gray-900 transition hover:text-gray-600"
                    >
                        {message.email}
                    </a>
                </div>

                {message.phone && (
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Reply by phone
                        </p>

                        <a
                            href={`tel:${message.phone}`}
                            className="mt-1 inline-block font-medium text-gray-900 transition hover:text-gray-600"
                        >
                            {message.phone}
                        </a>
                    </div>
                )}
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row">
                <button
                    type="button"
                    onClick={handleReadClick}
                    className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                >
                    {isRead
                        ? "Mark as new"
                        : "Mark as read"}
                </button>

                <button
                    type="button"
                    onClick={handleDeleteClick}
                    className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2"
                >
                    Delete
                </button>
            </div>
        </article>
    )
}

export default MessageCard