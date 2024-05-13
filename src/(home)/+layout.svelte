<script lang="ts">
    export let data
    let { session } = data
</script>

<div class="w-screen h-screen">

    <!-- Top Navbar -->
    <div class="flex w-screen h-12 fixed bg-zinc-950 border items-center"> 

    </div>

    <!-- Content -->
    <div class="h-full grow">
        <slot />
    </div>
    
</div>