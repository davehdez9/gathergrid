'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

import bookmarkActivity from "@/app/actions/bookmarkActivity"
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus"

const BookmarkButton = ({ activityId }) => {
    const { data: session, status } = useSession()

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
    }, [session, status, activityId])

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
        return (
            <div className="h-11 w-full animate-pulse rounded-lg bg-gray-100" />
        )
    }

    return (
        <button
            type="button"
            onClick={handleBookmarkClick}
            className={
                isBookmarked
                    ? "inline-flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                    : "inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            }
        >
            {isBookmarked ? 'Remove Saved Activity' : 'Save Activity'}
        </button>
    )
}

export default BookmarkButton