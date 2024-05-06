<script lang=ts>
	import * as Avatar from "$lib/components/ui/avatar/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
	import { CircleUser, MessageCircle, SettingsIcon } from "lucide-svelte";
</script>

<div class="flex justify-between w-full space-x-3 p-1">
    <div class="flex p-1">
        <Button class="h-8 w-8 rounded-full" href='/console/account'>
            <Avatar.Root class="w-8 h-8">
                <!-- {#if link == null} -->
                    <CircleUser class="h-5 w-5" />
                <!-- {:else} -->
                    <!-- <Avatar.Image src={} alt={user.displayName} /> -->
                <!-- {/if} -->
                <!-- <Avatar.Fallback>{}</Avatar.Fallback> -->
            </Avatar.Root>
        </Button>
    </div>
    <div class="flex space-x-1">
        <Button class="h-9 w-9 p-2" variant="outline"><SettingsIcon /></Button>
        <Button class="h-9 w-9 p-2" variant="outline"><MessageCircle /></Button>
    </div>
</div>