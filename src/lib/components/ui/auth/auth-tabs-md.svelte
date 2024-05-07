<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  // import AuthImg from "$lib/assets/AuthGif.gif";

</script>
  

<div class="">
  <div class="rounded-lg bg-zinc-900 opacity-95 flex p-3 border border-zinc-700 backdrop-blur-3xl">

    <!-- Auth dialog image -->
    <!-- <img src={AuthImg} class="w-[400px] h-[465px] rounded-md" alt="auth-side"/> -->
    <div class="w-[400px] h-[465px] rounded-md opacity-95 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-800 animate-gradient" />

    <!-- Auth page tabs -->
    <div class="w-[400px] px-2 flex">
      <Tabs.Root value="login" class="w-[400px] px-3">
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
  

<style>
  .animate-gradient {
    background-size: 300%;
    -webkit-animation: animatedgradient 6s ease infinite;
    -moz-animation: animatedgradient 6s ease infinite;
    animation: gradient 6s ease infinite;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style>