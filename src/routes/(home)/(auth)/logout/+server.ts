import { redirect } from '@sveltejs/kit'

export const POST = ({ locals })  => {
    locals.pb.authStore.clear()
    locals.user = undefined
    return redirect(303, '/login')
}