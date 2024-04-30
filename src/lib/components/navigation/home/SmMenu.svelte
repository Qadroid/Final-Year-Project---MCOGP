<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
</script>

<div class="flex r">
    <ul class="text-gray-300">
      <Button href="/" variant="ghost" class="h-10 r w-full justify-start text-xl">Home</Button>
      <Button href="/features" variant="ghost" class="h-10 r w-full justify-start text-xl">Features</Button>
      <Button href="/about" variant="ghost" class="h-10 r w-full justify-start text-xl">About</Button>
      <Button href="/docs" variant="ghost" class="h-10 r w-full justify-start text-xl">Docs</Button>
      <Button href="/contact" variant="ghost" class="h-10 r w-full justify-start text-xl">Contact</Button>
    </ul>
</div>