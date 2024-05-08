<script lang="ts">
  import { CircleUser, LogOut, TerminalIcon, Anchor } from 'lucide-svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
  import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
  import * as Dialog from "$lib/components/ui/dialog/index.js";
	import type { SupabaseClient } from '@supabase/supabase-js';

  export let session, supabase: SupabaseClient, user 

  async function handleLogout() {
    try {
      let { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log('Logged out');
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const menuItems: Map<string, string> = new Map([
    ['Home', '/'],
    ['Features', '/features'],
    ['About', '/about'],
    ['Docs', '/docs'],
    ['Contact', '/contact']
  ]);

</script>

<div class="flex justify-between text-gray-300 p-1">
  <!-- Left side of Navbar -->
  <div id="left-menu" class="flex items-center px-2">

    <!-- Small devices -->
    <div class="md:hidden flex">
      <Dialog.Root>
        <Dialog.Trigger class="{buttonVariants({ variant: "outline" })} h-10" >
          <Anchor class="h-6 w-6" />
        </Dialog.Trigger>
        <Dialog.Content class="w-[200px] rounded-xl">
          <Dialog.Header>
            <Dialog.Title class="text-left p-2 text-zinc-400">Menu</Dialog.Title>
          </Dialog.Header>
          <nav class="flex-col justify-center">
            {#each Array.from(menuItems) as [key, value]}
              <Button href={value} variant="ghost" class="h-10 r w-full justify-start text-xl">{key}</Button>
            {/each}
          </nav>
        </Dialog.Content>
      </Dialog.Root>
    </div>

    <!-- Medium devices -->
    <div class="hidden md:flex">
      <nav class="flex space-x-1">
        {#each Array.from(menuItems) as [key, value]}
          {#if value == '/'}
            <Button href={value} variant="ghost">
              <Anchor class="h-5 w-5 mr-4" />
              <p class="font-bold">{key}</p>
            </Button>
          {:else}
            <Button href={value} variant="ghost">{key}</Button>
          {/if}
        {/each}
      </nav>
    </div>
  </div>

  <!-- Right side of Navbar -->
  <div id="top-navbar-right" class="flex space-x-2 ">
  
    {#if (session)} 
    <!-- If user is signed in -->
      <Button on:click={handleLogout} variant="destructive">
        <LogOut class="h-5 w-5" />
      </Button>
      
      <Button href="/account" variant="outline" class="flex">
        {#if user.displayName == null}
          Account
        {:else}
          {user.displayName}
        {/if}
          <Avatar.Root class="h-6 w-6 ml-4 items-center"> 
            {#if user.photoURL == null}
                <CircleUser class="h-5 w-5" />
            {:else}
                <!-- <Avatar.Image src={link} alt={user.displayName} /> -->
            {/if}
          </Avatar.Root>
      </Button>

    {:else}

      <!-- If user is not signed in -->    
      <Button href="/auth" variant="outline" class="flex">
        Login
        <CircleUser class="h-5 w-5 ml-3" />
      </Button>
        
    {/if}

    <Button href="/console" variant="outline" class="flex">
      Console
      <TerminalIcon class="h-5 w-5 ml-3" />
    </Button>

  </div>
</div>
  