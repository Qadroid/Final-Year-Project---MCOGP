<script lang="ts">
    import ConsoleNavbar from '@/components/custom/console-navbar/console-navbar.svelte'
    export let data

    const { projects } = data
</script>

<div class="flex flex-row">
    <!-- Navbar -->
    <div>
        <ConsoleNavbar { projects }/>
    </div>

    <div class="flex-col grow">
        <!-- Content -->
        <div class="p-6">
            <slot />
        </div>
    </div>
</div>
