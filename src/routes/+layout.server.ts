import { state } from '$lib/stores/account';
import { onMount } from 'svelte';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

onMount(async () => {
    const loggedIn = await state.checkSession();
    console.log(loggedIn);
    console.log(state.user)
})

// export const load: LayoutServerLoad = async () => {
//     return {
//         loggedIn: await state.checkSession().catch()
//     }
// }

export const _actions = {
    logout: async () => {
        await state.logout();
        redirect(301, '/');
    }
}