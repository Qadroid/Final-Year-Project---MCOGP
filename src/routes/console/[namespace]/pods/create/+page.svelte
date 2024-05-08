<script>
	import * as Form from "@/components/ui/form/index";

</script>
<div class="flex h-full w-full justify-center items-center">
    <div class="flex">
        <form use:enhance method="POST">
            <div class="space-y-1">
                <Form.Field {form} name="name">
                    <Form.Control let:attrs>
                        <Form.Label for="name">Name</Form.Label>
                        <Input {...attrs} type="name" bind:value={$formData.name}/>
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>
            </div>
            <div class="space-y-1 pb-5">
                <Form.Field {form} name="password">
                    <Form.Control let:attrs>
                        <Form.Label for="password">Password</Form.Label>
                        <Input {...attrs} type="password" bind:value={$formData.password} />
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>
            </div>
            <Button type="submit">Login</Button>
    </div>

</div>