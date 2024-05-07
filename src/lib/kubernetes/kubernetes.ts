import k8s from '@kubernetes/client-node'
import { createClient } from '@supabase/supabase-js';
import { writable } from 'svelte/store'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

const supabase = createClient( PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)

const kc = writable(new k8s.KubeConfig())

async function loadKubeConfig( projectId: string ) {
    const { data, error } = await supabase
        .from('projects')
        .select('kubeconfig')
        .eq('id', projectId)
        .single();

    if (error) {
        console.error('Error fetching project:', error);
        return;
    }

    if (data && data.kubeconfig) {
        const kubeconfig = data.kubeconfig;
        kc.update(kc => {
            kc.loadFromString(kubeconfig);
            return kc;
        });
    } else {
        console.log('No such project!');
    }
}

// Update to makeApiClient after initialization
kc.subscribe(async (config) => {
    if (config) {
        const k8sApi = config.makeApiClient(k8s.CoreV1Api);

        try {
            const podsRes = await k8sApi.listNamespacedPod('default');
            console.log(podsRes.body);
        } catch (err) {
            console.error(err);
        }
    }
});

export { loadKubeConfig, kc };