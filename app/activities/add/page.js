import ActivityAddForm from "@/components/ActivityAddForm"

export default function AddActivityPage() {
    return (
        <main className="mx-auto max-w-2xl px-6 py-10">
            <h1 className="text-3xl font-bold text-gray-900">
                Add Activity
            </h1>

            <ActivityAddForm />
        </main>
    )
}
