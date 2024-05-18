import { getK8sClientFromBase64 } from '@/kubernetes/kubernetes';
import { selectedProject } from '@/stores/projects'
import type { V1PodList } from '@kubernetes/client-node';
import { get } from 'svelte/store';

export type Pod = {
    name: string;
    namespace: string;
    status: string;
    podIP: string;
};

export const loadPods = async (): Promise<{ podList: Pod[] }> => {
    const project = get(selectedProject);
    console.log('selectedProject', project);
    console.log('selectedProject kubeconfig', project?.kubeconfig);

    if (!project?.kubeconfig) {
        throw new Error('Kubeconfig not found in selected project');
    }

    const k8sClient = getK8sClientFromBase64(project.kubeconfig);

    console.log('k8sClient', project.kubeconfig);

    function transformPodData(rawPods: any[]): Pod[] {
        return rawPods.map(pod => ({
            name: pod.metadata.name,
            namespace: pod.metadata.namespace,
            status: pod.status.phase,
            podIP: pod.status.podIP,
        }));
    }

    let podListRaw: V1PodList["items"];
    let podList: Pod[] = [];

    console.log('k8sClient', k8sClient);

    try {
        const podsRes = await k8sClient.listPodForAllNamespaces();
        podListRaw = podsRes.body.items;
        podList = transformPodData(podListRaw);
    } catch (err) {
        console.error(err);
    }

    console.log('podList', podList);

    return {
        podList
    };
};
