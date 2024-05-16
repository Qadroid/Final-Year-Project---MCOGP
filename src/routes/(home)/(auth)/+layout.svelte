<script lang="ts">
    import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { authState, pb } from "@/pocketbase";

    if ($authState) {
        goto('/console');
    }
</script>

<div class="w-full h-full flex flex-col justify-center items-center">
    <div class="w-[425px] border p-10 rounded-xl">
        <slot />
    </div>
</div>