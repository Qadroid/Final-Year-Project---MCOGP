import type { RequestHandler } from '@sveltejs/kit';
import { KUBECONFIG_BASE64 } from '$env/static/private';
import * as k8s from '@kubernetes/client-node';

export const DELETE: RequestHandler = async ({ params }) => {
    function getK8sClient(encodedKubeConfig: string) {
        const kubeConfigContent = Buffer.from(encodedKubeConfig, 'base64').toString('utf-8');
        const kubeConfig = new k8s.KubeConfig();
        kubeConfig.loadFromString(kubeConfigContent);
        return kubeConfig.makeApiClient(k8s.CoreV1Api);
    }

    const k8sClient = getK8sClient(KUBECONFIG_BASE64);

    const { id } = params; 

    try {
        console.log('Deleting pod:', id);
        const result = await k8sClient.deleteNamespacedPod(id, 'default');
        return {
            status: 200,
            body: {
                message: 'Pod deleted successfully',
                details: result.body
            }
        };
    } catch (error) {
        console.error('Failed to delete pod:', error);
        return {
            status: error.statusCode || 500,
            body: {
                error: 'Failed to delete the pod',
                details: error.response?.body
            }
        };
    }
};