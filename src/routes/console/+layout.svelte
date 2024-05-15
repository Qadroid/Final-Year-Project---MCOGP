<script lang="ts">
	import ConsoleNavbar from './ConsoleNavbar.svelte';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
	import { fetchUser, user } from '@/stores/user';
	import { getProjects, projects } from '@/stores/projects';

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
    <div class="flex grow px-8 py-6">
        <slot />
    </div>
</div>