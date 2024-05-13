<script lang="ts">
    import * as Dialog from '@/components/ui/dialog/index'
    import { Button, buttonVariants } from '@/components/ui/button/index'
	import { Anchor } from 'lucide-svelte';

    export let data
    let { session, supabase, user } = data

    // Handle logout
    async function handleLogout() {
        let { error } = await supabase.auth.signOut()
    }

    // Menu items
    const menuItems: Map<string, string> = new Map([
        ['Home', '/'],
        ['Features', '/features'],
        ['About', '/about'],
        ['Docs', '/docs'],
        ['Contact', '/contact']        
    ])

</script>

<!-- Navbar -->
<div class="flex justify-between text-gray-300 p-1 items-center">

    <!-- Left side  -->
    <div class="flex items-center px-2">

        <!-- Small devices -->
        <div class="md:hidden flex">
            <Dialog.Root>
                
                <!-- Activation button -->
                <Dialog.Trigger class={buttonVariants({ variant: "outline"})}>
                    <Anchor class="h-6 w-6" />
                </Dialog.Trigger>
                
                <Dialog.Content>
                
                    <!-- Dialog header -->
                    <Dialog.Header>
                        <Dialog.Title class="text-left p-2 text-zinc-400">Menu</Dialog.Title>
                    </Dialog.Header>
                
                    <!-- Menu -->
                    <nav class="flex flex-col justify-center">
                        {#each Array.from(menuItems) as [key, value]}
                            <Button href={value} variant="ghost" class="h-10 w-full justify-start text-xl">{key}</Button>
                        {/each}
                    </nav>

                </Dialog.Content>

            </Dialog.Root>

        </div>

        <!-- Medium+ devices -->
        <div class="hidden md:flex">

            <!-- Menu -->
            <nav>
                {#each Array.from(menuItems) as [key, value]}
                    {#if value == '/'}
                        <Button href={value} variant="ghost">
                            <Anchor class="h-5 w-5 mr-4" />
                            <p class="front-bold">{key}</p>
                        </Button>
                    {:else}
                        <Button href={value} variant="ghost">{key}</Button>
                    {/if}
                {/each}
            </nav>

        </div>

    </div>


    <!-- Right side -->
    <div class="flex space-x-2">

        <!-- If user is signed in -->
        {#if session}
            <Button href="/console" variant="outline">console</Button>
            <Button on:click={handleLogout} variant="destructive">Logout</Button>
        {:else}
            <Button href="/login" variant="outline">Login</Button>
            <Button href="/signup" variant="outline">Signup</Button>
        {/if}
    </div>
</div>