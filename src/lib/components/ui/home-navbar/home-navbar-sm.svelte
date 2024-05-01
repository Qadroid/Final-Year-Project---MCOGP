<script lang="ts">
  import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
  import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { Anchor } from 'lucide-svelte';
</script>

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