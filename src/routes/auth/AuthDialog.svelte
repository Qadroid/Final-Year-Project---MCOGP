<script lang="ts">
    import {
      Button,
      buttonVariants
    } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
  </script>../AuthForm.svelte
   
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
      
      <Dialog.Footer>
        <Button type="submit">Save changes</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>