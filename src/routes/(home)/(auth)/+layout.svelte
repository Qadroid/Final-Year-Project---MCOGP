<script lang="ts">
    import { onMount } from "svelte";
    import { fetchUser, user } from "@/stores/user";
	import { goto } from "$app/navigation";

    onMount( async () => {
        await fetchUser();
        if ($user) {
            goto('/console');
        }
    });
</script>

<div class="w-full h-full flex flex-col justify-center items-center">
    <div class="w-[425px] border p-10 rounded-xl">
        <slot />
    </div>
</div>