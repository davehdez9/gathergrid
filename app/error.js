'use client'

import Link from "next/link"

const ErrorPage = ({ error }) => {
    return (
        <div>
            <h1>Something went wrong</h1>
            <p>{error.toString()}</p>
            <Link href="/">
                Back to Home
            </Link>
        </div>
    )
}

export default ErrorPage
