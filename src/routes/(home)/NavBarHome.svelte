<script lang="ts">
    import * as Dialog from '@/components/ui/dialog/index'
    import { Button, buttonVariants } from '@/components/ui/button/index'
	import { Anchor, LogOut, Terminal } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { currentUser, pb } from '@/pocketbase';

    async function handleSignOut() {
        try {
            pb.authStore.clear()
        } catch (error) {
            console.error(error);
        }
    }

    // Menu items
    const menuItems: Map<string, string> = new Map([
        ['Home', '/'],
        ['Features', '/features'],
        ['About', '/about'],
        ['Docs', '/docs'],
        ['Contact', '/contact']        
    ])

    // Check if component is mounted. 
    let isMounted = false;
    onMount(() => {
        isMounted = true;
    });
</script>

<!-- Navbar -->
<div class="flex justify-between w-full text-gray-300 items-center p-2 m-1 border rounded-xl backdrop-blur-2xl">

    <!-- Left side  -->
    <div class="flex items-center">

        <!-- Small devices -->
        <div class="md:hidden flex">
            {#if isMounted}ß
                <Dialog.Root>
                    
                    <!-- Activation button -->
                    <Dialog.Trigger class="{buttonVariants({ variant: "outline"})}">
                        <Anchor class="h-6 w-6" />
                    </Dialog.Trigger>
                    
                    <Dialog.Content class="w-[200px] rounded-xl">
                    
                        <Dialog.Header>
                        <Dialog.Title class="text-left text-zinc-400">Menu</Dialog.Title>
                        </Dialog.Header>
                    
                        <nav class="flex-col justify-center">
                            {#each Array.from(menuItems) as [key, value]}
                                <Button href={value} variant="ghost" class="h-10 w-full justify-start text-xl">{key}</Button>
                            {/each}
                        </nav>
                    
                    </Dialog.Content>  
                </Dialog.Root>
            {/if}
        </div>

        <!-- Medium+ devices -->
        <div class="hidden md:flex">

            <!-- Menu -->
            <nav class="items-center flex">
                {#each Array.from(menuItems) as [key, value]}
                    {#if value == '/'}
                        <Button href={value} variant="ghost" class="h-10 p-2 mx-2">
                            <Anchor class="h-6 w-6" />
                        </Button>
                    {:else}
                        <Button href={value} variant="ghost" class="h-10 mx-2">{key}</Button>
                    {/if}
                {/each}
            </nav>
        </div>
    </div>


    <!-- Right side -->
    <div class="flex space-x-2">

        <!-- If user is signed in -->
        {#if $currentUser}
            <Button href="/console" variant="outline" class="h-10">
                Console
                <Terminal class="h-5 w-5 ml-2" />
            </Button>
            <Button on:click={handleSignOut} variant="destructive" class="h-10">
                Logout
                <LogOut class="h-5 w-5 ml-2" />
            </Button>
        {:else}
            <Button href="/login" variant="outline" class="h-10">Login</Button>
            <Button href="/register" variant="outline" class="h-10">Register</Button>
        {/if}
    </div>
</div>