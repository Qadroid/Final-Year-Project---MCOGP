<script lang="ts">
	import { projects, selectedProject } from '@/stores/projects';
	import ConsoleNavbar from './ConsoleNavbar.svelte';
    import { onMount } from 'svelte';
    import { supabase } from '@/supabaseClient';

    onMount(async () => {
        const { data, error } = await supabase.from('projects').select('*');
        console.log(data);
        if (error) {
            console.error(error);
        } else {
            projects.set(data);
        }
    });
</script>

<div class="w-full h-full flex flex-row">
    
    <!-- Left side navbar -->
    <div>
        <ConsoleNavbar />
    </div>

    <!-- Content -->
    <div class="flex grow">
        <slot />
    </div>
</div>