import { writable } from 'svelte/store'
import { account, ID } from '@/appwrite'
import type { Models } from 'appwrite';

const user = writable<Models.User<Models.Preferences> | null>(null)

const fetchUser = async () => {
    try {
        const response = await account.get()
        user.set(response)
    } catch (error) {
        user.set(null)
    }
};

const signup = async (email: string, password: string) => {
    try {
        await account.create(ID.unique(), email, password)
        fetchUser()
    } catch (error) {
        throw new Error('Signup failed')
    }
}

const login = async (email: string, password: string) => {
    try {
        await account.createEmailPasswordSession(email, password)
        fetchUser()
    } catch (error) {
        throw new Error('Login failed')
    }
};

const logout = async () => {
    try {
        await account.deleteSession('current')
        user.set(null)
    } catch (error) {
        throw new Error('Logout failed')
    }
};

fetchUser()

export { user, signup, login, logout, fetchUser }
