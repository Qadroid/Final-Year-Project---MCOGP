<script lang="ts">
    import { redirect } from '@sveltejs/kit';
    
    export let data

    const { projects } = data
    
    // if (projects.length === 0) {
    //     redirect(301, '/console/newProject')
    // }

</script>


<div class="w-full h-full self-center">
    <h1>Please select a project from the top of the sidebar</h1>
    <h2>If no project exists, create a new project</h2>
</div>