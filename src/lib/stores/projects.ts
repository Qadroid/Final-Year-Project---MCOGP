import { writable } from 'svelte/store';

export const projects = writable<Project[]>([]);
export const selectedProject = writable(null);

export interface Project {
    created_at: string;
    user_id: string;
    kubeconfig: Record<string, unknown> | null;
    name: string;
    init: boolean;
    description: string | null;
}