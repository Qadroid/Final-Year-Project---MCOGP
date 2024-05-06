<script lang="ts">
	import '../app.pcss';

	import { FirebaseApp, userStore } from 'sveltefire'
	import { auth, firestore } from '@/firebase';

	import { onAuthStateChanged } from 'firebase/auth';

	let currentUser 

	onAuthStateChanged(auth, (user) => {
	if (user) {
		currentUser = user
		// User is signed in
		console.log('User is signed in');
	} else {
		currentUser = null
		// User is signed out
		console.log('User is signed out');
	}
	});

</script>

<FirebaseApp {auth} {firestore}>
	<div>
		<slot />
	</div>
</FirebaseApp>
