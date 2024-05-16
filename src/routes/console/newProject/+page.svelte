<script lang="ts">
    import * as Form from '@/components/ui/form/index';
	import Input from '@/components/ui/input/input.svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { projectSchema, type ProjectSchema } from './projectSchema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Textarea } from '@/components/ui/textarea';
	import { currentUser, pb } from '@/pocketbase';
    import { Button } from '@/components/ui/button/';
    import { encode } from 'js-base64';

    function yamlToBase64(yamlString: string): string {
      return encode(yamlString);
    }

    export let data: { projectForm: SuperValidated<Infer<ProjectSchema>>};
    
    const form = superForm( data.projectForm, {
        validators: zodClient(projectSchema)
    });

    const { form: formData, enhance } = form;

    async function handleCreateProject() {
        const kubeConfig = await yamlToBase64($formData.kubeConfig);

        if (!$currentUser) return console.error('User not found')

        const data = {
            "name": $formData.name,
            "description": $formData.description,
            "kubeConfig": kubeConfig,
            "owner": $currentUser.id
        }

        try {
            await pb.collection('projects').create(data)
        } catch (error) {
            console.error(error)
        }
    }
</script>

<div class="w-full h-full items-center justify-center flex flex-col">
    <div class="p-8">
        <p class="text-2xl font-bold p-2">Create Project</p>
        <p class="text-lg font-semibold p-2">Add a project to manage resources on your cluster</p>
    </div>
    <div class="space-y-1 w-[400px]">
        <form>
            <Form.Field {form} name="name">
                <Form.Control let:attrs>
                    <Form.Label for="name">Project Name</Form.Label>
                    <Input {...attrs} type="text" bind:value={$formData.name} />
                    <Form.Description>A memorable name for your project</Form.Description>
                    <Form.FieldErrors />
                </Form.Control>
            </Form.Field>
            <Form.Field {form} name="description">
                <Form.Control let:attrs>
                    <Form.Label for="description">Project Description</Form.Label>
                    <Input {...attrs} type="text" bind:value={$formData.description} />
                    <Form.Description>A brief description of your project</Form.Description>
                    <Form.FieldErrors />
                </Form.Control>
            </Form.Field>
            <Form.Field {form} name="kubeConfig">
                <Form.Control let:attrs>
                    <Form.Label for="kubeConfig">KubeConfig YAML</Form.Label>
                    <Textarea
                        {...attrs}
                        class="resize-none"
                        bind:value={$formData.kubeConfig}
                    />                    
                    <Form.Description>Insert your clusters KubeConfig file in YAML form</Form.Description>
                    <Form.FieldErrors />
                </Form.Control>
            </Form.Field>
            <Form.Field {form} name="owner">
                <Form.Control>
                    {#if $currentUser}
                        <Input type="hidden" value={$formData.owner = $currentUser.id} readonly />
                    {/if}
                </Form.Control>
            </Form.Field>
            <Button on:click={handleCreateProject}>Create Project</Button>
        </form>
    </div>
</div>