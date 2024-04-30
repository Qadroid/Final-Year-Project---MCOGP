<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Form from "$lib/components/ui/form/index.js";

  import { 
    loginSchema, 
    type LoginSchema 
  } from "$lib/schemas/authSchema";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";

  export let data: SuperValidated<Infer<LoginSchema>>;

  import { loginLoading } from "$stores/authLoadingState";
  
  const form = superForm( data, {
    validators: zodClient(loginSchema) 
  });
    
  const { form: formData, enhance } = form;
  
</script>

<form method="POST" use:enhance action="?/login">
    <div class="space-y-1">
      <Form.Field {form} name="email">
        <Form.Control let:attrs>
          <Form.Label for="email">Email</Form.Label>
          <Input {...attrs} type="email" bind:value={$formData.email}/>
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
    </div>
    <div class="space-y-1">
      <Form.Field {form} name="password">
        <Form.Control let:attrs>
            <Form.Label for="password">Password</Form.Label>
            <Input {...attrs} type="password" bind:value={$formData.password} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
    </div>
    <Button type="submit" disabled={$loginLoading}>Login</Button>
</form>