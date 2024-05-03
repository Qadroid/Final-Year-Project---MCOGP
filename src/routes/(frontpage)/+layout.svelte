<script lang="ts">
    import HomeNavbar from '@/components/ui/home-navbar/home-navbar.svelte';
</script>

<!-- Navbar -->
<div id="home-navbar-top" class="w-full">
	<HomeNavbar />
</div>

<!-- Page content -->
<div>
	<slot />
</div>
