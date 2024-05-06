<script lang="ts">
  import * as Form from "$lib/components/ui/form/index.js";
  import { Input } from "$lib/components/ui/input/index.js";

  import {
      loginSchema,
      type LoginSchema,  
  } from "$lib/schemas/authSchema";
  import {
      type SuperValidated,
      type Infer,
      superForm,
  } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
	import { Button } from "@/components/ui/button";
  import { SignedOut } from "sveltefire";
  import { signInWithEmailAndPassword } from "firebase/auth";

  export let data: SuperValidated<Infer<LoginSchema>>

  const form = superForm( data, {
      validators: zodClient(loginSchema)
  });

  const { form: formData, enhance } = form;

</script>

<SignedOut let:auth>
  <form use:enhance method="POST" on:submit={() => signInWithEmailAndPassword(auth, $formData.email, $formData.password)}>
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
    <Button type="submit">Login</Button>
  </form>
</SignedOut>
