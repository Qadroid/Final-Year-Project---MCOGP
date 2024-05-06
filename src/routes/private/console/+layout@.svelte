<script lang="ts">
    import ConsoleNavbar from '@/components/ui/console-navbar/console-navbar.svelte';
    import { SignedOut, SignedIn } from 'sveltefire';

</script>

<SignedOut>
    <div class="flex w-[90vh] h-[90vh] p-3 justify-center items-center text-center">
        <p>You must be signed in to access this page. Please sign in from the <a href='/auth/login' class="text-blue-300 hover:text-blue-500">login page</a></p>
    </div>    
</SignedOut>

<SignedIn>
    <div class="flex flex-row w-screen h-screen">
        <!-- Navbar -->
        <div class="">
            <ConsoleNavbar />
        </div>
    
        <div class="flex-col flex-grow">
            <!-- Content -->
            <div class="p-6 h-full">
                <slot />
            </div>
        </div>
    </div>
</SignedIn>