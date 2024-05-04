<script lang="ts">
  import AuthTabsMd from "@/components/ui/auth/auth-tabs-md.svelte";
  import { page } from "$app/stores";
  import LoginForm from "./login/+page.svelte";
  import RegisterForm from "./register/+page.svelte";
    
  export let data

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

<div class="flex h-[90vh] items-center justify-center">
  <AuthTabsMd tab={activeTab}>
    <LoginForm slot="loginForm" data={data.loginForm}/>
    <RegisterForm slot="registerForm" data={data.registerForm}/>
  </AuthTabsMd>
</div>