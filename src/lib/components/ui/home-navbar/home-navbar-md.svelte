<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { Anchor } from "lucide-svelte";
</script>

<nav class="flex space-x-2">
  <Button href="/" variant="ghost" class="h-10">
    <Anchor class="h-5 w-5 mr-5" />
    <p class="font-bold">MCOGP</p>
  </Button>
  <Button href="/features" variant="ghost" class="h-10">Features</Button>
  <Button href="/about" variant="ghost" class="h-10">About</Button>
  <Button href="/docs" variant="ghost" class="h-10">Docs</Button>
  <Button href="/contact" variant="ghost" class="h-10">Contact</Button>
</nav>
