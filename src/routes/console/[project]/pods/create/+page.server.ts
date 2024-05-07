import { KUBECONFIG_BASE64 } from '$env/static/private';
import type { Actions } from './$types';
import * as k8s from '@kubernetes/client-node';

export const actions: Actions = {
    default: async ({ request }) => {
        

        const { form: formdata } = event.body;

        function getK8sClient(encodedKubeConfig: string) {
            const kubeConfigContent = Buffer.from(encodedKubeConfig, 'base64').toString('utf-8');
            const kubeConfig = new k8s.KubeConfig();
            kubeConfig.loadFromString(kubeConfigContent);
            return kubeConfig.makeApiClient(k8s.CoreV1Api);
        }
    
        const k8sClient = getK8sClient(KUBECONFIG_BASE64);

        k8sClient.createNamespacedPod('default', {
            metadata: {
                name: formdata.name,
            },
            spec: {
                containers: [
                    {
                        name: formdata.name,
                        image: formdata.image,
                    },
                ],
            },
        })
    }
}


function filterNulls(obj) {
    const result = {};
    Object.keys(obj).forEach(key => {
        if (obj[key] !== null && obj[key] !== undefined) {
            if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                const cleaned = filterNulls(obj[key]);
                if (Object.keys(cleaned).length > 0) {
                    result[key] = cleaned;
                }
            } else if (Array.isArray(obj[key])) {
                result[key] = obj[key].map(filterNulls).filter(item => Object.keys(item).length > 0);
            } else {
                result[key] = obj[key];
            }
        }
    });
    return result;
}

function createPodSpec(formdata) {
    const podSpec = {
        metadata: {
            name: formdata.name,
            labels: formdata.labels
        },
        spec: {
            containers: [
                {
                    name: formdata.name,
                    image: formdata.image,
                    ports: formdata.ports,
                    env: formdata.env,
                    volumeMounts: formdata.volumeMounts,
                    resources: formdata.resources 
                }
            ],
            volumes: formdata.volumes,
            affinity: formdata.affinity,
        }
    };

    return filterNulls(podSpec);
}