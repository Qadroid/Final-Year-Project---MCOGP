<script lang="ts">
    import * as Dialog from '@/components/ui/dialog'
    import { pb, currentUser } from '@/pocketbase';
	import Button from '@/components//ui/button/button.svelte';
	import { TriangleAlert } from 'lucide-svelte';
    import { selectedProject } from '@/stores/projects'

    export let disabled: boolean = false
    $: selectedProjectId = $selectedProject?.id

    async function handleDelete() {
        if (!selectedProjectId) {
            return console.error('No project selected')
        }
        await pb.collection('projects').delete(selectedProjectId)
        if (selectedProjectId === $currentUser?.selectedProject) {
            await pb.collection('users').update($currentUser?.id, { selectedProject: null })
        }
    }
</script>

<Dialog.Root>
    <Dialog.Trigger {disabled}> 
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
                <Button on:click={handleDelete} variant="destructive">Delete</Button>
            </Dialog.Close>
        </div>
    </Dialog.Content>
</Dialog.Root>

