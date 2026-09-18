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
        return (
            <div className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-6">
                <p className="font-semibold text-gray-900">
                    Message sent
                </p>

                <p className="mt-1 text-sm leading-6 text-gray-600">
                    Your inquiry has been sent to the activity organizer.
                </p>
            </div>
        )
    }

    return (
        <form action={formAction} className="space-y-5">
            <input
                type="hidden"
                name="activityId"
                value={activityId}
            />

            <div>
                <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                >
                    Name
                </label>

                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                        Email
                    </label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="you@example.com"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                    />
                </div>

                <div>
                    <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                        Phone
                        <span className="ml-1 font-normal text-gray-400">
                            Optional
                        </span>
                    </label>

                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="Your phone number"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor="body"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                >
                    Message
                </label>

                <textarea
                    id="body"
                    name="body"
                    required
                    rows={5}
                    placeholder="Ask the organizer about the activity..."
                    className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                />
            </div>

            <SubmitMessageButton />
        </form>
    )
}

export default ActivityContactForm