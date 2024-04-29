<script lang="ts">
  import { onMount } from 'svelte'
  import { supabase } from '$lib/utils/supabase'
  import type { AuthSession } from '@supabase/supabase-js'
	import HomeNav from '$lib/components/navigation/homeNav.svelte';

  let session: AuthSession | null = null;

  onMount(() => {
    supabase.auth.getSession().then(({ data }) => {
      session = data.session
    })

    supabase.auth.onAuthStateChange((_event, _session) => {
      session = _session
    })
  })
</script>

<HomeNav />
