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

    function transformNamespaceData(rawNamespaces) {
        return rawNamespaces.map(namespace => ({
            name: namespace.metadata.name,
            creationTimestamp: namespace.metadata.creationTimestamp,
            phase: namespace.status.phase,
            labels: namespace.metadata.labels,
        }));
    }

    const k8sClient = getK8sClient(KUBECONFIG_BASE64);
    const { body: { items: rawNamespaces } } = await k8sClient.listNamespace();

    const namespaces = transformNamespaceData(rawNamespaces);

    return {
        namespaces,
    };
};
