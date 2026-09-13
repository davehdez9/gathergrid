import updateActivity from "@/app/actions/updateActivity"

const ActivityEditForm = ({ activity }) => {
    const updateActivityById = updateActivity.bind(null, activity._id)

    return (
        <form action={updateActivityById} className="space-y-5">

            <div>
                <label
                    htmlFor="title"
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Title
                </label>

                <input
                    type="text"
                    id="title"
                    name="title"
                    defaultValue={activity.title}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-gray-500 focus:outline-none"
                />
            </div>

            <div>
                <label
                    htmlFor="category"
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Category
                </label>

                <select
                    id="category"
                    name="category"
                    defaultValue={activity.category}
                    required
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-gray-500 focus:outline-none"
                >
                    <option value="Arts & Crafts">Arts & Crafts</option>
                    <option value="Food & Cooking">Food & Cooking</option>
                    <option value="Outdoors">Outdoors</option>
                    <option value="Photography">Photography</option>
                    <option value="Technology">Technology</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div>
                <label
                    htmlFor="location"
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Location
                </label>

                <input
                    type="text"
                    id="location"
                    name="location"
                    defaultValue={activity.location}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-gray-500 focus:outline-none"
                />
            </div>

            <div>
                <label
                    htmlFor="description"
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Description
                </label>

                <textarea
                    id="description"
                    name="description"
                    defaultValue={activity.description}
                    required
                    rows={5}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-gray-500 focus:outline-none"
                />
            </div>

            <button
                type="submit"
                className="w-full rounded-md bg-gray-900 px-4 py-2 font-medium text-white hover:bg-gray-700"
            >
                Update Activity
            </button>

        </form>
    )
}

export default ActivityEditForm;