<script lang="ts">
	import { authState, pb } from "@/pocketbase";
	import { redirect } from "@sveltejs/kit";

    if ($authState) {
        redirect(301, '/console');
    }
</script>

<div class="w-full h-full flex flex-col justify-center items-center">
    <div class="w-[425px] border p-10 rounded-xl">
        <slot />
    </div>
</div>