import addActivity from "@/app/actions/addActivity"

const ActivityAddForm = () => {
    const fieldClass =
        "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"

    const labelClass =
        "mb-2 block text-sm font-semibold text-gray-700"

    return (
        <form
            action={addActivity}
            className="space-y-6"
        >
            <div>
                <label
                    htmlFor="title"
                    className={labelClass}
                >
                    Title
                </label>

                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    placeholder="Example: Beginner Pottery Workshop"
                    className={fieldClass}
                />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                <div>
                    <label
                        htmlFor="category"
                        className={labelClass}
                    >
                        Category
                    </label>

                    <select
                        id="category"
                        name="category"
                        required
                        className={fieldClass}
                    >
                        <option value="">
                            Select a category
                        </option>

                        <option value="Arts & Crafts">
                            Arts & Crafts
                        </option>

                        <option value="Food & Cooking">
                            Food & Cooking
                        </option>

                        <option value="Outdoors">
                            Outdoors
                        </option>

                        <option value="Photography">
                            Photography
                        </option>

                        <option value="Technology">
                            Technology
                        </option>

                        <option value="Other">
                            Other
                        </option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="location"
                        className={labelClass}
                    >
                        Location
                    </label>

                    <input
                        type="text"
                        id="location"
                        name="location"
                        required
                        placeholder="Example: Lancaster Community Center"
                        className={fieldClass}
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor="description"
                    className={labelClass}
                >
                    Description
                </label>

                <textarea
                    id="description"
                    name="description"
                    required
                    rows={6}
                    placeholder="Describe what participants can expect..."
                    className={`${fieldClass} resize-y leading-6`}
                />
            </div>

            <div>
                <label
                    htmlFor="images"
                    className={labelClass}
                >
                    Images
                </label>

                <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-5">
                    <input
                        type="file"
                        id="images"
                        name="images"
                        accept="image/*"
                        multiple
                        required
                        className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-900 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white file:transition hover:file:bg-gray-700"
                    />

                    <p className="mt-3 text-sm leading-6 text-gray-500">
                        Upload up to 3 images that help people understand the
                        activity.
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-gray-500">
                    All fields except additional images are required.
                </p>

                <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                    Add Activity
                </button>
            </div>
        </form>
    )
}

export default ActivityAddForm