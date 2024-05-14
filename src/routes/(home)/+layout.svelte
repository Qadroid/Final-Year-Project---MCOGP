<script lang="ts">
	import NavBarHome from './NavBarHome.svelte';

    export let data
</script>

<div class="w-screen h-screen">

    <!-- Top Navbar -->
    <div class="flex w-screen min-w-full h-12 fixed bg-zinc-950 border"> 
        <NavBarHome { data }/>
    </div>

    <!-- Content -->
    <div class="h-full grow">
        <slot />
    </div>
    
</div>