'use server';

import connectDB from '@/config/database';
import Activity from '@/models/Activity';
import getSessionUser from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


const updateActivity = async (activityId, formData) => {
  // Make sure MongoDB is connected.
  await connectDB();

  // Find out who is currently signed in.
  const sessionUser = await getSessionUser();

  // Pull the user's ID out of the session result.
  const { userId } = sessionUser || {};

  // Nobody should be able to update an Activity while signed out.
  if (!userId) {
    throw new Error('User ID is required');
  }

  // Find the Activity that the user is trying to update.
  const existingActivity = await Activity.findById(activityId);

  // Stop if that Activity does not exist.
  if (!existingActivity) {
    throw new Error('Activity not found');
  }

  // Make sure the logged-in user actually owns this Activity.
  if (
    !existingActivity.owner ||
    existingActivity.owner.toString() !== userId
  ) {
    throw new Error('Unauthorized');
  }

  // Read only the fields that the user is allowed to edit.
  const title = formData.get('title');
  const category = formData.get('category');
  const location = formData.get('location');
  const description = formData.get('description');

  // Update only those four fields.
  // owner and images are intentionally left untouched.
  await Activity.findByIdAndUpdate(activityId, {
    title,
    category,
    location,
    description,
  });

  // Tell Next.js that cached data may now be outdated.
  revalidatePath('/', 'layout');

  // Send the user back to the updated Activity.
  redirect(`/activities/${activityId}`);
};

export default updateActivity;