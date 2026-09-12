'use server'

import connectDB from "@/config/database"
import Activity from "@/models/Activity"
import getSessionUser from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import cloudinary from "@/config/cloudinary"

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
    const images = formData
        .getAll('images')
        .filter((image) => image.name)

    if (images.length > 3) {
        throw new Error('You can upload a maximum of 3 images.')
    }

    const activityData = {
        title,
        category,
        location,
        description,
        owner: userId,
    }

    const imageUrls = []

    for (const imageFile of images) {
        const imageBuffer = await imageFile.arrayBuffer()

        const imageArray = new Uint8Array(imageBuffer)

        const imageData = Buffer.from(imageArray)

        const imageBase64 = imageData.toString('base64')

        const result = await cloudinary.uploader.upload(
            `data:${imageFile.type};base64,${imageBase64}`,
            {
                folder: 'GatherGrid',
            }
        )
        imageUrls.push(result.secure_url)
    }

    activityData.images = imageUrls

    const newActivity = new Activity(activityData)

    await newActivity.save()

    revalidatePath('/', 'layout')
    redirect(`/activities/${newActivity._id}`)
}

export default addActivity
