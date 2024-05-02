<script lang="ts">
  import {
      type LoginSchema, 
      type RegisterSchema 
  } from "$lib/schemas/authSchema";
  import {
      type SuperValidated,
      type Infer,
  } from "sveltekit-superforms";
  import AuthTabs from "./auth-tabs.svelte";
	import { page } from "$app/stores";
  
  let loading = false;

  export let data: {
      loginForm: SuperValidated<Infer<LoginSchema>>,
      registerForm: SuperValidated<Infer<RegisterSchema>>
  }

  let activeTab = "login";

  $: {
    const path = $page.url.pathname;
    if (path === "/auth/login") {
      activeTab = "login";
    } else if (path === "/auth/register") {
      activeTab = "register";
    } else {
      activeTab = "login";
    }
  }

</script>

<AuthTabs tab={activeTab} data={data}/>
  
