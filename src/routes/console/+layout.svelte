<script lang="ts">
	import ConsoleNavbar from './ConsoleNavbar.svelte';

    export let data
</script>

<div class="w-full h-full flex flex-row">
    
    <!-- Left side navbar -->
    <div>
        <ConsoleNavbar { data }/>
    </div>

    <!-- Content -->
    <div class="flex grow">
        <slot />
    </div>
</div>