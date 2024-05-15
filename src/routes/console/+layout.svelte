<script lang="ts">
	import ConsoleNavbar from './ConsoleNavbar.svelte';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
	import { fetchUser, user } from '@/stores/user';
	import { getProjects, projects, selectedProject } from '@/stores/projects';
	import Button from '@/components/ui/button/button.svelte';

    let currentUser = null;

    onMount( async () => {
        await fetchUser();
        if (!$user) {
            goto('/login');
        } else {
            currentUser = $user;
        }

        await getProjects();
        if (!$projects) {
            console.log('No projects found');
        } 
    });
</script>

<div class="w-full h-full flex flex-row">
    
    <!-- Left side navbar -->
    <div>
        <ConsoleNavbar />
    </div>

    <!-- Content -->
    <div class="flex flex-col w-full">
        <!-- Placeholder project display -->
        <div class="flex p-2 bg-zinc-900 opacity-70 items-center">
            <p class="font-semibold px-2 text-lg">Project:</p> <p class="border py-1 px-2 rounded-md bg-zinc-950">{$selectedProject?.name}</p>
        </div>
    
        <div class="flex flex-col grow px-8 py-6 w-full h-full">
            {#if !selectedProject}
                <div class="w-full h-full flex-col">
                    <p class="flex text-3xl font-bold">No project selected!</p>
                    <p class="flex text-xl font-semibold">Select a project from the menu or</p>
                    <Button class="" href="/console/newProject">create a new project</Button>
                </div>
            {:else}
                <slot />
             {/if}
        </div>
    </div>
</div>