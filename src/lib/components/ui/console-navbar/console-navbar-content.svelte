<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
	import Separator from "../separator/separator.svelte";
</script>
   
<div class="flex flex-col mt-5 space-y-3 p-5 rounded-md shadow-inner border-zinc-900 border">
    <!-- Universal items -->
    <Button class="w-full text-left" variant="outline" href="/console/dashboard">Dashboard</Button>


    <!-- Simple use pages -->
    <Button class="w-full" variant="outline" href="/console/dashboard">Apps</Button>
    
    <Separator class="w-full opacity-50" />
    
    <!-- Advanced tool pages -->
    <div class="pt-3 pb-3 text-left text-xs text-zinc-400">
        Advanced - Resources
    </div>
    <Button class="w-full" variant="outline" href="/console/deployments">Deployments</Button>
    <Button class="w-full" variant="outline" href="/console/resources/nodes">Nodes</Button>
    <Button class="w-full" variant="outline" href="/console/resources/clusters">Clusters</Button>
    <Button class="w-full" variant="outline" href="/console/resources/namespaces">Namespaces</Button>
    <Button class="w-full" variant="outline" href="/console/resources/pods">Pods</Button>
    <Button class="w-full" variant="outline" href="/console/resources/services">Services</Button>
    <Button class="w-full" variant="outline" href="/console/resources/secrets">Secrets</Button>
</div>
 