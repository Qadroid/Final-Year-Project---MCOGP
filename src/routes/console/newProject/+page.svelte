<script lang="ts">
    import ProjectForm from "./projectForm.svelte";
    import type { PageData } from "./$types";

    export let data: PageData

</script>

<div class="flex-row w-full h-full justify-center items-center">
    <p class="flex text-3xl font-semibold p-5">Create a new Project to get started</p>
    <ProjectForm data={data.projectForm} />    
</div>