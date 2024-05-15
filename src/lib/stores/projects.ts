/* eslint-disable @typescript-eslint/no-explicit-any */
import { writable } from 'svelte/store';
import { account, databases, ID, storage } from '@/appwrite';
import type { Models } from 'appwrite';

export const projects = writable<Models.Document[] | undefined>(undefined);
export const selectedProject = writable<Models.Document | undefined>(undefined);

// Function to create a project
async function createProject(projectName: string, selectedKubeConfigType: string, newKubeConfigFile: any | null, newKubeConfigText: string | null) {
    
    if (selectedKubeConfigType === 'file') {
        if (!newKubeConfigFile) {
            throw new Error('Kubeconfig file is required');
        }

        let storageResult
        let projectResult

        try {
            storageResult = await storage.createFile(
                '66441e9a0015ebc7335a',
                ID.unique() + '.' + projectName,
                newKubeConfigFile,
                [`user:${(await account.get()).$id}`]
            )

            console.log('Kubeconfig file uploaded:', storageResult);
        } catch (error) {
            console.error('Error uploading kubeconfig file:', error);
        }
        
        try {

            if (!storageResult) {
                throw new Error('File upload failed');
            }

            projectResult = await databases.createDocument(
                'mcogp',
                'projects',
                'unique()', 
                { 
                    name: projectName, 
                    kubeConfigType: selectedKubeConfigType, 
                    kubeConfigFile: storageResult.$id 
                },
                [`user:${(await account.get()).$id}`]
            )
            
            console.log('Project created:', projectResult);
        } catch (error) {
            console.error('Error creating project:', error);
        }
    }


    if (selectedKubeConfigType === 'text') {
        if (!newKubeConfigText) {
            throw new Error('Kubeconfig text is required');
        }
        
        let projectResult

        try {
            projectResult = await databases.createDocument(
                'mcogp',
                'projects',
                'unique()', 
                { 
                    name: projectName, 
                    kubeConfigType: selectedKubeConfigType, 
                    kubeConfigText: newKubeConfigText 
                },
                [`user:${(await account.get()).$id}`]
            )
            
            console.log('Project created:', projectResult);
        } catch (error) {
            console.error('Error creating project:', error);
        }
    }
}

async function getProjects() {
    let projectsResult

    try {
        projectsResult = await databases.listDocuments(
            'mcogp',
            'projects',
        )

        console.log('Projects fetched:', projectsResult);
    } catch (error) {
        console.error('Error fetching projects:', error);
    }

    projects.set(projectsResult?.documents);
    selectedProject.set(projectsResult?.documents[0]);
}

export { createProject, getProjects }