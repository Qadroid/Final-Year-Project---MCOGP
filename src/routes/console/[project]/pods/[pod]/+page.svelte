<script lang="ts">
    import ObjectViewer from './ObjectViewer.svelte';
    
    export let data
    const { resultPod } = data

</script>

<div class="h-full">
    <div>
        <div class="p-6 flex items-center">
            <h1 class="text-3xl font-bold mr-6">Pod:</h1><h2 class="text-3xl font-bold font-sans">{resultPod?.metadata?.name}</h2>
        </div>
        <div class="p-6">
            <div class="flex items-center">
                <h2 class="text-xl font-bold mr-6">Pod Details</h2>
                <ObjectViewer obj={resultPod} />
            </div>
        </div>
    </div>
</div>