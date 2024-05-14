<script lang="ts">
  import * as Form from "$lib/components/ui/form/index.js";
  import { Input } from "$lib/components/ui/input/index.js";

  import {
      registerSchema,
  type RegisterSchema,  
  } from "../AuthSchema";
  import {
      type SuperValidated,
      type Infer,
      superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
    import Button from "@/components/ui/button/button.svelte";

  export let data: { registerForm: SuperValidated<Infer<RegisterSchema>>};

  const form = superForm( data.registerForm, {
      validators: zodClient(registerSchema)
  });

  const { form: formData, enhance } = form;
</script>

<p class="pb-8 text-xl font-bold">Register</p>
<form use:enhance method="POST"> 
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
  <div class="space-y-1 pb-5">
    <Form.Field {form} name="confirmPassword">
      <Form.Control let:attrs>
          <Form.Label for="confirmPassword">Confirm Password</Form.Label>
          <Input {...attrs} type="password" bind:value={$formData.confirmPassword} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
  </div>
  <Button type="submit">Register</Button>
</form>
  