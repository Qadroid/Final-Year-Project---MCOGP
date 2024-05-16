<script>
	import { getProjects } from "@/stores/projects";
    import "../app.css"
    getProjects();
</script>

<main class="w-screen h-screen">
    <slot />
</main>