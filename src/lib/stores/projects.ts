import { writable } from 'svelte/store';
import type { RecordModel } from 'pocketbase';

export const projects = writable<RecordModel[]>([]);
export const selectedProject = writable<RecordModel | null>(null);
