<script lang="ts">
  import { Anchor, CircleUser, TerminalIcon } from 'lucide-svelte';
  import {
    Button,
    buttonVariants
  } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";


</script>

<div class="h-14 flex justify-between bg-gray-900 text-gray-300 sticky">
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
          <div class="flex r">
            <ul class="text-gray-300">
              <Button href="/" variant="ghost" class="h-10 r w-full justify-start text-xl">Home</Button>
              <Button href="/features" variant="ghost" class="h-10 r w-full justify-start text-xl">Features</Button>
              <Button href="/about" variant="ghost" class="h-10 r w-full justify-start text-xl">About</Button>
              <Button href="/docs" variant="ghost" class="h-10 r w-full justify-start text-xl">Docs</Button>
              <Button href="/contact" variant="ghost" class="h-10 r w-full justify-start text-xl">Contact</Button>
            </ul>
          </div>
          <Dialog.Footer>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </div>

    <!-- Medium devices -->
    <ul class="hidden md:flex space-x-3">
      <Button href="/" variant="ghost" class="h-10 r">
        <Anchor class="h-6 w-6 mr-5 ml-1 flex" />
        <h2 class="font-bold">MCOGP</h2>
      </Button>
      <Button href="/features" variant="ghost" class="h-10 r">Features</Button>
      <Button href="/about" variant="ghost" class="h-10 r">About</Button>
      <Button href="/docs" variant="ghost" class="h-10 r">Docs</Button>
      <Button href="/contact" variant="ghost" class="h-10 r">Contact</Button>
    </ul>
  </div>

  <!-- Right side of Navbar -->
  <div id="top-navbar-right" class="flex">
    <div class="flex items-center center pr-2">
      <Dialog.Root>
        <Dialog.Trigger class="{buttonVariants({ variant: "outline" })} h-10 r" >
            Login
            <CircleUser class="h-6 w-6 ml-4" />
          </Dialog.Trigger>
        <Dialog.Content class="sm:max-w-[425px]">
          <Dialog.Header>
            <Dialog.Title>Login</Dialog.Title>
            <Dialog.Description>
                Login with a magic link
            </Dialog.Description>
          </Dialog.Header>

          <!-- Auth/Account dialog content -->

          <Dialog.Footer>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
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
  