<script lang="ts">
  import { supabase } from '$lib/utils/supabase'
  import {
      superForm,
	  type Infer,
	  type SuperValidated,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import * as Card from "$lib/components/ui/card";
  import { formSchema, type FormSchema } from '$lib/utils/schema';
	import AuthForm from '$lib/components/AuthForm.svelte';
  import {
      Button,
      buttonVariants
    } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
 
  export let data: SuperValidated<Infer<FormSchema>>;

  const form = superForm(data, {
    validators: zodClient(formSchema),
  });

 const { form: formData, enhance } = form;
  let loading = false
  let email = ''

  const handleLogin = async () => {
    try {
      loading = true
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) throw error
      alert('Check your email for login link!')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      loading = false
    }
  }
</script>
<Dialog.Root>
  <Dialog.Trigger class={buttonVariants({ variant: "outline" })}
    >Login/Register</Dialog.Trigger
  >
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Login/Register</Dialog.Title>
      <Dialog.Description>
          Login with a magic link
      </Dialog.Description>
    </Dialog.Header>
    <AuthForm data={data.form} />
    <Dialog.Footer>
      <Button type="submit">Save changes</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<slot />