'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

import bookmarkActivity from "@/app/actions/bookmarkActivity"
import checkBookmarkStatus from '@/app/actions/checkBookmarkStatus';

const BookmarkButton = ({ activityId }) => {
    const { data: session,status } = useSession()

    const [isBookmarked, setIsBookmarked] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getBookmarkStatus = async () => {
            if (status === 'loading') {
                return
            }

            if (!session) {
                setLoading(false)
                return
            }
            
            const result = await checkBookmarkStatus(activityId)

            setIsBookmarked(result.isBookmarked)

            setLoading(false)
        }

        getBookmarkStatus()
    }, [session, activityId])


    const handleBookmarkClick = async () => {
        if (!session) {
            toast.error('You need to be signed in to save an activity')
            return 
        }

        const result = await bookmarkActivity(activityId)

        setIsBookmarked(result.isBookmarked)

        toast.success(result.message)
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <button
            type="button"
            onClick={handleBookmarkClick}
        >
            {isBookmarked ? 'Remove Saved Activity' : 'Save Activity'}
        </button>
    )
}

export default BookmarkButton;

