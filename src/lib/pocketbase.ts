import PocketBase from 'pocketbase'
import { writable } from 'svelte/store'

const pb = new PocketBase('http://127.0.0.1:8090')

const currentUser = writable(pb.authStore.model)
const authState = writable(pb.authStore.isValid)

export { pb, currentUser, authState } 

pb.authStore.onChange(() => {
    currentUser.set(pb.authStore.model)
    authState.set(pb.authStore.isValid)

})