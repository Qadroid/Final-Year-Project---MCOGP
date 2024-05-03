<script lang="ts">
	import ConsoleNavbar from '@/components/ui/console-navbar/console-navbar.svelte';
	import ConsoleTopbar from '@/components/ui/console-topbar/console-topbar.svelte';
</script>

<div class="flex flex-row w-screen h-screen">
    <!-- Navbar -->
    <div class="">
        <ConsoleNavbar />
    </div>

    <div class="flex flex-col flex-grow min-w-[1024px]">
        <!-- Top bar -->
        <div class=" h-12 top-0 border-b">
            <ConsoleTopbar />
        </div>

        <!-- Content -->
        <div class="p-12">
            <slot />
        </div>
    </div>
</div>