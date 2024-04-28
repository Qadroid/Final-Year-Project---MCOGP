<script lang="ts" typeof="module">
  import { supabase } from '$lib/utils/supabase'
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { formSchema, type FormSchema } from "$lib/utils/schema";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
 
  // Initialize form data with initial values
  let initialData = {
    email: '',
  };

  export let data: SuperValidated<Infer<FormSchema>> = superForm(initialData, {
    validators: zodClient(formSchema),
  });

  const { form: formData, enhance } = data;

  let loading = false;

  const handleLogin = async () => {
  try {
    loading = true;
    const { error } = await supabase.auth.signInWithOtp({ email: formData.email.value });
    if (error) throw error;
    alert('Check your email for login link!');
  } catch (error) {
    if (error instanceof Error) {
    alert(error.message);
    }
  } finally {
    loading = false;  
  }
};
</script>

<form on:submit|preventDefault="{handleLogin}" use:enhance>
  <Form.Field {form} name="email">
    <Form.Control let:attrs>
      <Form.Label>Email</Form.Label>
      <Input type="email" placeholder="Enter your email" class="max-w-xs" {...attrs} bind:value={formData.email.value} />
    </Form.Control>
    <Form.Description>Enter the email you wish to use for logging in.</Form.Description>
  </Form.Field>
  <Form.FieldErrors />
  <Form.Button type="submit" disabled="{loading}">Login</Form.Button>
</form>