<script lang="ts">
  import { CircleUser, LogOut, TerminalIcon } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button/index.js";
	import HomeNavbarSm from '@/components/ui/home-navbar/home-navbar-sm.svelte';
	import HomeNavbarMd from '@/components/ui/home-navbar/home-navbar-md.svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
</script>

<div class="flex justify-between text-gray-300 sticky p-2">
  <!-- Left side of Navbar -->
  <div id="left-menu" class="flex items-center pl-2">

    <!-- Small devices -->
    <div class="md:hidden flex">
      <HomeNavbarSm />
    </div>

    <!-- Medium devices -->
    <div class="hidden md:flex">
      <HomeNavbarMd />
    </div>
  </div>

  <!-- Right side of Navbar -->
  <div id="top-navbar-right" class="flex space-x-2 ">
  
    <!-- If user is signed in -->

      <!-- <Button on:click={signOut} variant="destructive">
        <LogOut class="h-5 w-5" />
      </Button> -->
      
      <!-- <Button href="/account" variant="outline" class="flex">
        {#if user.displayName == null}
          Account
        {:else}
          {user.displayName}
        {/if}
          <Avatar.Root class="h-6 w-6 ml-4 items-center"> 
            {#if user.photoURL == null}
                <CircleUser class="h-5 w-5" />
            {:else}
                <Avatar.Image src={link} alt={user.displayName} />
            {/if}
          </Avatar.Root>
      </Button> -->

    <!-- If user is not signed in -->
      
    <Button href="/auth" variant="outline" class="flex">
      Login
      <CircleUser class="h-5 w-5 ml-3" />
    </Button>
      

    <Button href="/console" variant="outline" class="flex">
      Console
      <TerminalIcon class="h-5 w-5 ml-3" />
    </Button>

  </div>
</div>
  
<slot />
  