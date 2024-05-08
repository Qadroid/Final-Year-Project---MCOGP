<script>
	import Button from "@/components/ui/button/button.svelte";

</script>
<div class="flex-col self-center p-3 text-center h-screen">
    <div>
        <h1 class="font-bold text-red-500 text-3xl p-3">ERROR: 404</h1>
        <p>Page does not exist</p>
    </div>
    <div>
        <Button href="/" variant="secondary" class="mt-3">Go back to home</Button>
    </div>
</div>