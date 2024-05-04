<script lang="ts">
  import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
  import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { Anchor } from 'lucide-svelte';
</script>

<Dialog.Root>
  <Dialog.Trigger class="{buttonVariants({ variant: "outline" })} h-10 r" >
    <Anchor class="h-6 w-6" />
  </Dialog.Trigger>
  <Dialog.Content class="w-[200px] rounded-xl">
    <Dialog.Header>
      <Dialog.Title class="text-left p-2 text-zinc-400">Menu</Dialog.Title>
    </Dialog.Header>
    <nav class="flex-col justify-center">
      <Button href="/" variant="ghost" class="h-10 r w-full justify-start text-xl">Home</Button>
      <Button href="/features" variant="ghost" class="h-10 r w-full justify-start text-xl">Features</Button>
      <Button href="/about" variant="ghost" class="h-10 r w-full justify-start text-xl">About</Button>
      <Button href="/docs" variant="ghost" class="h-10 r w-full justify-start text-xl">Docs</Button>
      <Button href="/contact" variant="ghost" class="h-10 r w-full justify-start text-xl">Contact</Button>
    </nav>
  </Dialog.Content>
</Dialog.Root>