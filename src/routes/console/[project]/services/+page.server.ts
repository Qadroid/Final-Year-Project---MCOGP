import { KUBECONFIG_BASE64 } from '$env/static/private';
import type { PageServerLoad } from './$types';
import * as k8s from '@kubernetes/client-node';

export const load: PageServerLoad = async () => {

    function getK8sClient(encodedKubeConfig: string) {
        const kubeConfigContent = Buffer.from(encodedKubeConfig, 'base64').toString('utf-8');
        const kubeConfig = new k8s.KubeConfig();
        kubeConfig.loadFromString(kubeConfigContent);
        return kubeConfig.makeApiClient(k8s.CoreV1Api);
    }

    function transformServiceData(rawServices) {
        return rawServices.map(service => ({
            name: service.metadata.name,
            type: service.spec.type,
            clusterIP: service.spec.clusterIP,
            ports: service.spec.ports.map(port => `${port.port}/${port.protocol}`).join(', ')
        }));
    }

    const k8sClient = getK8sClient(KUBECONFIG_BASE64);
    const { body: { items: rawServices } } = await k8sClient.listNamespacedService('default'); // Adjust namespace if necessary

    const services = transformServiceData(rawServices);

    return {
        services,
    };
};
