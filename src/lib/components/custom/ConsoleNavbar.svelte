<script lang="ts">
    import { page } from '$app/stores'
	import { CircleUser, MessageCircle, SettingsIcon, Anchor } from "lucide-svelte"
    import Button from '@/components/ui/button/button.svelte'
	import ProjectSwitcher from '@/components/custom/ProjectSwitcher.svelte';
            
    // For content    
    const navItems = [
        {
            sectionTitle: "Menu",
            sectionContent: [
                { title: "Dashboard", href: "" },
                { title: "Apps", href: "/apps" },
                { title: "Deployments", href: "/deployments" },
            ],    
        },    
        {
            sectionTitle: "Advanced - Resources",
            sectionContent: [
                { title: "Pods", href: "/pods" },
                { title: "Volumes", href: "/volumes" },
                { title: "Services", href: "/services" },
            ],    
        },    
        {
            sectionTitle: "Project",
            sectionContent: [
                { title: "Nodes", href: "/nodes" },
                { title: "Plan", href: "/plan" }
            ]    
        }    
    ]    

    let showModal: boolean = false
    
</script>


<div class="flex-col flex min-h-screen w-64 bg-zinc-900 border-r">
    
    <!-- Top bound -->
    
    <div class="flex-grow">
        
        <!-- Navbar header -->
        <div class="justify-between w-full">
            <div class="space-x-1 flex h-22 p-2 items-center">
                <div>
                  <Button class="w-10 h-10 p-2 bg-zinc-900 flex" variant="outline" href="/">
                    <Anchor />
                  </Button>
                </div>
                <div class="w-full h-10 flex">
                    <ProjectSwitcher />
                </div>
            </div>
        </div>
    
    <div class="border-b"/>
        <!-- Navbar content -->
        <div class="grow">
            <nav class="flex flex-col mt-1 space-y-2 p-5 border-zinc-900">
                {#each navItems as section}
                    <div class="m-1 px-2 py-1 h-7 text-left text-xs font-semibold text-zinc-300 bg-zinc-800 opacity-65 rounded-md">
                        {section.sectionTitle}
                    </div>
                    {#each section.sectionContent as button}
                        {#if ($page.url.pathname === "/console" + button.href)} 
                            <Button class="w-full justify-start opacity-75 h-8 bg-zinc-300" variant="default" href="/console{button.href}">{button.title}</Button>
                        {:else}
                            <Button class="w-full justify-start opacity-75 h-8" variant="ghost" href="/console{button.href}">{button.title}</Button>
                        {/if}
                    {/each}
                    <div id="separator">
                        <div class="pb-5"/>
                        <div class="border-b"/>
                        <div class="pb-5"/>
                    </div>
                {/each}  
            </nav> 
        </div>
    </div>

    <!-- Bottom bound -->

    <!-- Navbar footer -->
    <div class="h-14 p-1 border-t">
        <div class="flex justify-between w-full space-x-3 p-1">
            <div class="flex p-1">
                <Button class="h-8 w-8 rounded-full bg-zinc-900" variant="outline" href='/console/account'>
                    <CircleUser />
                </Button>
            </div>
            <div class="flex space-x-1">
                <Button class="h-9 w-9 p-2 bg-zinc-900" variant="outline"><SettingsIcon /></Button>
                <Button class="h-9 w-9 p-2 bg-zinc-900" variant="outline"><MessageCircle /></Button>
            </div>
        </div>
    </div>
</div>
