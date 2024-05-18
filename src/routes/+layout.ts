import { pb, authState, currentUser } from "@/pocketbase"

export const load = async () => {
    return {
        pb,
        authState,
        currentUser,
    }
}