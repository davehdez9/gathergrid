import Link from "next/link"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            404
        </p>
        <h1 className="mt-4 text-4xl font-bold text-gray-900">
            Page Not Found
        </h1>
        <p className="mt-4 text-gray-600">
            The page you are looking for does not exist.
        </p>
        <Link className="mt-8 inline-block rounded-lg bg-gray-900 px-5 py-3 font-medium text-white hover:bg-gray-700" href="/">
            Back to Home
        </Link>
    </div>
  )
}
