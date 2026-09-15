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
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search by title, description, or location'
            />

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="All">All Categories</option>
                <option value="Arts & Crafts">Arts & Crafts</option>
                <option value="Food & Cooking">Food & Cooking</option>
                <option value="Outdoors">Outdoors</option>
                <option value="Photography">Photography</option>
                <option value="Technology">Technology</option>
                <option value="Other">Other</option>
            </select>

            <button type="submit">
                Search
            </button>
        </form>
    )
}

export default ActivitySearchForm;
