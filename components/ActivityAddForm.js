import addActivity from "@/app/actions/addActivity"

const ActivityAddForm = () => {
    return (
        <form
            action={addActivity}
            className="mt-8 space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
        >
            <div>
                <label
                    htmlFor="title"
                    className="mb-2 block font-medium text-gray-700"
                >
                    Title
                </label>

                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
            </div>

            <div>
                <label
                    htmlFor="category"
                    className="mb-2 block font-medium text-gray-700"
                >
                    Category
                </label>

                <select
                    id="category"
                    name="category"
                    required
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                    <option value="">Select a Category</option>
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
                    className="mb-2 block font-medium text-gray-700"
                >
                    Location
                </label>

                <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
            </div>

            <div>
                <label
                    htmlFor="description"
                    className="mb-2 block font-medium text-gray-700"
                >
                    Description
                </label>

                <textarea
                    id="description"
                    name="description"
                    required
                    rows="5"
                    className="w-full resize-y rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
            </div>

            <button
                type="submit"
                className="rounded-md bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
                Add Activity
            </button>
        </form>
    )
}

export default ActivityAddForm
