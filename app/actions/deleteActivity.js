// DELETE ACTIVITY
'use server'

import cloudinary from "@/config/cloudinary"
import connectDB from "@/config/database"
import Activity from "@/models/Activity"
import getSessionUser from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"

// receive activityId
const deleteActivity = async (activityId) => {
    // connect to database
    await connectDB()

    // get signed-in users
    const sessionUser = await getSessionUser()

    const { userId } = sessionUser || {}

    // if there is not signed-in user
    //     stop with an error
    if (!userId) {
        throw new Error('User ID is required')
    }

    // find the activity using activityId
    const activity = await Activity.findById(activityId)

    // if the activity does not exist
    //     stop with an error
    if (!activity) {
        throw new Error('Activity not found')
    }

    // if they are not the owner
    //     stop with an error
    if (!activity.owner || activity.owner.toString() !== userId) {
        throw new Error('Unauthorized')
    }

    // look at the Activity's images

    // for every image:
    //     get the filename from the clodinary URL
    //     remove the file extension
    //     build the Cloudinary public ID
    //     delete the image from Cloudinary
    for (const imageUrl of activity.images || []) {
        const imageName = imageUrl.split('/').pop()
        const publicId = imageName.split('.')[0]
        await cloudinary.uploader.destroy(`GatherGrid/${publicId}`)
    }

    // delete the Activity from MongoDB
    await activity.deleteOne()

    // tell Next.js that cached data may be outdated
    revalidatePath('/', 'layout')
}

export default deleteActivity
