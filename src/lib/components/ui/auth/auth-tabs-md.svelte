<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  // import AuthImg from "$lib/assets/AuthGif.gif";

  // Value used to assign default tab on load
  export let tab

</script>
  

<div class="">
  <div class="rounded-lg bg-zinc-900 flex p-3 border border-zinc-700">

    <!-- Auth dialog image -->
    <!-- <img src={AuthImg} class="w-[400px] h-[465px] rounded-md" alt="auth-side"/> -->
    <div class="w-[400px] h-[465px] rounded-md opacity-95 bg-gradient-to-t from-zinc-500 from-10% via-zinc-600 to-zinc-700" />

    <!-- Auth page tabs -->
    <div class="w-[400px] px-2 flex">
      <Tabs.Root value={tab} class="w-[400px] px-3">
        <Tabs.List class="grid w-full grid-cols-2 bg-zinc-800">
          <Tabs.Trigger value="login">Login</Tabs.Trigger>
          <Tabs.Trigger value="register">Register</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="login" class="bg-opacity-0">
          <Card.Root class="bg-opacity-0 border-0">
            <Card.Header>
              <Card.Title>Login</Card.Title>
              <Card.Description>
                Enter your login details below.
              </Card.Description>
            </Card.Header>
            <Card.Content>

              <!-- Login form -->
              <slot name="loginForm"/>
              
            </Card.Content>
          </Card.Root>
        </Tabs.Content>
        <Tabs.Content value="register">
          <Card.Root class="bg-opacity-0 border-0">
            <Card.Header>
              <Card.Title>Register</Card.Title>
              <Card.Description>
                Sign up for an account.
              </Card.Description>
            </Card.Header>
            <Card.Content>

              <!-- Registration Form -->
              <slot name="registerForm"/>
            
          </Card.Content>
          </Card.Root>
        </Tabs.Content>
      </Tabs.Root>  
    </div>
  </div>
</div>
  