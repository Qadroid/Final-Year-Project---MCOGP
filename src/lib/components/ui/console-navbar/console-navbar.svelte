<script lang=ts>
	import ConsoleNavbarContent from "./console-navbar-content.svelte";
	import ConsoleNavbarFooter from "./console-navbar-footer.svelte";
	import ConsoleNavbarHeader from "./console-navbar-header.svelte";

</script>

<div class="flex-col flex h-screen w-64 bg-zinc-950 border-r">
    
    <!-- Top bound -->
    
    <div class="flex-grow">
        
        <!-- Navbar header -->
        <div class="">
            <ConsoleNavbarHeader />
        </div>
    
        <div class="border-b"/>
        
        <!-- Navbar content -->
        <div class="grow">
            <ConsoleNavbarContent />
        </div>

    </div>

    <!-- Bottom bound -->

    <!-- Navbar footer -->
    <div class="h-14 p-1 border-t">
        <ConsoleNavbarFooter />
    </div>
</div>