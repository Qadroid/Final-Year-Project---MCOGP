<script lang="ts">
	import '../app.pcss';

	import { FirebaseApp } from 'sveltefire'
	import { initializeApp } from 'firebase/app';
	import { getFirestore } from 'firebase/firestore';
	import { getAnalytics } from "firebase/analytics";
	import { getAuth } from 'firebase/auth';

	const firebaseConfig = {
		apiKey: "AIzaSyCX_uHOPuTIVQeJSKT_muCCIk_1Q6OAY5w",
		authDomain: "mcogp-7981a.firebaseapp.com",
		databaseURL: "https://mcogp-7981a-default-rtdb.europe-west1.firebasedatabase.app",
		projectId: "mcogp-7981a",
		storageBucket: "mcogp-7981a.appspot.com",
		messagingSenderId: "405417407317",
		appId: "1:405417407317:web:a0f1a9c5135f1b2134b5dc",
		measurementId: "G-67DHT2S45V"
	};

	const app = initializeApp(firebaseConfig);
	const analytics = getAnalytics(app);
	const firestore = getFirestore(app);
	const auth = getAuth(app);

</script>

<FirebaseApp {auth} {firestore} {analytics}>
	<slot />
</FirebaseApp>
