<script lang="ts">
  import AuthTabsMd from "@/components/ui/auth/auth-tabs-md.svelte";
  import { page } from "$app/stores";
  import LoginForm from "./login/+page.svelte";
  import RegisterForm from "./register/+page.svelte";
	import { SignedIn, SignedOut } from "sveltefire";
	import { redirect } from "@sveltejs/kit";

  const bgImage = "https://images.pexels.com/photos/20985362/pexels-photo-20985362/free-photo-of-cerro-2.jpeg"
  
  // Data for login and register forms generated in +layout.server.ts
  export let data

  // Use page store to get current page path
  let tab = "login";
  $: {
    const path = $page.url.pathname;
    if (path === "/auth/login") {
      tab = "login";
    } else if (path === "/auth/register") {
      tab = "register";
    } else {
      tab = "login";
    }
  }

</script>


<!-- Current height setting isn't optimal. Requires change -->
<SignedOut let:auth>
  <div class="flex h-[93vh] items-center justify-center bg-center bg-cover" style="background-image: url({ bgImage })">
    <AuthTabsMd {tab}>
      <LoginForm slot="loginForm" data={data.loginForm}/>
      <RegisterForm slot="registerForm" data={data.registerForm}/>
    </AuthTabsMd>
  </div>
</SignedOut>

<SignedIn>
  {redirect(301, '/')}
</SignedIn>