<script lang="ts">
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import Separator from "@/components/ui/separator/separator.svelte";
    import AuthGif from "$lib/assets/AuthGif.gif";
  
    import LoginForm from "./login-form.svelte";
    import RegisterForm from "./register-form.svelte";
      
    export let data: {
      loginForm: any,
      registerForm: any
    }

    export let tab
  
  </script>
  

<div class=" pt-40 items-center flex flex-col justify-center">
    <div class="rounded-xl bg-zinc-1000 flex p-6 border-solid border border-zinc-700">
  
      <!-- Auth dialog image -->
      <img src={AuthGif} class="w-[400px] h-[465px] rounded-md" alt="auth-gif"/>
  
      <Separator class="h-full" orientation="vertical" />
      
      <!-- Auth page tabs -->
      <div class="w-[400px] pl-3 pr-3">
        <Tabs.Root value={tab} class="w-[400px] pr-3">
          <Tabs.List class="grid w-full grid-cols-2 bg-zinc-900">
            <Tabs.Trigger value="login">Login</Tabs.Trigger>
            <Tabs.Trigger value="register">Register</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="login">
            <Card.Root class="h-[424px]">
              <Card.Header>
                <Card.Title>Login</Card.Title>
                <Card.Description>
                  Enter your login details below.
                </Card.Description>
              </Card.Header>
              <Card.Content class="space-y-2">
  
                <!-- Login form -->
                <LoginForm data={data.loginForm}/>
                
              </Card.Content>
            </Card.Root>
          </Tabs.Content>
          <Tabs.Content value="register">
            <Card.Root class="h=[350px]">
              <Card.Header>
                <Card.Title>Register</Card.Title>
                <Card.Description>
                  Sign up for an account.
                </Card.Description>
              </Card.Header>
              <Card.Content class="space-y-2">
  
                <!-- Registration Form -->
                <RegisterForm data={data.registerForm}/>
              
            </Card.Content>
            </Card.Root>
          </Tabs.Content>
        </Tabs.Root>  
      </div>
      <div class="w-auto" />
    </div>
  </div>
  