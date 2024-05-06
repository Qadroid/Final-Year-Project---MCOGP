<script lang="ts">
	import '../app.pcss';

	import { FirebaseApp } from 'sveltefire'
	import { auth, firestore } from '$lib/firebase'
</script>

<FirebaseApp {auth} {firestore}>
	<div>
		<slot />
	</div>
</FirebaseApp>
