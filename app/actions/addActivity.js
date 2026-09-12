'use server'

import connectDB from "@/config/database"
import Activity from "@/models/Activity"
import getSessionUser from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const addActivity = async (formData) => {
    await connectDB()

    const sessionUser = await getSessionUser()
    const { userId } = sessionUser || {}

    if (!userId) {
        throw new Error('User ID is required')
    }

    const title = formData.get('title')
    const category = formData.get('category')
    const location = formData.get('location')
    const description = formData.get('description')

    const activityData = {
        title,
        category,
        location,
        description,
        owner: userId,
    }

    const newActivity = new Activity(activityData)

    await newActivity.save()

    revalidatePath('/', 'layout')
    redirect(`/activities/${newActivity._id}`)
}

export default addActivity
