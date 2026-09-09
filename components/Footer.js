import Link from "next/link"

export default function Footer() {
    const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 px-6 py-8 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-semibold text-gray-900">
                GatherGrid
            </p>
            <p>
                A community directory for discovering local workshops and hobby activities.
            </p>

            <Link href="/activities" className="font-medium text-gray-600 hover:text-gray-900">
                Browse Activities
            </Link>

            <p>
                {currentYear} GatherGrid
            </p>
        </div>
    </footer>
  )
}
