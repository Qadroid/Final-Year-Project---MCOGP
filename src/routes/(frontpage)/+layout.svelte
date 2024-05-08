<script lang="ts">
    import HomeNavbar from '$lib/components/custom/home-navbar/home-navbar.svelte';
	export let data 

	let { session, supabase, user } = data
</script>

<div class="h-screen">

	<!-- Navbar -->
	<div id="home-navbar-top" class="z-10 w-screen h-12 fixed bg-zinc-950 border items-center">
		<HomeNavbar {session} {supabase} {user}/>
	</div>
	
	<!-- Page content -->
	<div class="h-full flex grow">
		<slot />
	</div>

</div>
