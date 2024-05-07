import { KUBECONFIG_BASE64 } from '$env/static/private';
import type { Actions } from './$types';
import * as k8s from '@kubernetes/client-node';

export const actions: Actions = {
    default: async ({ event }) => {
        // insert form validation here
        // const createPodForm = await superValidate(request, zod(createPodSchema));
        // if (!createPodForm.valid) {
        //     return fail(400, {
        //         createPodForm,
        //     })
        // }
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