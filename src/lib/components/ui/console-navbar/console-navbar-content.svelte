<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { page } from "$app/stores";
    
    const navItems = [
        {
            sectionTitle: "Menu",
            sectionContent: [
                { title: "Dashboard", href: "/console/dashboard" },
                { title: "Apps", href: "/console/apps" },
            ],
        },
        {
            sectionTitle: "Advanced - Resources",
            sectionContent: [
                { title: "Containers", href: "/console/containers" },
                { title: "Deployments", href: "/console/deployments" },
                { title: "Services", href: "/console/services" },
                { title: "Volumes", href: "/console/volumes" },
                { title: "Ingress", href: "/console/ingress" },
            ],
        },
        {
            sectionTitle: "Project",
            sectionContent: [
                { title: "Clusters", href: "/console/clusters" },
                { title: "Nodes", href: "/console/nodes" },
                { title: "Plan", href: "/console/plan" }
            ]
        }
    ]

    let variant = "ghost"

</script>
   

<nav class="flex flex-col mt-1 space-y-2 p-5 border-zinc-900">
    {#each navItems as section}
        <div class="m-1 px-2 py-1 h-7 text-left text-xs font-semibold text-zinc-300 bg-zinc-900 opacity-65 rounded-md">
            {section.sectionTitle}
        </div>
        {#each section.sectionContent as button}
            {#if ($page.url.pathname === button.href)} 
                <Button class="menu-button w-full justify-start opacity-75 h-8" variant="default" href="{button.href}">{button.title}</Button>
            {:else}
                <Button class="menu-button w-full justify-start opacity-75 h-8" variant="ghost" href="{button.href}">{button.title}</Button>
            {/if}
        {/each}
        <div id="separator">
            <div class="pb-5"/>
            <div class="border-b"/>
            <div class="pb-5"/>
        </div>
        
    {/each}  
</nav> 