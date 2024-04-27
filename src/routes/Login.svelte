<script lang="ts">
    import { supabase } from '../lib/supabase';
    let email = '';
    let password = '';

    async function login() {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) console.error('Error logging in:', error.message);
        else console.log('Login successful!');
    }
</script>

<div class="p-4 max-w-md mx-auto">
    <input type="email" bind:value={email} placeholder="Email" class="input input-bordered w-full max-w-xs" />
    <input type="password" bind:value={password} placeholder="Password" class="input input-bordered w-full max-w-xs" />
    <button on:click={login} class="btn btn-primary mt-2">Login</button>
</div>
