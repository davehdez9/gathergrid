import connectDB from '@/config/database';
import Activity from '@/models/Activity';
import { notFound } from 'next/navigation';
import convertToSerializableObject from '@/utils/convertToSerializableObject';
import ActivityEditForm from '@/components/ActivityEditForm';


const ActivityEditPage = async ({ params }) => {
    const { id } = await params

    await connectDB()

    const activityDoc = await Activity.findById(id).lean()

    if (!activityDoc) {
        notFound()
    }

    const activity = convertToSerializableObject(activityDoc)

    return (
        <section className="bg-gray-50 py-10">
            <div className="mx-auto max-w-2xl px-6">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h1 className="mb-6 text-2xl font-bold text-gray-900">
                        Edit Activity
                    </h1>

                    <ActivityEditForm activity={activity} />
                </div>
            </div>
        </section>
    )
}

export default ActivityEditPage;