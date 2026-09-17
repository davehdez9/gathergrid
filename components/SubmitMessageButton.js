'use client'

import { useFormStatus } from 'react-dom'

const SubmitMessageButton = () => {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
        >
            {pending ? 'Sending...' : 'Send Message'}
        </button>
    )
}

export default SubmitMessageButton