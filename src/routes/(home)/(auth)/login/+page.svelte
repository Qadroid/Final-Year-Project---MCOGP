<script lang="ts">
  import * as Form from "$lib/components/ui/form/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { login } from "@/stores/user";

  import {
      loginSchema,
      type LoginSchema,  
  } from "../AuthSchema";
  import {
      type SuperValidated,
      type Infer,
      superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
	import { goto } from "$app/navigation";

  export let data: { loginForm: SuperValidated<Infer<LoginSchema>> }

  const form = superForm( data.loginForm, {
      validators: zodClient(loginSchema)
  });

  const { form: formData } = form;

  const handleLogin = async () => {
      try {
        await login($formData.email, $formData.password)
        goto('/console')
      } catch (error) {
        console.error(error)
      }
  }
</script>

<p class="pb-8 text-xl font-bold">Login</p>

<form on:submit|preventDefault={handleLogin}>
  <div class="space-y-1">
    <Form.Field {form} name="email">
      <Form.Control let:attrs>
        <Form.Label for="email">Email</Form.Label>
        <Input {...attrs} type="email" bind:value={$formData.email}/>
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
  <Form.Button type="submit">Login</Form.Button>
</form>
  