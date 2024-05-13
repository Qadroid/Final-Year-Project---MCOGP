import type { Actions, PageServerLoad } from './$types';
import { KUBECONFIG_BASE64 } from '$env/static/private';
import * as k8s from '@kubernetes/client-node';
import { minecraftSchema } from '@/mcogp/apps/minecraft';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { deploymentTemplate } from '@/mcogp/apps/minecraft';

export let data
const { user } = data

function getK8sClient(encodedKubeConfig: string) {
    const kubeConfigContent = Buffer.from(encodedKubeConfig, 'base64').toString('utf-8');
    const kubeConfig = new k8s.KubeConfig();
    kubeConfig.loadFromString(kubeConfigContent);
    return kubeConfig.makeApiClient(k8s.CoreV1Api);
}
    
const k8sClient = getK8sClient(KUBECONFIG_BASE64);

export const load: PageServerLoad = async () => {
    return {
        minecraftForm: await superValidate(zod(minecraftSchema)),
    };
}

export const actions: Actions = {
    default: async ({ request, params }) => {
        const minecraftForm = await superValidate(request, zod(minecraftSchema));
        if (!minecraftForm.valid) {
            return fail(400, {
                minecraftForm,
            })
        }

        const name: string = minecraftForm.data.name
        const storage: string = minecraftForm.data.storage.toString()
        const cpu: string = minecraftForm.data.cpu.toString()
        const ram: string = minecraftForm.data.ram.toString()

        const { pvc, pod, service } = deploymentTemplate(ram, cpu, storage, name); 

        deployMinecraft( pvc, pod, service );        
        
        return {
            redirect: `/console/admin/apps/${name}`,
            status: 303
        };
    }
}

async function deployMinecraft( pvc: k8s.V1PersistentVolumeClaim, deployment: k8s.V1Pod, service: k8s.V1Service) {
    const namespace = user.id;
    // Create PVC
    await k8sClient.createNamespacedPersistentVolumeClaim(namespace, pvc);
    // Create Deployment
    await k8sClient.createNamespacedPod(namespace, deployment);
    // Create and retrieve Service
    const createdService = await k8sClient.createNamespacedService(namespace, service);
    const nodePort = createdService.body.spec.ports[0].nodePort;
    console.log(`Minecraft Server running on NodePort: ${nodePort}`);
    return nodePort;
}