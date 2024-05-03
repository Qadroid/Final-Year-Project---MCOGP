<script lang="ts">
  import AuthTabs from "./auth-tabs.svelte";
	import { page } from "$app/stores";

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

<AuthTabs tab={activeTab}/>
  
