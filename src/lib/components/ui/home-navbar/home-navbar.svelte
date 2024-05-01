<script lang="ts">
  import { CircleUser, TerminalIcon } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button/index.js";
	import HomeNavbarSm from '@/components/ui/home-navbar/home-navbar-sm.svelte';
	import HomeNavbarMd from '@/components/ui/home-navbar/home-navbar-md.svelte';
</script>

<div class="h-14 flex justify-between text-gray-300 sticky">
  <!-- Left side of Navbar -->
  <div id="left-menu" class="flex items-center pl-2">

    <!-- Small devices -->
    <div class="md:hidden flex items-center">
      <HomeNavbarSm />
    </div>

    <!-- Medium devices -->
    <div class="hidden md:flex">
      <HomeNavbarMd />
    </div>
  </div>

  <!-- Right side of Navbar -->
  <div id="top-navbar-right" class="flex">
    <div class="flex items-center pr-2">
      <Button href="/auth" variant="outline" class="flex">
        Login
        <CircleUser class="h-6 w-6 ml-4" />
      </Button>
    </div>
    <div class="flex items-center pr-2">
      <Button href="/console" variant="outline" class="flex">
        Console
        <TerminalIcon class="h-4 w-4 ml-3" />
      </Button>
    </div>
  </div>
</div>
  
<slot />
  