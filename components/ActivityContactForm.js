'use client'

import { useActionState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"
import addMessage from "@/app/actions/addMessage"
import SubmitMessageButton from "@/components/SubmitMessageButton"

const ActivityContactForm = ({ activityId }) => {
    const { data: session } = useSession()
    const [state, formAction] = useActionState(addMessage, {})

    useEffect(() => {
        if (state.error) {
            toast.error(state.error)
        }
    }, [state.error])

    useEffect(() => {
        if (state.submitted) {
            toast.success('Message sent successfully')
        }
    }, [state.submitted])

    if (!session) {
        return null
    }

    if (state.submitted) {
        return <p>Your Message has been sent</p>
    }

    return (
        <form action={formAction}>
            <input
                type="hidden"
                name="activityId"
                value={activityId}
            />

            <label htmlFor="name">Name</label>
            <input
                type="text"
                id="name"
                name="name"
                required
            />

            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                required
            />

            <label htmlFor="phone">Phone</label>
            <input
                type="text"
                id="phone"
                name="phone"
            />

            <label htmlFor="body">Message</label>
            <textarea
                id="body"
                name="body"
                required
            ></textarea>

            <SubmitMessageButton />
        </form>
    )
}

export default ActivityContactForm;
