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

    function transformNodeData(rawNodes) {
        return rawNodes.map(node => {
            const creationTimestamp = new Date(node.metadata.creationTimestamp);
            const age = Math.floor((Date.now() - creationTimestamp.getTime()) / (1000 * 60 * 60 * 24));
            return {
                name: node.metadata.name,
                status: node.status.conditions.find(cond => cond.type === 'Ready').status,
                architecture: node.status.nodeInfo.architecture,
                kubeletVersion: node.status.nodeInfo.kubeletVersion,
                age: `${age} days`,
            };
        });
    }

    const k8sClient = getK8sClient(KUBECONFIG_BASE64);
    const { body: { items: rawNodes } } = await k8sClient.listNode();

    const nodes = transformNodeData(rawNodes);

    return {
        nodes,
    };
};
