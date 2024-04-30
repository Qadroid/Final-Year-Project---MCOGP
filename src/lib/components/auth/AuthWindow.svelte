<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
	import LoginForm from "$routes/auth/login/+page.svelte";

  import type { PageData } from "../../../routes/$types";
	import RegisterForm from "$routes/auth/register/+page.svelte";
  export let data: PageData;
</script>
   
  <Tabs.Root value="account" class="w-[400px]">
    <Tabs.List class="grid w-full grid-cols-2">
      <Tabs.Trigger value="login">Login</Tabs.Trigger>
      <Tabs.Trigger value="register">Register</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="login">
      <Card.Root>
        <Card.Header>
          <Card.Title>Login</Card.Title>
          <Card.Description>
            Enter your login details below.
          </Card.Description>
        </Card.Header>
        <Card.Content class="space-y-2">
          <LoginForm />
        </Card.Content>
        <Card.Footer>
          <Button>Save changes</Button>
        </Card.Footer>
      </Card.Root>
    </Tabs.Content>
    <Tabs.Content value="register">
      <Card.Root>
        <Card.Header>
          <Card.Title>Register</Card.Title>
          <Card.Description>
            Sign up for an account.
          </Card.Description>
        </Card.Header>
        <Card.Content class="space-y-2">
          <RegisterForm />
        </Card.Content>
        <Card.Footer>
          <!-- <Button>Save password</Button> -->
        </Card.Footer>
      </Card.Root>
    </Tabs.Content>
  </Tabs.Root>