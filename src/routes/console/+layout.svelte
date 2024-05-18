<script lang="ts">
    import ConsoleNavbar from '@/components/custom/ConsoleNavbar.svelte';
    import { pb, currentUser } from '@/pocketbase';
	import type { RecordModel } from 'pocketbase';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

    let projects: RecordModel[]
    let selectedProject: RecordModel | null

    onMount (async () => {
        projects = await pb.collection('projects').getFullList()
        selectedProject = projects.find((project) => project.id === $currentUser?.selectedProject) || null
        if (!selectedProject) {
            if (projects.length > 0) {
                await pb.collection('users').update(get(currentUser)?.id, { selectedProject: projects[0].id })
            }
        }

        pb.collection('projects').subscribe('*', async({ action, record }) => {
            if (action === 'create') {
                projects = [...projects, record]
            }

            if (action === 'update') {
                projects = projects.map((proj) => proj.id === record.id ? record : proj);
            }

            if (action === 'delete') {
                projects = projects.filter((proj) => proj.id !== record.id);
            }
        })

        pb.collection('users').subscribe('*', async({ action, record }) => {
            if (action === 'update') {
                selectedProject = record.selectedProject
            }
        })
    });
</script>

<div class="w-full h-full flex flex-row">
    
    <!-- Left side navbar -->
    <div>
        <ConsoleNavbar {projects} {selectedProject} />
    </div>

    <!-- Content -->
    <div class="flex flex-col w-full">    
        <div class="flex flex-col grow px-8 py-6 w-full h-full">
            <slot />
        </div>
    </div>
</div>