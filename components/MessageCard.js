'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import markMessageAsRead from '@/app/actions/markMessageAsRead'
import deleteMessage from '@/app/actions/deleteMessage'
import { useGlobalContext } from '@/context/GlobalContext'

const MessageCard = ({ message }) => {
    const { setUnreadCount } = useGlobalContext()

    const [isRead, setIsRead] = useState(message.read)

    const [isDeleted, setIsDeleted] = useState(false)

    const handleReadClick = async () => {
        const read = await markMessageAsRead(message._id)

        setIsRead(read)

        setUnreadCount((previousCount) => 
            read
                ? previousCount -1
                : previousCount +1
        )

        toast.success(
            read ? 'Marked as read' : 'Marked as new'
        )
    }

    const handleDeleteClick = async () => {
        const result = await deleteMessage(message._id)

        if (result.deleted) {
            if (!isRead) {
                setUnreadCount((previousCount) => previousCount -1)
            }
            
            setIsDeleted(true)
            toast.success('Message deleted')
        }
    }

    if (isDeleted) {
        return <p>Deleted message</p>
    }

    return (
        <div>
            {!isRead && <span>NEW</span>}

            <h3>
                Activity inquiry: {message.activity.title}
            </h3>

            <p>
                From: {message.sender.username}
            </p>
            
            <p>
                Reply email:{' '}
                <a href={`mailto:${message.email}`}>
                    {message.email}
                </a>
            </p>

            {message.phone && (
                <p>
                    Reply phone:{' '}
                    <a href={`tel:${message.phone}`}>
                        {message.phone}
                    </a>
                </p>
            )}

            <p>
                Received: {new Date(message.createdAt).toLocaleString()}
            </p>

            <button
                type='button'
                onClick={handleReadClick}
            >
                {isRead ? 'Mark as new' : 'Mark as read'}
            </button>

            <button
                type="button"
                onClick={handleDeleteClick}
            >
                Delete
            </button>
        </div>
    )
}

export default MessageCard;
