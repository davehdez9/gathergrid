import Link from "next/link";
import Image from "next/image";

export default function ActivityCard({ activity }) {
  const hasImage = activity.images?.length > 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
      {hasImage && (
        <Link
          href={`/activities/${activity.id}`}
          className="block overflow-hidden bg-gray-100"
        >
          <Image
            src={activity.images[0]}
            alt={activity.title}
            width={800}
            height={500}
            className="h-52 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        </Link>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div>
          <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
            {activity.category}
          </span>

          <h2 className="mt-3 text-xl font-bold tracking-tight text-gray-900">
            <Link
              href={`/activities/${activity.id}`}
              className="transition hover:text-gray-600"
            >
              {activity.title}
            </Link>
          </h2>

          <p className="mt-2 text-sm font-medium text-gray-500">
            {activity.location}
          </p>

          <p className="mt-4 leading-7 text-gray-600">
            {activity.description}
          </p>
        </div>

        <div className="mt-auto pt-6">
          <Link
            href={`/activities/${activity.id}`}
            className="inline-flex items-center text-sm font-semibold text-gray-900 transition hover:text-gray-600"
          >
            View details
            <span className="ml-1" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
