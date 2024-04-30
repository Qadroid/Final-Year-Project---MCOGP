<script lang="ts">
  import { Anchor, CircleUser, TerminalIcon } from 'lucide-svelte';
  import {
    Button,
    buttonVariants
  } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import SmMenu from '$lib/components/navigation/home/SmMenu.svelte';
	import MdMenu from './MdMenu.svelte';
</script>

<div class="h-14 flex justify-between text-gray-300 sticky">
  <!-- Left side of Navbar -->
  <div id="left-menu" class="flex items-center pl-2">

    <!-- Small devices -->
    <div class="md:hidden flex items-center">
      <Dialog.Root>
        <Dialog.Trigger class="{buttonVariants({ variant: "ghost" })} h-10 r" >
            <Anchor class="h-6 w-6" />
          </Dialog.Trigger>
        <Dialog.Content class="sm:max-w-screen-sm rounded-md">
          <Dialog.Header>
            <Dialog.Title class="text-left"></Dialog.Title>
          </Dialog.Header>
          <SmMenu />
          <Dialog.Footer>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </div>

    <!-- Medium devices -->
    <MdMenu />
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
  