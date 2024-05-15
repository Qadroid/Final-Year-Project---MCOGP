<script>
    import "../app.css"
	import { onMount } from 'svelte';
    import { user, fetchUser } from '@/stores/user';

    let currentUser = null;

    onMount(() => {
        fetchUser();
    });

    $: currentUser = $user;
</script>

<main class="w-screen h-screen">
    <slot />
</main>