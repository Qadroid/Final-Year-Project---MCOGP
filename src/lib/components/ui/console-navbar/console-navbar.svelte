<script lang=ts>
    import Separator from "$lib/components/ui/separator/separator.svelte";
	import ConsoleNavbarFooter from "./console-navbar-footer.svelte";
	import ConsoleNavbarHeader from "./console-navbar-header.svelte";

</script>

<div class="relative p-2 flex-col space-x-1 border-b-2 h-screen min-h-[750px] navbar-left w-72 bg-zinc-950 border-r">
    <!-- Navbar header -->
    <div class="h-15 flex justify-evenly  p-2 rounded-lg space-x-2 basis-full">
        <ConsoleNavbarHeader />
    </div>

    <Separator class="w-full my-1" />
    
    <!-- Navbar content -->
    <div class="bg-zinc-800">
    </div>

    <!-- Navbar footer -->
    <div class="flex flex-col navbar-left-footer absolute h-20 inset-x-0 bottom-0 space-x-3">
        <Separator class="w-11/12 my-3"/>
        <ConsoleNavbarFooter />
    </div>
</div>