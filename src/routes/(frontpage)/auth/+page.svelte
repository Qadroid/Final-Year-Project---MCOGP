<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import AuthGif from "$lib/assets/AuthGif.gif";

  import LoginForm from "./login/+page.svelte";
  import RegisterForm from "./register/+page.svelte";
  
  import {
      type LoginSchema, 
      type RegisterSchema 
  } from "$lib/schemas/authSchema";
  import {
      type SuperValidated,
      type Infer,
  } from "sveltekit-superforms";
	import { Button } from "@/components/ui/button";
	import Separator from "@/components/ui/separator/separator.svelte";
    
  let loading = false;

  export let data: {
      loginForm: SuperValidated<Infer<LoginSchema>>,
      registerForm: SuperValidated<Infer<RegisterSchema>>
  }

</script>
  
<div class=" pt-40 items-center flex flex-col justify-center">
  <div class="rounded-xl bg-zinc-1000 flex p-6 border-solid border border-zinc-700">

    <!-- Auth dialog image -->
    <img src={AuthGif} class="w-[400px] h-[465px] rounded-md" alt="auth-gif"/>

    <Separator class="h-full" orientation="vertical" />
    
    <!-- Auth page tabs -->
    <div class="w-[400px] pl-3 pr-3">
      <Tabs.Root value="login" class="w-[400px] pr-3">
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
            <Card.Footer class="mt-3">
              <Button class="w-full mt-16" variant="default" type="submit">Login</Button>
            </Card.Footer>
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
            <Card.Footer>
              <Button class="w-full" variant="default" type="submit">Register</Button>
            </Card.Footer>
          </Card.Root>
        </Tabs.Content>
      </Tabs.Root>  
    </div>
    <div class="w-auto" />
  </div>
</div>
