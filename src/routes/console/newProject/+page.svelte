<script lang="ts">
    import * as Form from '@/components/ui/form/index';
	import Input from '@/components/ui/input/input.svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { projectSchema, type ProjectSchema } from './projectSchema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Field } from 'formsnap';

    export let data: { projectForm: SuperValidated<Infer<ProjectSchema>>};
    
    const form = superForm( data.projectForm, {
        validators: zodClient(projectSchema)
    });

    const { form: formData, enhance } = form;
</script>

<div class="w-full h-full items-center justify-center flex flex-col">
    <div class="space-y-1">
        <form method="POST" use:enhance>
            <Form.Field {form} name="name">
                <Form.Label>Project Name</Form.Label>
                <Input type="text" placeholder="Project Name" />
                <Form.Description>A memorable name for your project</Form.Description>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="description">
                <Form.Label>Project Description</Form.Label>
                <Input type="text" placeholder="Project Description" />
                <Form.Description>A brief description of your project</Form.Description>
                <Form.FieldErrors />
            </Form.Field>
        </form>
    </div>
</div>