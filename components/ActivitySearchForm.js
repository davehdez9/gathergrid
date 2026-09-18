'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ActivitySearchForm = () => {
    const [keyword, setKeyword] = useState('')
    const [category, setCategory] = useState('All')

    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!keyword.trim() && category === 'All') {
            router.push('/activities')
            return
        }

        const encodedKeyword = encodeURIComponent(keyword.trim())
        const encodedCategory = encodeURIComponent(category)

        router.push(
            `/activities/search?keyword=${encodedKeyword}&category=${encodedCategory}`
        )
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="grid gap-4 md:grid-cols-[1fr_220px_auto]"
        >
            <div>
                <label
                    htmlFor="keyword"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                >
                    Search
                </label>

                <input
                    id="keyword"
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Title, description, or location"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                />
            </div>

            <div>
                <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                >
                    Category
                </label>

                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                >
                    <option value="All">All Categories</option>
                    <option value="Arts & Crafts">Arts & Crafts</option>
                    <option value="Food & Cooking">Food & Cooking</option>
                    <option value="Outdoors">Outdoors</option>
                    <option value="Photography">Photography</option>
                    <option value="Technology">Technology</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className="flex items-end">
                <button
                    type="submit"
                    className="w-full rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 md:w-auto"
                >
                    Search
                </button>
            </div>
        </form>
    )
}

export default ActivitySearchForm
