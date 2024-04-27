<script>
	import Button from "./ui/button/button.svelte";

</script>
<div class="h-14 flex justify-between bg-gray-900 text-gray-300">
    <div id="left-menu" class="flex items-center pl-2">
      <a href="/">
        <img 
          src="" 
          alt="MCOGP Logo"
          class="h-12 w-12 mr-4" 
        />
      </a>
      <ul class="flex space-x-4">  <li>Home</li>
        <li>Features</li>
        <li>About</li>
        <li>Docs</li>
        <li>Contact</li>
      </ul>
    </div>
  
    <div class="flex items-center pr-2">
        <Button href="/login" variant="secondary">Login</Button>
        <Button href="/register" variant="secondary">Register</Button>
        <Button href="/console" variant="secondary">Console</Button>
    </div>
</div>
  
  <slot />
  