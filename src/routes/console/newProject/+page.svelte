<script lang="ts">
    import * as Form from '@/components/ui/form/index';
	import Input from '@/components/ui/input/input.svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { projectSchema, type ProjectSchema } from './projectSchema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { pb } from '@/pocketbase';
    import yaml from 'js-yaml';
	import { FieldErrors } from 'formsnap';
	import { Textarea } from '@/components/ui/textarea';
	import Button from '@/components/ui/button/button.svelte';

    export let data: { projectForm: SuperValidated<Infer<ProjectSchema>>};
    
    const form = superForm( data.projectForm, {
        validators: zodClient(projectSchema)
    });

    const { form: formData } = form;

    async function convertStringToBase64(input: string) {
        const userKubeConfigYaml = yaml.dump(input);
        const userKubeConfigBase64 = Buffer.from(userKubeConfigYaml).toString('base64');
        return userKubeConfigBase64;
    }

    async function handleCreateProject() {
        const kubeConfig = await convertStringToBase64($formData.kubeConfig);

        if (!pb.authStore.model) {
            console.error('User not authenticated');
            return;
        }

        const data = {
            "name": $formData.name,
            "description": $formData.description,
            "kubeConfig": kubeConfig,
            "owner": pb.authStore.model.id
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
        <form on:submit={handleCreateProject}>
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
            <Form.Button type="submit">Create Project</Form.Button>
        </form>
    </div>
</div>