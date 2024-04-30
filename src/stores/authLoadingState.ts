import { writable } from 'svelte/store';

export const loginLoading = writable(false);
export const registerLoading = writable(false);

export function setLoginLoading(value: boolean) {
  loginLoading.set(value);
}

export function setRegisterLoading(value: boolean) {
  registerLoading.set(value);
}
