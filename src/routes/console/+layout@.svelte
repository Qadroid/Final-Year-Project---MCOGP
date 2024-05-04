<script lang="ts">
	import ConsoleNavbar from '@/components/ui/console-navbar/console-navbar.svelte';
</script>

<div class="flex flex-row w-screen h-screen">
    <!-- Navbar -->
    <div class="">
        <ConsoleNavbar />
    </div>

    <div class="flex-col flex-grow">
        <!-- Content -->
        <div class="p-6h-full">
            <slot />
        </div>
    </div>
</div>