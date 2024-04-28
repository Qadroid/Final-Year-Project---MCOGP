<script lang="ts">
    import { onMount } from 'svelte'
    import type { AuthSession } from '@supabase/supabase-js'
    import { supabase } from '$lib/utils/supabase'
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
	import Button from '$lib/components/ui/button/button.svelte';
    import { formSchema, type FormSchema } from './schema';
    import LoaderCircle from "lucide-svelte/icons/loader-circle";
    
    export let session: AuthSession
  
    let loading = false
    let username: string | null = null
    let avatarUrl: string | null = null
  
    onMount(() => {
      getProfile()
    })
  
    const getProfile = async () => {
      try {
        loading = true
        const { user } = session
  
        const { data, error, status } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', user.id)
          .single()
  
        if (error && status !== 406) throw error
  
        if (data) {
          username = data.username
          avatarUrl = data.avatar_url
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
      } finally {
        loading = false
      }
    }
  
    const updateProfile = async () => {
      try {
        loading = true
        const { user } = session
  
        const updates = {
          id: user.id,
          username,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        }
  
        const { error } = await supabase.from('profiles').upsert(updates)
  
        if (error) {
          throw error
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
      } finally {
        loading = false
      }
    }

    
    export let data: SuperValidated<Infer<FormSchema>>;
    
    const form = superForm(data, {
        validators: zodClient(formSchema),
    });
    
    const { form: formData, enhance } = form;
</script>

<form on:submit|preventDefault="{updateProfile}" use:enhance>    
    <Form.Field {form} name="email">
        <Form.Control let:attrs>
            <Form.Label>Email</Form.Label>
            <Input type="email" placeholder="email" class="max-w-xs" {...attrs} bind:value={$formData.email} />
        </Form.Control>
    </Form.Field>
    <Form.Description>Your email will be your main form of login.</Form.Description>
    <Form.FieldErrors />
    <Form.Button type="submit" disabled="{loading}">
        {#if loading} <LoaderCircle class="mr-2 h-4 w-4 animate-spin" /> Please Wait
        {:else} Update Profile
        {/if}
    </Form.Button>
    <Button variant="outline" on:click={() => supabase.auth.signOut()}>Sign Out</Button>
</form>

<slot />