<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Form from "$lib/components/ui/form/index.js";
	import LoginForm from "$lib/components/auth/loginForm.svelte";

  import type { PageData } from "../../../routes/$types";
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
          <LoginForm data={data.form}/>
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
            <form method="post" action="/api/auth/register">
                <div class="space-y-1">
                    <Form.Control>
                        <Form.Label for="email">Email</Form.Label>
                        <Input id="email" type="email" name="email" />
                    </Form.Control>
                </div>
                <div class="space-y-1">
                    <Form.Control>
                        <Form.Label for="password">Password</Form.Label>
                        <Input id="password" type="password" name="password" />
                    </Form.Control>
                </div>
                <div class="space-y-1">
                    <Form.Control>
                        <Form.Label for="password-confirm">Confirm Password</Form.Label>
                        <Input id="password-confirm" type="password" name="password-confirm" />
                    </Form.Control>
                </div>
                <Button type="submit">Register</Button>
            </form>
        </Card.Content>
        <Card.Footer>
          <!-- <Button>Save password</Button> -->
        </Card.Footer>
      </Card.Root>
    </Tabs.Content>
  </Tabs.Root>