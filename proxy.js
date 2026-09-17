import { withAuth } from "next-auth/middleware"

export async function proxy(request) {
    return withAuth(request)
}

export const config = {
    matcher: [
        "/activities/add",
        "/activities/saved",
        "/messages",
        "/profile",
    ],
}
