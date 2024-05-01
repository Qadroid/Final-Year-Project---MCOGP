<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { Anchor } from "lucide-svelte";
</script>

<ul class="flex space-x-3">
    <Button href="/" variant="ghost" class="h-10 r">
      <Anchor class="mr-5 ml-1 flex" />
      <p class="font-bold">MCOGP</p>
    </Button>
    <Button href="/features" variant="ghost" class="h-10 r">Features</Button>
    <Button href="/about" variant="ghost" class="h-10 r">About</Button>
    <Button href="/docs" variant="ghost" class="h-10 r">Docs</Button>
    <Button href="/contact" variant="ghost" class="h-10 r">Contact</Button>
  </ul>