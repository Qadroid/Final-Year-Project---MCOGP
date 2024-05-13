<script lang="ts">
    import * as Form from "$lib/components/ui/form/index.js";
    import { Textarea } from "$lib/components/ui/textarea/index.js";
    import * as RadioGroup from "$lib/components/ui/radio-group/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import {
      superForm,
    } from "sveltekit-superforms";
    import { projectSchema } from "./project-schema";
    import { zodClient } from "sveltekit-superforms/adapters";

    export let data
    const { projectForm } = data

    let kubeConfigType = "file";

    const form = superForm(projectForm, {
        validators: zodClient(projectSchema)
    })

    const { form: formData, enhance } = form


    $: kubeConfigType = $formData.kubeConfigType;
</script>

<div class="w-96">
    <form method="POST" use:enhance action="?/newProject">
        <div>
            <Form.Field {form} name="name">
                <Form.Control let:attrs>
                    <Form.Label for="name">Project Name</Form.Label>
                    <Input id="name" placeholder="Enter project name" />
                    <Form.FieldErrors />
                </Form.Control>
            </Form.Field>
        </div>
        <div>
            <Form.Field {form} name="description">
                <Form.Control let:attrs>
                    <Form.Label for="description">Project Description</Form.Label>
                    <Input id="description" placeholder="Enter project description" />
                    <Form.FieldErrors />
                </Form.Control>
            </Form.Field>
        </div>
        <div class="flex justify-center">
            <Form.Fieldset {form} name="kubeConfigType" class="">
                <Form.Legend>How would you like to provide your KubeConfig file?</Form.Legend>
                <RadioGroup.Root bind:value={$formData.kubeConfigType} class="">
                    <div>
                        <Form.Control let:attrs>
                            <RadioGroup.Item value="upload" {...attrs} />
                            <Form.Label class="font-normal">Upload KubeConfig as file</Form.Label>
                        </Form.Control>
                    </div>
                    <div>
                        <Form.Control let:attrs>
                            <RadioGroup.Item value="paste" {...attrs} />
                            <Form.Label class="font-normal">Paste KubeConfig</Form.Label>
                        </Form.Control>
                    </div>
                    <RadioGroup.Input name="KubeConfigType" />
                    <Form.FieldErrors />
                </RadioGroup.Root>
            </Form.Fieldset>
        </div>
        <div>
            {#if kubeConfigType === "upload"}
                <Form.Field {form} name="kubeConfigFile">
                    <Form.Control let:attrs>
                        <Form.Label for="kubeConfigFile">Kube Config File</Form.Label>
                        <Input id="kubeConfigFile" type="file" />
                        <Form.FieldErrors />
                    </Form.Control>
                </Form.Field>
            {:else if kubeConfigType === "paste"}
                <Form.Field {form} name="kubeConfigPaste">
                    <Form.Control let:attrs>
                        <Form.Label for="kubeConfigPaste">Paste Kube Config</Form.Label>
                        <Textarea id="kubeConfigPaste" placeholder="Paste kube config here" />
                        <Form.FieldErrors />
                    </Form.Control>
                </Form.Field>
            {/if}
        </div>
        <Form.Button>Submit</Form.Button>
    </form>
  </div>