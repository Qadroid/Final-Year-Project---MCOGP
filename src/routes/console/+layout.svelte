<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
    import ConsoleNavbar from '@/components/custom/ConsoleNavbar.svelte';
    import { pb, currentUser } from '@/pocketbase';
	import { projects, selectedProject } from '@/stores/projects';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

    onMount (async () => {
        const projectList = await pb.collection('projects').getFullList()
        projects.set(projectList)
        const selected = projectList.find((project) => project.id === $currentUser?.selectedProject) || null
        selectedProject.set(selected)

        if (!selectedProject) {
            if ($projects.length > 0) {
                await pb.collection('users').update(get(currentUser)?.id, { selectedProject: $projects[0].id })
            }
        }

        pb.collection('projects').subscribe('*', async({ action, record }) => {
            projects.update((currentProjects) => {
                if (action === 'create') {
                    return [...currentProjects, record];
                }

                if (action === 'update') {
                    return currentProjects.map((proj) => proj.id === record.id ? record : proj);
                }

                if (action === 'delete') {
                    return currentProjects.filter((proj) => proj.id !== record.id);
                }
                return currentProjects;
            });
        })

        pb.collection('users').subscribe('*', ({ action, record }) => {
            if (action === 'update' && record.id === get(currentUser)?.id) {
                selectedProject.set(record.selectedProject);
                if (record.selectedProject) {
                    navigateToProject(record.selectedProject);
                }
            }
        });
    });

    function navigateToProject(projectId: string) {
        const currentPath = $page.url.pathname;
        const newPath = currentPath.replace(/\/console\/[^\/]+/, `/console/${projectId}`);
        goto(newPath);
    }
</script>

<div class="w-full h-full flex flex-row">
    
    <!-- Left side navbar -->
    <div>
        <ConsoleNavbar/>
    </div>

    <!-- Content -->
    <div class="flex flex-col w-full">    
        <div class="flex flex-col grow px-8 py-6 w-full h-full">
            <slot />
        </div>
    </div>
</div>