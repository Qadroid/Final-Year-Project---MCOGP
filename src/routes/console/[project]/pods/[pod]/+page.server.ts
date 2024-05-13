import { KUBECONFIG_BASE64 } from '$env/static/private';
import type { PageServerLoad } from './$types';
import * as k8s from '@kubernetes/client-node';

export const load: PageServerLoad = async ({ params }) => {
    const { pod } = params

    function getK8sClient(encodedKubeConfig: string) {
        const kubeConfigContent = Buffer.from(encodedKubeConfig, 'base64').toString('utf-8');
        const kubeConfig = new k8s.KubeConfig();
        kubeConfig.loadFromString(kubeConfigContent);
        return kubeConfig.makeApiClient(k8s.CoreV1Api);
    }

    const k8sClient = getK8sClient(KUBECONFIG_BASE64);

    let resultPod

    try {
        const podRes = await k8sClient.readNamespacedPod(pod, 'default');
        resultPod = podRes.body
        resultPod = toPOJO(resultPod)
    } catch (err) {
        console.error(err);
    }

    return {
        resultPod: resultPod
    }
}

function toPOJO(obj) {
    return JSON.parse(JSON.stringify(obj, (key, value) => {
        if (typeof value === 'function') {
            return undefined; // Exclude functions
        }
        return value;
    }));
}
