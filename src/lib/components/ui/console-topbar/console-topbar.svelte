<script lang=ts>
    import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";

    // Use the code below to make the breadcrumb dynamic
    // import { page } from "$app/stores";

    // console.log($page.url.pathname);
    // let pagePath = $page.url.pathname.split("console").pop();
    // console.log(pagePath);
    // let currentProject;

</script>

<div>
    <!-- Breadcrumb -->
    <div class="p-3 pl-5 h-14">
        <Breadcrumb.Root>
            <Breadcrumb.List>

              <Breadcrumb.Item>
                <Breadcrumb.Link href="/console">Console</Breadcrumb.Link>
              </Breadcrumb.Item>
                <Breadcrumb.Separator />
            </Breadcrumb.List>
          </Breadcrumb.Root>
    </div>
</div>