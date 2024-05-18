import * as k8s from '@kubernetes/client-node';

function getK8sClientFromBase64(encodedKubeConfig: string) {
    console.log(encodedKubeConfig)
    const kubeConfigContent = Buffer.from(encodedKubeConfig, 'base64').toString('utf-8');
    const kubeConfig = new k8s.KubeConfig();
    kubeConfig.loadFromString(kubeConfigContent);
    return kubeConfig.makeApiClient(k8s.CoreV1Api);
}

export { getK8sClientFromBase64 }