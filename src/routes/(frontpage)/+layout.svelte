<script lang="ts">
    import HomeNavbar from '@/components/ui/home-navbar/home-navbar.svelte';

	export let loggedIn;
	console.log(loggedIn)
</script>

<!-- Navbar -->
<div id="home-navbar-top" class="w-full">
	<HomeNavbar {loggedIn}/>
</div>

<!-- Page content -->
<div>
	<slot />
</div>
