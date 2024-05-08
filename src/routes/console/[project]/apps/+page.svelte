<script lang="ts">
	import { Button } from '$lib/components/ui/button';
    import minecraft from '$lib/assets/apps/minecraft.svg';
    import nginx from '$lib/assets/apps/nginx.png';
    import nextcloud from '$lib/assets/apps/nextcloud.png';


let apps = {
    "minecraft-bedrock": {
        "name": "Minecraft",
        "description": "Deploy a Minecraft server with a single click.",
        "icon": minecraft,
        "template": "template"
    },
    "nginx": {
        "name": "Nginx",
        "description": "Deploy a Nginx web server.",
        "icon": nginx,
        "template": "template"
    },
    "nextcloud": {
        "name": "Nextcloud",
        "description": "Deploy a private cloud storage solution.",
        "icon": nextcloud,
        "template": "template"
    }

}

</script>

<div class="px-8 pt-3 flex justify-between items-center">
    <h1 class="text-4xl font-bold">Apps</h1>
</div>
<div class="px-8 pt-3 flex">
    <p>Deploy applications from templates</p>
</div>

<div class="flex-col grid col-span-5 row-span-5 p-8 justify-start items-start">
    {#each Object.keys(apps) as app}
        <div class="flex flex-col items-center justify-center w-auto p-4">
            <div class="flex items-center justify-center w-24 h-24 p-4 m-2 bg-zinc-950 border rounded-lg">
                <img src={apps[app].icon} alt={apps[app].name} />
            </div>
            <h2 class="text-lg font-bold">{apps[app].name}</h2>
            <p class="text-sm p-2">{apps[app].description}</p>
            <Button variant="outline" href="/console/+/apps/{app}/create">
                Deploy
            </Button>
        </div>
    {/each}
</div>