<script lang="ts">
	import '../app.pcss';
	import NavbarTop from '$lib/components/ui/navbar-top/+page.svelte';

	import { onMount } from 'svelte'
	import { supabase } from '$lib/supabase'
	import type { AuthSession } from '@supabase/supabase-js'

	let session: AuthSession
	onMount(() => {
		supabase.auth.getSession().then(({ data }) => {
		session = data.session
		})

		supabase.auth.onAuthStateChange((_event, _session) => {
		session = _session
		})
	})
</script>

<div id="web-navbar-top" class="w-full">
	<NavbarTop />
</div>
<div>
	<slot />
</div>
