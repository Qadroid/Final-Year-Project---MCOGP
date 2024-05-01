<script lang="ts">
	import '../app.pcss';
	import NavbarTop from '$lib/components/ui/navbar-top/+page.svelte';
</script>

<div id="web-navbar-top" class="w-full">
	<NavbarTop />
</div>
<div>
	<slot />
</div>
