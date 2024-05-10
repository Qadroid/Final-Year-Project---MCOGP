// schema 
import { z } from "zod";

export const minecraftSchema = z.object({
    name: z.string().min(6, { message: "Minimum 6 characters" }),
    storage: z.number().min(1, { message: "Minimum 1 GB" }).max(10, { message: "Maximum 10 GB" }),
    ram: z.number().min(1, { message: "Minimum 1 GB" }).max(4, { message: "Maximum 4 GB" }),
    cpu: z.number().min(1, { message: "Minimum 1 core" }).max(4, { message: "Maximum 4 cores" })
});

export type MinecraftSchema = typeof minecraftSchema;

// Deployment template
import type { V1PersistentVolumeClaim, V1Pod, V1Service } from '@kubernetes/client-node';

export const deploymentTemplate = ( 
    ram = "2", 
    cpu = "2", 
    storage = "3", 
    name = "minecraft"
) => {
    const pvc: V1PersistentVolumeClaim = {
        apiVersion: 'v1',
        kind: 'PersistentVolumeClaim',
        metadata: {
            name: name + `-pvc`
        },
        spec: {
            accessModes: ['ReadWriteOnce'],
            resources: {
                requests: {
                    storage: storage + `Gi`
                }
            }
        }
    };

    const pod: V1Pod = {
        apiVersion: 'v1', 
        kind: 'Pod',
        metadata: {
            name: name
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
                    value: ram + 'G' 
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
                        cpu: cpu,
                        memory: ram + 'Gi' 
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
                    claimName: name + '-pvc' 
                }
            }]
        }
    }

    const service: V1Service = {
        apiVersion: 'v1',
        kind: 'Service',
        metadata: {
            name: name + `-service`
        },
        spec: {
            type: 'NodePort',
            selector: {
                app: name
            },
            ports: [{
                port: 25565,
                protocol: 'TCP'
            }]
        }
    };

    return {
        pvc: pvc,
        pod: pod,
        service: service,
    }
}
