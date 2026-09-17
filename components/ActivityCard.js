import Link from "next/link"
import Image from "next/image"

export default function ActivityCard({ activity }) {
    const hasImage = activity.images?.length > 0
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
        {hasImage && (
            <Link href={`/activities/${activity.id}`}>
                <Image
                    src={activity.images[0]}
                    alt={activity.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover rounded-lg"
                />
            </Link>
        )}
        <p className="text-sm font-medium text-gray-500">
            {activity.category}
        </p>
        <h2 className="mt-2 text-xl font-semibold text-gray-900">
            {activity.title}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
            {activity.location}
        </p>
        <p className="mt-3 text-gray-600">
            {activity.description}
        </p>
        <Link href={`/activities/${activity.id}`} className="mt-4 inline-block text-sm font-semibold text-gray-900 hover:underline">
            View Details
        </Link>
    </div>
  )
}
