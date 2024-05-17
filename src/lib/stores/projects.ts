/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, writable } from 'svelte/store';
import { pb, currentUser } from '@/pocketbase';

export const projects = writable<any>(null)
export const selectedProject = writable<any>(null)

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

async function getUserId() {
    const user = get(currentUser)
    if (!user) {
        throw new Error('User not found')
    }
    return user.id
}

export { getProjects, getUserId}