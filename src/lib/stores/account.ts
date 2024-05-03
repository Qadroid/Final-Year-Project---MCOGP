// Inspired by https://github.com/n3-rd/appkit/blob/master/src/store.js

import { writable } from 'svelte/store';
import { sdk, ID } from '$lib/appwrite';

const createState = () => {
    const { subscribe, set, update } = writable({
        account: null,
        alert: null
    });

    return {
        subscribe,
        signup: async (email: string, password: string) => {
            return await sdk.account.create(ID.unique(), email, password);
        },
        user: async () => {
            return await sdk.account.get();
        },
        login: async (email: string, password: string) => {
            await sdk.account.createEmailPasswordSession(email, password);
            const user = await sdk.account.get();
            state.init(user);
        },
        logout: async () => {
            await sdk.account.deleteSession('current');
        },
        alert: async (alert) =>
            update((n) => {
                n.alert = alert;
                return n;
            }),
        init: async (account = null) => {
            return set({ account, alert: null });
        },
        checkSession: async () => {
            const user = await sdk.account.get();
            state.init(user);
        },
        changeName: async (name: string) => {
            return await sdk.account.updateName(name);
        }
    };
};
export const state = createState();