<script lang="ts">
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import * as Form from "$lib/components/ui/form/index.js";
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
            <form method="post" action="/api/auth/login">
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
                <Button type="submit">Login</Button>
            </form>
        </Card.Content>
        <Card.Footer>
          <Button>Save changes</Button>
        </Card.Footer>
      </Card.Root>
    </Tabs.Content>
    <Tabs.Content value="register">
      <Card.Root>
        <Card.Header>
          <Card.Title>Password</Card.Title>
          <Card.Description>
            Change your password here. After saving, you'll be logged out.
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
          <Button>Save password</Button>
        </Card.Footer>
      </Card.Root>
    </Tabs.Content>
  </Tabs.Root>