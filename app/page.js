import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">GatherGrid</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600">
        Discover local workshops and hobby activities in your community.
      </p>
      <Link href="/activities" className="mt-8 inline-block rounded-lg bg-gray-900 px-5 py-3 font-medium text-white hover:bg-gray-700">Browse Activities</Link>
    </main>
  );
}
