// Import getServerSession from NextAuth.
// This lets us check the current user's session on the server.
import { getServerSession } from "next-auth";

// Import the authentication configuration that already exists in the project.
import { authOptions } from "./authOptions";


// Create a reusable async function that gets the currently logged-in user.
const getSessionUser = async () => {
    // Ask NextAuth for the current server-side session.
    // authOptions tells NextAuth which authentication setup to use.
    const session = await getServerSession(authOptions)

    // If there is no session, or the session does not contain a user,
    // then nobody is currently logged in.
    if (!session || !session.user) {
        return null
    }

    // If a user is logged in, return both:
    // 1. the full user object
    // 2. the user's ID by itself for easier access
    return {
        user: session.user,
        userId: session.user.id,
    }
}

// Export the helper so other server-side files can use it.
export default getSessionUser
