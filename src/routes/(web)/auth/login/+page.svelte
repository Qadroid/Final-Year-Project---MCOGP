<script lang="ts">
    import type { PageData } from "../$types.js";
    import LoginForm from "../loginForm.svelte";
    export let data: PageData;
  </script>
   
  <LoginForm data={data.loginForm} />