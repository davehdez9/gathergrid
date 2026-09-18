import Link from "next/link"
import ActivityAddForm from "@/components/ActivityAddForm"

export default function AddActivityPage() {
    return (
        <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
            <Link
                href="/activities"
                className="text-sm font-semibold text-gray-500 transition hover:text-gray-900"
            >
                ← Back to Activities
            </Link>

            <header className="mt-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                    Create
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Add Activity
                </h1>

                <p className="mt-3 max-w-2xl text-lg leading-8 text-gray-600">
                    Share a workshop, meetup, or hobby activity with the
                    GatherGrid community.
                </p>
            </header>

            <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <ActivityAddForm />
            </section>
        </main>
    )
}