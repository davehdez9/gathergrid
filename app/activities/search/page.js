import connectDB from '@/config/database';
import Activity from '@/models/Activity';
import ActivityCard from '@/components/ActivityCard';
import ActivitySearchForm from "@/components/ActivitySearchForm"

const SearchPage = async ({ searchParams }) => {
    const params = await searchParams

    const { 
        keyword = '',
        category = 'All'
    } = params

    await connectDB()

    const query = {}

    if (keyword && keyword.trim()) {
        const keywordPattern = new RegExp(keyword.trim(), 'i')

        query.$or = [
            { title: keywordPattern },
            { description: keywordPattern },
            { location: keywordPattern },
        ]
    }

    if (category !== 'All') {
        query.category = category
    }

    const activities = await Activity.find(query).lean()

    const serializedActivities = activities.map(({ _id, ...activity}) => ({
        ...activity,
        id: _id.toString()
    }))
    
    return (
        <main className="mx-auto max-w-4xl px-6 py-16">
            <ActivitySearchForm />
            
            <h1 className="mt-8 text-3xl font-bold text-gray-900">
                Search Results
            </h1>
            
            {serializedActivities.length === 0 ? (
                <p className="mt-6 text-gray-600">
                    No search results
                </p>
            ): (
                <div className="mt-8 space-y-4">
                    {serializedActivities.map((activity) => (
                        <ActivityCard
                            key={activity.id}
                            activity={activity}
                        />
                    ))}
                </div>
            )}
        </main>
    )
}

export default SearchPage;
