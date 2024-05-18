<script lang="ts">
	import * as Dialog from "@/components/ui/dialog";
	import { Button, buttonVariants } from "@/components/ui/button";
    import { pb } from "@/pocketbase";
	import { onDestroy, onMount } from "svelte";
	import { Plus } from "lucide-svelte";
    import { currentUser } from "@/pocketbase";
	import ProjectDeleteDialog from "./ProjectDeleteDialog.svelte";
    import { pb, currentUser } from "@/pocketbase";
    import { projects, selectedProject } from "@/stores/projects";

    async function selectProject(projectId: string) {
        try {
            await pb.collection('users').update($currentUser?.id, { selectedProject: projectId })
            selectedProject.set($projects.find((project) => project.id === projectId) || null)
            // goto('/console/'+ selectedProject?.id)
        } catch (error) {
            console.error(error)
        }
    }
</script>

<Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: "outline" }) + " p-1 bg-zinc-900 flex flex-col w-full"}>
        <p class="text-xs text-zinc-500">Project:</p>
        <p class="text-sm text-zinc-400">{selectedProject ? selectedProject.name : 'Select a project'}</p>
    </Dialog.Trigger>

    <Dialog.Content class="h-[450px] backdrop-blur-lg flex flex-row bg-transparent w-full">

        <div class="flex flex-col basis-6/12">
            <div>
                <p class="text-left pb-3 pl-3 text-zinc-400 text-lg font-bold">Projects</p>
            </div>
            <div class="p-2 rounded-md h-full border overflow-auto space-y-2">
                {#if !projects}
                    <div class="flex flex-col items-center justify-center w-full h-full">
                        <p class="text-center text-sm text-zinc-500">No projects found</p>
                    </div>
                {:else}
                    {#each $projects as project (project.id)}
                        <Button
                            on:click={() => selectProject(project.id)}
                            class={`w-full p-2 text-left ${project.id === $selectedProject?.id ? 'bg-zinc-800 border-2 border-zinc-300' : ''}`}
                            variant="outline"
                        >
                            {project.name}
                        </Button>
                    {/each}
                {/if}
            </div>
            <div>
                <Dialog.Close class="w-full">
                    <Button href="/console/newProject" data-melt-dialog-close data-dialog-close class="w-full p-1 border border-zinc-500 mt-2" variant="outline">
                        New Project
                        <Plus class="w-6 h-6 mx-1 border m-2 rounded-md"/>
                    </Button>
                </Dialog.Close>
            </div>
        </div>
        
        <div class="flex border h-full rounded-xl opacity-50"/>
        
        <div class="flex flex-col basis-6/12 p-1">
            {#if selectedProject}
                <div class="flex flex-col grow pt-7">
                    <div>
                        <p class="text-left text-sm text-zinc-600">Name</p>
                        <div class="rounded-sm p-2 border my-2 text-xs">{selectedProject.name}</div>
                    </div>
                    <div>
                        <p class="text-left text-sm text-zinc-600">Description</p>
                        <div class="rounded-sm p-2 border my-2 text-xs max-h-22 overflow-auto">{selectedProject.description}</div>
                    </div>
                    <div>
                        <p class="text-left text-sm text-zinc-600">Creation Date</p>
                        <div class="rounded-sm p-2 border my-2 text-xs">{($selectedProject?.created && new Date($selectedProject?.created).toLocaleDateString()) || ''}</div>
                    </div>
                    <div>
                        <p class="text-left text-sm text-zinc-600">Project ID</p>
                        <div class="rounded-sm p-2 border my-2 text-xs">{$selectedProject?.id}</div>
                    </div>
                </div>
                <div class="flex flex-row space-x-2">
                    <div class="flex grow"/>
                    <ProjectDeleteDialog disabled={!$selectedProject?.id} selectedProjectId={''} />
                    <Dialog.Close>
                        <Button variant="outline">Continue</Button>
                    </Dialog.Close>
                </div>
            {/if}
        </div>
    </Dialog.Content>
</Dialog.Root>
