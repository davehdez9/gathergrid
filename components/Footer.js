import Link from "next/link"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="mt-16 border-t border-gray-200 bg-white">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <Link
                            href="/"
                            className="text-lg font-bold tracking-tight text-gray-900 transition hover:text-gray-600"
                        >
                            GatherGrid
                        </Link>

                        <p className="mt-2 max-w-md text-sm leading-6 text-gray-600">
                            A community directory for discovering local workshops,
                            creative meetups, and hobby activities.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 text-sm sm:items-end">
                        <Link
                            href="/activities"
                            className="font-semibold text-gray-700 transition hover:text-gray-900"
                        >
                            Browse Activities
                        </Link>

                        <p className="text-gray-500">
                            © {currentYear} GatherGrid
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}