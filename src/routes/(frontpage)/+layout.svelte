<script lang="ts">
    import HomeNavbar from '$lib/components/ui/home-navbar/home-navbar.svelte';
</script>

<div class="h-screen">
	<!-- Navbar -->
	<div id="home-navbar-top" class="w-screen h-14">
		<HomeNavbar />
	</div>
	
	<!-- Page content -->
	<div class="h-full">
		<slot />
	</div>
</div>
