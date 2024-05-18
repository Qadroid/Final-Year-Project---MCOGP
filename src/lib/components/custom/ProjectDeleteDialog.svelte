<script lang="ts">
    import * as Dialog from '@/components/ui/dialog'
    import { pb, currentUser } from '@/pocketbase';
	import Button from '@/components//ui/button/button.svelte';
	import { TriangleAlert } from 'lucide-svelte';
	import { redirect } from '@sveltejs/kit';

    export let selectedProjectId: string
    export let disabled: boolean = false
    
    async function handleDelete() {
        await pb.collection('projects').delete(selectedProjectId)
        if (selectedProjectId === $currentUser?.selectedProject) {
            await pb.collection('users').update($currentUser?.id, { selectedProject: null })
        }
        redirect(303, '/console')
    }
</script>

<Dialog.Root>
    <Dialog.Trigger> 
        <Button variant="destructive">Delete Project</Button>
    </Dialog.Trigger>
    <Dialog.Content>
        <div>
            <p class="text-md font-semibold">Are you sure you'd like to delete this project?</p>
            <div>
                <p>Project ID:</p>
                <p>{selectedProjectId}</p>
            </div>
            <div class="m-2">
                <div class="flex flex-row items-center rounded-md">
                    <TriangleAlert class="" stroke="white"/>
                    <p class="text-sm p-2">This cannot be undone</p>
                </div>
            </div>
        </div>
        <div>
            <Dialog.Close>
                <Button variant="outline">Cancel</Button>
                <Button on:click={deleteProject} variant="destructive">Delete</Button>
            </Dialog.Close>
        </div>
    </Dialog.Content>
</Dialog.Root>

