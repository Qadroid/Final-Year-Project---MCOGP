<script lang="ts">
  import * as Form from "$lib/components/ui/form/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import Button from "@/components/ui/button/button.svelte";
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
	import { pb } from "@/pocketbase";

  export let data: { loginForm: SuperValidated<Infer<LoginSchema>> }

  const form = superForm( data.loginForm, {
      validators: zodClient(loginSchema)
  });

  const { form: formData } = form;

  async function handleLogin() {
    try {
      pb.collection("users").authWithPassword($formData.email, $formData.password);
      console.log("Login successful");
    } catch(error) {
      console.error("Login failed");
      console.error(error);
    }
  }
  
  
</script>

<p class="pb-8 text-xl font-bold">Login</p>

<form>
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
  <Button on:click={handleLogin} >Login</Button>
</form>
  