import { KUBECONFIG_BASE64 } from '$env/static/private';
// import { createClient } from '@supabase/supabase-js';
import type { PageServerLoad } from './$types';
import * as k8s from '@kubernetes/client-node';
// import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

// const supabase = createClient( PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY );

export const load: PageServerLoad = async () => {
    // const currentProject = 'admin'
    // const { data, error } = await supabase
    //     .from('projects')
    //     .select('name, kubeconfig')
    //     .eq('name', currentProject)
    //     .single()

    // console.log(data)

    // const { kubeconfig } = data[0].kubeconfig

    function getK8sClient(encodedKubeConfig: string) {
        const kubeConfigContent = Buffer.from(encodedKubeConfig, 'base64').toString('utf-8');
        const kubeConfig = new k8s.KubeConfig();
        kubeConfig.loadFromString(kubeConfigContent);
        return kubeConfig.makeApiClient(k8s.CoreV1Api);
    }

    const k8sClient = getK8sClient(KUBECONFIG_BASE64);

    function transformPodData(rawPods) {
        return rawPods.map(pod => ({
          name: pod.metadata.name,
          namespace: pod.metadata.namespace,
          containerID: pod.status?.containerStatuses?.[0]?.containerID || 'Unknown',
          image: pod.status?.containerStatuses?.[0]?.image || 'No image available',
          phase: pod.status.phase,
          podIP: pod.status.podIP,
          startTime: pod.metadata.creationTimestamp,
        }));
      }

    let podListRaw
    let podList

    try {
        const podsRes = await k8sClient.listNamespacedPod('default');
        podListRaw = podsRes.body.items
        podList = transformPodData(podListRaw)
    } catch (err) {
        console.error(err);
    }

    return {
        podList: podList
    }
}