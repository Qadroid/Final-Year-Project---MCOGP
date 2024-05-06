<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { page } from "$app/stores";
    
    const navItems = [
        {
            sectionTitle: "Menu",
            sectionContent: [
                { title: "Dashboard", href: "dashboard" },
                { title: "Apps", href: "apps" },
            ],
        },
        {
            sectionTitle: "Advanced - Resources",
            sectionContent: [
                { title: "Containers", href: "containers" },
                { title: "Deployments", href: "deployments" },
                { title: "Services", href: "services" },
                { title: "Volumes", href: "volumes" },
                { title: "Ingress", href: "ingress" },
            ],
        },
        {
            sectionTitle: "Project",
            sectionContent: [
                { title: "Clusters", href: "clusters" },
                { title: "Nodes", href: "nodes" },
                { title: "Plan", href: "plan" }
            ]
        }
    ]

    let variant = "ghost"
    let project = "default"

</script>
   

<nav class="flex flex-col mt-1 space-y-2 p-5 border-zinc-900">
    {#each navItems as section}
        <div class="m-1 px-2 py-1 h-7 text-left text-xs font-semibold text-zinc-300 bg-zinc-900 opacity-65 rounded-md">
            {section.sectionTitle}
        </div>
        {#each section.sectionContent as button}
            {#if ($page.url.pathname === "/console/" + project + "/" + button.href)} 
                <Button class="menu-button w-full justify-start opacity-75 h-8" variant="default" href="/console/{project}/{button.href}">{button.title}</Button>
            {:else}
                <Button class="menu-button w-full justify-start opacity-75 h-8" variant="ghost" href="/console/{project}/{button.href}">{button.title}</Button>
            {/if}
        {/each}
        <div id="separator">
            <div class="pb-5"/>
            <div class="border-b"/>
            <div class="pb-5"/>
        </div>
        
    {/each}  
</nav> 