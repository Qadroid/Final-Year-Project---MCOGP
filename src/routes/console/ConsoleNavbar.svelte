<script lang="ts">
    import { page } from '$app/stores';
	import { onMount } from 'svelte';


    export let data
    let { selectedProject } = data
 
    // Ensure users cannot traverse the console without selecting a project
    let disabled = false;
    $: if (!selectedProject) {
        disabled = true
    }
    
    // For content    
    const navItems = [
        {
            sectionTitle: "Menu",
            sectionContent: [
                { title: "Dashboard", href: "dashboard" },
                { title: "Apps", href: "apps" },
                { title: "Deployments", href: "deployments" },
            ],    
        },    
        {
            sectionTitle: "Advanced - Resources",
            sectionContent: [
                { title: "Pods", href: "pods" },
                { title: "Volumes", href: "volumes" },
                { title: "Services", href: "services" },
            ],    
        },    
        {
            sectionTitle: "Project",
            sectionContent: [
                { title: "Nodes", href: "nodes" },
                { title: "Plan", href: "plan" }
            ]    
        }    
    ]    
    
</script>


