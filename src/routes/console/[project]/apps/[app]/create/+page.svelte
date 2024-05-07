<script lang="ts">
	import * as Form from "@/components/ui/form";
    import { Input } from "$lib/components/ui/input/index.js";

    import {
        minecraftSchema,
        type MinecraftSchema,  
    } from "$lib/schemas/appSchema";
    import {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { Button } from "@/components/ui/button";

    export let data: SuperValidated<Infer<MinecraftSchema>>

    const form = superForm( data, {
        validators: zodClient(minecraftSchema),
        dataType: "json"
    });

    const { form: formData, enhance } = form;

    // The following is a measure to avoid a bug
    let storage = ''
    let ram = ''
    let cpu = ''
    
    $: {
        $formData.storage = Number(storage)
        $formData.ram = Number(ram)
        $formData.cpu = Number(cpu)
    }

</script>

<div class="p-8">
    <div>
        <div>
            <h1 class="text-3xl font-bold">Install Minecraft</h1>
        </div>
    </div>
    <div class="mt-12 w-96 p-12 border rounded-lg">
        <form method="POST" use:enhance>
            <Form.Field {form} name="name">
                <Form.Control let:attrs>
                    <Form.Label for="name">Name</Form.Label>
                    <Input {...attrs} type="text" bind:value={$formData.name} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="storage">
                <Form.Control let:attrs>
                    <Form.Label for="storage">Storage Space (GiB)</Form.Label>
                    <Input {...attrs} type="number" bind:value={storage} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="ram">
                <Form.Control let:attrs>
                    <Form.Label for="ram">RAM (GiB)</Form.Label>
                    <Input {...attrs} type="number" bind:value={ram} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="cpu">
                <Form.Control let:attrs>
                    <Form.Label for="cpu">CPU (Cores)</Form.Label>
                    <Input {...attrs} type="number" bind:value={cpu} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Button type="submit">Install</Button>
        </form>
    </div>
    <div></div>
</div>