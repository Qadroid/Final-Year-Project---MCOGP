<script lang="ts">
  import AuthTabsMd from "$lib/components/custom/auth/auth-tabs-md.svelte";
  import LoginForm from "./login.svelte";
  import RegisterForm from "./register.svelte";

  const bgImage = "https://images.pexels.com/photos/20985362/pexels-photo-20985362/free-photo-of-cerro-2.jpeg"
  
  // Data for login and register forms generated in +layout.server.ts
  export let data

</script>


<!-- Current height setting isn't optimal. Requires change -->

<div class="flex items-center justify-center bg-center bg-cover w-full" style="background-image: url({ bgImage })">
  <AuthTabsMd>
    <LoginForm slot="loginForm" data={data.loginForm}/>
    <RegisterForm slot="registerForm" data={data.registerForm}/>
  </AuthTabsMd>
</div>