<script lang="ts">
    import HomeNavbar from '$lib/components/ui/home-navbar/home-navbar.svelte';
</script>

<div>
	<!-- Navbar -->
	<div id="home-navbar-top" class="w-full h-14">
		<HomeNavbar />
	</div>
	
	<!-- Page content -->
	<div class="h-[100vh-60px]">
		<slot />
	</div>
</div>
