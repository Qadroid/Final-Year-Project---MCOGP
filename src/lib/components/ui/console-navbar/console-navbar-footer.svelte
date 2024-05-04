<script lang=ts>
	import * as Avatar from "$lib/components/ui/avatar/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
	import { MessageCircle, SettingsIcon } from "lucide-svelte";
    import { DownloadURL, SignedIn } from "sveltefire";
</script>

<div class="flex justify-between w-full space-x-3 p-1">
    <div class="flex p-1">
        <Button class="h-8 w-8 rounded-full" href='/console/account'>
            <SignedIn let:user>
                <DownloadURL ref={`users/${user.uid}/avatar`} let:link>
                    <Avatar.Root class="w-8 h-8">
                        <Avatar.Image src={link} alt={user.displayName} />
                        <Avatar.Fallback>{user.displayName}</Avatar.Fallback>
                    </Avatar.Root>
                </DownloadURL>
            </SignedIn>
        </Button>
    </div>
    <div class="flex space-x-1">
        <Button class="h-9 w-9 p-1" variant="outline"><SettingsIcon /></Button>
        <Button class="h-9 w-9 p-1" variant="outline"><MessageCircle /></Button>
    </div>
</div>