import Link from "next/link"

export default function NotFound() {
    return (
        <main className="mx-auto flex min-h-[60vh] max-w-2xl items-center px-4 py-16 text-center sm:px-6">
            <div className="w-full">
                <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                    404
                </p>

                <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Page Not Found
                </h1>

                <p className="mx-auto mt-4 max-w-lg text-lg leading-8 text-gray-600">
                    The page you are looking for does not exist or may have been
                    moved.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-700"
                    >
                        Back to Home
                    </Link>

                    <Link
                        href="/activities"
                        className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
                    >
                        Browse Activities
                    </Link>
                </div>
            </div>
        </main>
    )
}