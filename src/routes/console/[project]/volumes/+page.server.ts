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

    function transformVolumeData(rawVolumes) {
        return rawVolumes.map(volume => ({
            name: volume.metadata.name,
            capacity: volume.spec.capacity.storage,
            accessModes: volume.spec.accessModes.join(', '),
            storageClass: volume.spec.storageClassName,
            status: volume.status.phase,
        }));
    }

    const k8sClient = getK8sClient(KUBECONFIG_BASE64);
    const { body: { items: rawVolumes } } = await k8sClient.listPersistentVolume();

    const volumes = transformVolumeData(rawVolumes);

    return {
        volumes,
    };
};
