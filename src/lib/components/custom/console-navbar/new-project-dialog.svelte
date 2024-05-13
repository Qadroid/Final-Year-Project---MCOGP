<script lang="ts">
    import {
      Button,
      buttonVariants
    } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Plus } from "lucide-svelte";

    import NewProjectForm from "$routes/console/newProject/+page.svelte";

    export let data
    
  </script>
   
  <Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
        New Project
        <Plus class="w-4 h-4 ml-2" />
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px]">
      <Dialog.Header>
        <Dialog.Title>New Project</Dialog.Title>
        <Dialog.Description>
            Create a new project by filling out the form below.
        </Dialog.Description>
      </Dialog.Header>

      <NewProjectForm { data }/>
      
      <Dialog.Footer>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>