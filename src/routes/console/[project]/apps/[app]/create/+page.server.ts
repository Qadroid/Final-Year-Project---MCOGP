import type { Actions, PageServerLoad } from './$types';
import { KUBECONFIG_BASE64 } from '$env/static/private';
import * as k8s from '@kubernetes/client-node';
import { minecraftSchema } from '@/schemas/minecraftSchema';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

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

let name: string
let storage: number
let cpu: number
let ram : number

export const actions: Actions = {
    default: async ({ request }) => {
        const minecraftForm = await superValidate(request, zod(minecraftSchema));
        if (!minecraftForm.valid) {
            return fail(400, {
                minecraftForm,
            })
        }

        name = minecraftForm.data.name
        storage = Number(minecraftForm.data.storage)
        cpu = Number(minecraftForm.data.cpu)
        ram = Number(minecraftForm.data.ram)
        
        deployMinecraftServer({ name, cpu, ram, storage });
        
        
        return {
            redirect: `/console/admin/apps/${name}`,
            status: 303
        };
    }
}

function createMinecraftResources(name: string, cpu: number, ram: number, storage: number) {
    // Create a persistent volume claim
    const pvc = {
        apiVersion: 'v1',
        kind: 'PersistentVolumeClaim',
        metadata: {
            name: `${name}-pvc`
        },
        spec: {
            accessModes: ['ReadWriteOnce'],
            resources: {
                requests: {
                    storage: `${storage}Gi`
                }
            }
        }
    };

    // Create the deployment
    const deployment = {
        apiVersion: 'apps/v1',
        kind: 'Deployment',
        metadata: {
            name: name
        },
        spec: {
            replicas: 1,
            selector: {
                matchLabels: {
                    app: name
                }
            },
            template: {
                metadata: {
                    labels: {
                        app: name
                    }
                },
                spec: {
                    containers: [{
                        name: name,
                        image: 'itzg/minecraft-server:latest',
                        env: [{
                            name: 'EULA',
                            value: 'TRUE'
                        }, {
                            name: 'MEMORY',
                            value: `${ram}G`
                        }, {
                            name: 'TYPE',
                            value: 'PAPER'
                        }],
                        resources: {
                            requests: {
                                cpu: '500m',
                                memory: '1Gi'
                            },
                            limits: {
                                cpu: `${cpu}`,
                                memory: `${ram}Gi`
                            }
                        },
                        ports: [{
                            containerPort: 25565
                        }],
                        volumeMounts: [{
                            mountPath: '/data',
                            name: 'data'
                        }]
                    }],
                    volumes: [{
                        name: 'data',
                        persistentVolumeClaim: {
                            claimName: `${name}-pvc`
                        }
                    }]
                }
            }
        }
    };

    // Create a service
    const service = {
        apiVersion: 'v1',
        kind: 'Service',
        metadata: {
            name: `${name}-service`
        },
        spec: {
            type: 'NodePort',
            selector: {
                app: name
            },
            ports: [{
                targetPort: 25565,
                protocol: 'TCP'
            }]
        }
    };

    return { deployment, pvc, service };
}

async function deployMinecraft({ deployment, pvc, service }) {
    // Create PVC
    await k8sClient.createNamespacedPersistentVolumeClaim('default', pvc);
    // Create Deployment
    await k8sClient.createNamespacedPod('default', deployment);
    // Create and retrieve Service
    const createdService = await k8sClient.createNamespacedService('default', service);
    const nodePort = createdService.body.spec.ports[0].nodePort;
    console.log(`Minecraft Server running on NodePort: ${nodePort}`);
    return nodePort;
}

async function deployMinecraftServer({ name, cpu, ram, storage }) {
    const { deployment, pvc, service } = createMinecraftResources(name, cpu, ram, storage);
    const nodePort = await deployMinecraft({ deployment, pvc, service });
    return { nodePort };
}