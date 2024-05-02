<script lang="ts">
	import '../app.pcss';
	import { account } from '$lib/appwrite'

	$: session = account
</script>

<slot />
