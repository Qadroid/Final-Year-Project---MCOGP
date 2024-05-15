import { writable } from 'svelte/store'
import { account, databases, ID } from '@/appwrite'
import type { Models } from 'appwrite';
import { userInit } from '@/kubernetes/kubeUtils';

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

    const newKubeConfig = await userInit(email);

    try {
        await databases.createDocument(
            'mcogp',
            'projects',
            ID.unique(),
            {
                name: 'default',
                kubeConfig: newKubeConfig,
                email: email,
            }
        )
    } catch (error) {
        throw new Error('Failed to create project')
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
