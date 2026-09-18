'use client'

import Link from "next/link"

const ErrorPage = ({ error }) => {
    return (
        <main className="mx-auto flex min-h-[60vh] max-w-2xl items-center px-4 py-16 text-center sm:px-6">
            <div className="w-full">
                <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                    Error
                </p>

                <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">
                    Something went wrong
                </h1>

                <p className="mx-auto mt-4 max-w-lg leading-7 text-gray-600">
                    GatherGrid ran into an unexpected problem while loading this
                    page.
                </p>

                <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-left">
                    <p className="break-words text-sm text-gray-600">
                        {error.toString()}
                    </p>
                </div>

                <Link
                    href="/"
                    className="mt-8 inline-flex rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-700"
                >
                    Back to Home
                </Link>
            </div>
        </main>
    )
}

export default ErrorPage