<script lang="ts">
    import ConsoleNavbar from '@/components/custom/console-navbar/console-navbar.svelte'

    export let data

</script>

<div class="flex flex-row">
    <!-- Navbar -->
    <div>
        <ConsoleNavbar { data } />
    </div>

    <div class="flex-col grow items-center justify-center">
        <!-- Content -->
        <div class="p-6">
            <slot />
        </div>
    </div>
</div>
