<script lang="ts">
    import ConsoleNav from "$lib/components/navigation/consoleNav.svelte"

    let currentProject = "Project 1"
</script>

<div class="flex">
    <!-- Sidebar -->
    <div class=" w-72 bg-gray-950 h-full pr-12">
        <ConsoleNav />
    </div>

    <!-- Content -->
    <div>
        <slot />
    </div>
</div>