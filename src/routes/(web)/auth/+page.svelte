<script lang="ts">
  import LoginForm from "./loginForm.svelte";
  import RegisterForm from "./registerForm.svelte";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import * as Card from "$lib/components/ui/card/index.js";

  import AuthImg from "$lib/assets/authImg.gif"
  
  import type { PageData } from "./$types.js";
  export let data: PageData;
</script>


<div class=" pt-40 items-center flex justify-center">
  <div class="w-auto" />
    <div class="rounded-xl bg-zinc-1000 flex p-6 border-solid border border-zinc-500">
      <img src={AuthImg} class="w-[400px] h-[465px] rounded-md" alt="auth-gif"/>
      <div class="w-[400px] pl-3 pr-3">
        <Tabs.Root value="login" class="w-[400px] h-[465px]">
          <Tabs.List class="grid w-full grid-cols-2 bg-zinc-900">
            <Tabs.Trigger value="login">Login</Tabs.Trigger>
            <Tabs.Trigger value="register">Register</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="login">
            <Card.Root class="h-[420px]">
              <Card.Header>
                <Card.Title>Login</Card.Title>
                <Card.Description>
                  Enter your login details below.
                </Card.Description>
              </Card.Header>
              <Card.Content class="space-y-2">
                <LoginForm data={data.loginForm}/>
              </Card.Content>
              <Card.Footer>
              </Card.Footer>
            </Card.Root>
          </Tabs.Content>
          <Tabs.Content value="register">
            <Card.Root class="h=[400px]">
              <Card.Header>
                <Card.Title>Register</Card.Title>
                <Card.Description>
                  Sign up for an account.
                </Card.Description>
              </Card.Header>
              <Card.Content class="space-y-2">
                <RegisterForm data={data.registerForm}/>
              </Card.Content>
              <Card.Footer>
              </Card.Footer>
            </Card.Root>
          </Tabs.Content>
        </Tabs.Root>  
      </div>
    <div class="w-auto" />
  </div>
</div>