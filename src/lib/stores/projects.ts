/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, writable } from 'svelte/store';
import { pb, currentUser } from '@/pocketbase';
import { onMount } from 'svelte';
import type { RecordModel } from 'pocketbase';

export const projects = writable<RecordModel[]>(await pb.collection('projects').getFullList())
export const selectedProjectId = writable<string>('')
export const selectedProject = writable<RecordModel | null>(null)

async function deleteProject(projectId: string) {
    try {
        await pb.collection('projects').delete(projectId)
    } catch (error) {
        console.error('Error deleting project:', error)
    }
}

function selectProject(projectId: string): undefined {
    const project = get(projects).find((p) => p.id === projectId)
    if (!project) {
        throw new Error('Project not found')
    }
    selectedProject.set(project)
    selectedProjectId.set(project.id)
}

function getUserId() {
    const user = get(currentUser)
    if (!user) {
        throw new Error('User not found')
    }
    return user.id
}

export { deleteProject, getUserId, selectProject }

onMount(async () => {
    // Projects retrieval and subscription
    await pb.collection('projects').subscribe('*', function (e) {
        if (e.action === 'create') {
            projects.update((list) => {
                list.push(e.record)
                return list
            })
        }

        if (e.action === 'update') {
            projects.update((list) => {
                const index = list.findIndex((r) => r.id === e.record.id)
                list[index] = e.record
                return list
            })
        }

        if (e.action === 'delete') {
            projects.update((list) => {
                return list.filter((r) => r.id !== e.record.id)
            })
        }
    })    

    // Selected project retrieval and subscription
    const user = get(currentUser)
    if (!user) return console.error('User not found')
    selectedProjectId.set(user.currentProject)
    console.log('user.currentProject', user.currentProject)
    selectedProject.set(get(projects).find((p) => p.id === user.currentProject) || null)

    await pb.collection('users').getOne('*').then((value) => value.currentProject) 

    await pb.collection('users').subscribe('*', async function (e) {
        if (e.action === 'update') {
            if (user === null) {
                return console.error('User not found')
            }
            if (user.id === e.record.id) {
                selectedProjectId.set(e.record.currentProject)
                selectedProject.set(get(projects).find((p) => p.id === e.record.currentProject) || null)
            }
        }

        if (e.action === 'delete') {
            if (user === null) {
                return console.error('User not found')
            }
            if (user.id === e.record.id) {
                selectedProjectId.set(get(projects)[0].id || '')
                selectedProject.set(get(projects)[0] || null)
            }
        }

        if (e.action === 'create') {
            if (user === null) {
                return console.error('User not found')
            }
            if (user.id === e.record.id) {
                selectedProjectId.set(e.record.currentProject)
                selectedProject.set(get(projects).find((p) => p.id === e.record.currentProject) || null)
            }
        }
    })
})