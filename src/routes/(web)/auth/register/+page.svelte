<script lang="ts">
  import type { PageData } from "../$types.js";
	import RegisterForm from "../registerForm.svelte";
  export let data: PageData;
</script>
   
<RegisterForm data={data.registerForm} />