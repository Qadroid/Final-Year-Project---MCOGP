<script>
    export let obj;
    export let indent = 0;
  
    function isObject(value) {
      return typeof value === 'object' && value !== null;
    }
</script>

<div style="margin-left: {indent * 5}px;" class="border p-3 rounded-lg">
    {#each Object.entries(obj) as [key, value]}
        {#if value !== null}            
        <div>
            <span><strong>{key}:</strong></span>
            {#if isObject(value)}
            <svelte:self obj={value} indent={indent + 1} />
            {:else}
            {value}
            {/if}
        </div>
        {/if}
    {/each}
</div>