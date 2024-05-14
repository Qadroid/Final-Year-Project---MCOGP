<script lang="ts">
    import { page } from '$app/stores'
	import { CircleUser, MessageCircle, SettingsIcon, Anchor, Plus } from "lucide-svelte"
    import Button from '@/components/ui/button/button.svelte'
    import { selectedProject, projects } from '@/stores/projects'
	import * as Select from '@/components/ui/select';
        
    // Ensure users cannot traverse the console without selecting a project
    let disabled = false;
    $: if (!selectedProject) {
        disabled = true
    }
    
    // For content    
    const navItems = [
        {
            sectionTitle: "Menu",
            sectionContent: [
                { title: "Dashboard", href: "dashboard" },
                { title: "Apps", href: "apps" },
                { title: "Deployments", href: "deployments" },
            ],    
        },    
        {
            sectionTitle: "Advanced - Resources",
            sectionContent: [
                { title: "Pods", href: "pods" },
                { title: "Volumes", href: "volumes" },
                { title: "Services", href: "services" },
            ],    
        },    
        {
            sectionTitle: "Project",
            sectionContent: [
                { title: "Nodes", href: "nodes" },
                { title: "Plan", href: "plan" }
            ]    
        }    
    ]    
    
</script>


<div class="flex-col flex h-screen w-64 bg-zinc-900 border-r">
    
    <!-- Top bound -->
    
    <div class="flex-grow">
        
        <!-- Navbar header -->
        <div class="justify-between w-full p-1">
            <div class="space-x-1 flex h-15 p-2 items-center">
                <div>
                  <Button class="w-9 h-9 p-2" variant="outline" href="/">
                    <Anchor />
                  </Button>
                </div>
                <div>
                    <Select.Root {disabled}>
                        <Select.Trigger class="w-[200px]">
                        <Select.Value placeholder="Select a project" />
                        </Select.Trigger>
                        <Select.Content>
                        <Select.Group>
                            <Select.Label class="text-zinc-400 rounded-md bg-zinc-900 text-center opacity-70 m-1">Projects</Select.Label>
                            
                            {#each $projects as project}
                                <Select.Item value={project.name} label="{project.name}" class="m-1 mt-2 w-[182px] font-semibold">
                                    {project.name}
                                </Select.Item>
                            {/each} 
                            
                        </Select.Group>
                            <div class="m-1 mt-2">
                                <Button class="w-full" variant="outline" href="/console/newProject">
                                    New Project
                                    <Plus class="w-5 h-5 mx-2"/>
                                </Button>
                            </div>
                        </Select.Content>
                        <Select.Input bind:value={$selectedProject} />
                    </Select.Root>
                </div>
            </div>
        </div>
    
        <div class="border-b"/>
        
        <!-- Navbar content -->
        <div class="grow">
            <nav class="flex flex-col mt-1 space-y-2 p-5 border-zinc-900">
                {#each navItems as section}
                    <div class="m-1 px-2 py-1 h-7 text-left text-xs font-semibold text-zinc-300 bg-zinc-900 opacity-65 rounded-md">
                        {section.sectionTitle}
                    </div>
                    {#each section.sectionContent as button}
                        {#if ($page.url.pathname === "/console/" + selectedProject + "/" + button.href)} 
                            <Button class="w-full justify-start opacity-75 h-8" variant="default" href="/console/{selectedProject}/{button.href} {disabled}">{button.title}</Button>
                        {:else}
                            <Button class="w-full justify-start opacity-75 h-8" variant="ghost" href="/console/{selectedProject}/{button.href} {disabled}">{button.title}</Button>
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
                <Button class="h-8 w-8 rounded-full" href='/console/account'>
                    <CircleUser />
                </Button>
            </div>
            <div class="flex space-x-1">
                <Button class="h-9 w-9 p-2" variant="outline"><SettingsIcon /></Button>
                <Button class="h-9 w-9 p-2" variant="outline"><MessageCircle /></Button>
            </div>
        </div>
    </div>
</div>