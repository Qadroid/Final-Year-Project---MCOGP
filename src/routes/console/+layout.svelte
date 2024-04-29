<script lang="ts">
    import SidebarConsole from "$lib/components/SidebarConsole.svelte"

</script>

<div class="flex">
    <!-- Sidebar -->
    <div class=" w-72 bg-gray-950 h-full pr-12">
        <SidebarConsole />
    </div>

    <!-- Content -->
    <div>
        <slot />
    </div>
</div>