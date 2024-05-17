<script lang="ts">
	import NavBarHome from '@/components/custom/NavBarHome.svelte';
</script>

<div class="w-screen h-screen">

    <!-- Top Navbar -->
    <div class="flex w-screen min-w-full h-16 fixed"> 
        <NavBarHome />
    </div>

    <!-- Content -->
    <div class="h-full grow">
        <slot />
    </div>
    
</div>