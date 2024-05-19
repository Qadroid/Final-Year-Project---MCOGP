// import { KUBECONFIG_BASE64 } from '$env/static/private';
// import type { PageServerLoad } from './$types';
// import * as k8s from '@kubernetes/client-node';

// export const load: PageServerLoad = async () => {

//     function getK8sClient(encodedKubeConfig: string) {
//         const kubeConfigContent = Buffer.from(encodedKubeConfig, 'base64').toString('utf-8');
//         const kubeConfig = new k8s.KubeConfig();
//         kubeConfig.loadFromString(kubeConfigContent);
//         return kubeConfig.makeApiClient(k8s.CoreV1Api);
//     }

//     function transformPodData(rawPods) {
//         return rawPods.map(pod => ({
//             name: pod.metadata.name,
//             namespace: pod.metadata.namespace,
//             phase: pod.status.phase,
//             podIP: pod.status.podIP,
//             startTime: pod.metadata.creationTimestamp,
//         }));
//     }
    
//     let podListRaw
//     let podList
//     const k8sClient = getK8sClient(KUBECONFIG_BASE64);

//     try {
//         const podsRes = await k8sClient.listPodForAllNamespaces();
//         podListRaw = podsRes.body.items
//         console.log(podListRaw)
//         podList = transformPodData(podListRaw)
//     } catch (err) {
//         console.error(err);
//     }

//     return {
//         podList: podList
//     }
// }