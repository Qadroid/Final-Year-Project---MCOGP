<script lang=ts>
	import * as Avatar from "$lib/components/ui/avatar/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
	import { MessageCircle, SettingsIcon } from "lucide-svelte";
</script>

<div class="flex flex-row items-center w-full">
    <div class="basis-2/12">
        <Avatar.Root class="w-8 h-8">
            <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
            <Avatar.Fallback>CN</Avatar.Fallback>                
        </Avatar.Root>
    </div>
    <div class="basis-5/12"></div>
    <div class="basis-5/12">
        <Button class="h-10 w-10 p-2" variant="outline"><SettingsIcon /></Button>
        <Button class="h-10 w-10 p-2" variant="outline"><MessageCircle /></Button>
    </div>
</div>