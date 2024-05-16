/* eslint-disable @typescript-eslint/no-explicit-any */
import { writable } from 'svelte/store';
import { pb } from '@/pocketbase';
import { type RecordModel } from 'pocketbase';

export const projects = writable<RecordModel[]>([]);
export const selectedProject = writable<RecordModel>(undefined);

async function getProjects() {    
    try {
        const resultList = await pb.collection('projects').getFullList({
            sort: 'created',
            expand: 'name, id',
        })
        
        projects.set(resultList);
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
}

export { getProjects }