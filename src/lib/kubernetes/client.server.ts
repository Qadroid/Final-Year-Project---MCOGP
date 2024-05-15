import * as k8s from '@kubernetes/client-node';
import { KUBECONFIG_BASE64 } from '$env/static/private';
import { emailToNamespace } from './kubeUtils';
import yaml from 'js-yaml';

// Server only use
const kubeConfigContent = Buffer.from(KUBECONFIG_BASE64, 'base64').toString('utf-8');
const kubeConfig = new k8s.KubeConfig();
kubeConfig.loadFromString(kubeConfigContent);
const serverK8sClient = kubeConfig.makeApiClient(k8s.CoreV1Api);
const serverK8sRbacClient = kubeConfig.makeApiClient(k8s.RbacAuthorizationV1Api);

async function createNamespace(email: string) {
    const namespace = 'namespace-' + emailToNamespace(email);
    
    // Define Namespace
    const namespaceResource = {
        metadata: {
            name: namespace,
        },
    };

    // Create Namespace
    try {
        const response = await serverK8sClient.createNamespace(namespaceResource);
        console.log('Namespace created:', response.body);
    } catch (error) {
        console.error('Error creating Namespace:', error);
    }
}

async function createServiceAccount(email: string) {
    const namespace = 'namespace-' + emailToNamespace(email);
    const serviceAccountName = 'sa-' + emailToNamespace(email);

    // Define ServiceAccount
    const serviceAccount = {
        metadata: {
            name: serviceAccountName,
            namespace: namespace,
        },
    };

    // Create ServiceAccount
    try {
        const response = await serverK8sClient.createNamespacedServiceAccount(namespace, serviceAccount);
        console.log('ServiceAccount created:', response.body);
    } catch (error) {
        console.error('Error creating ServiceAccount:', error);
    }

    return serviceAccountName;
}

async function bindServiceAccount(email: string, serviceAccountName: string) {
    const namespace = 'namespace-' + emailToNamespace(email);

    // Define RoleBinding for the ServiceAccount
    const roleBinding = {
        apiVersion: 'rbac.authorization.k8s.io/v1',
        kind: 'RoleBinding',
        metadata: {
            name: 'rolebinding-' + serviceAccountName,
            namespace: namespace,
        },
        subjects: [{
            kind: 'ServiceAccount',
            name: serviceAccountName,
            namespace: namespace,
        }],
        roleRef: {
            kind: 'ClusterRole',
            name: 'admin',
            apiGroup: 'rbac.authorization.k8s.io',
        },
    };

    // Create RoleBinding
    try {
        const response = await serverK8sRbacClient.createNamespacedRoleBinding(namespace, roleBinding);
        console.log('RoleBinding created:', response.body);
    } catch (error) {
        console.error('Error creating RoleBinding:', error);
    }
}

async function getServiceAccountToken(email: string, serviceAccountName: string) {
    const namespace = 'namespace-' + emailToNamespace(email);

    try {
        const secretList = await serverK8sClient.listNamespacedSecret(namespace);
        const secret = secretList.body.items.find(secret => secret.metadata.annotations &&
            secret.metadata.annotations['kubernetes.io/service-account.name'] === serviceAccountName);

        if (secret) {
            const token = Buffer.from(secret.data.token, 'base64').toString('utf-8');
            return token;
        } else {
            throw new Error('Token not found for ServiceAccount');
        }
    } catch (error) {
        console.error('Error retrieving ServiceAccount token:', error);
    }
}

async function generateKubeConfig(email: string, token: string) {
    const userName = 'user-' + emailToNamespace(email);
    const clusterName = kubeConfig.getCurrentCluster().name;
    const server = kubeConfig.getCurrentCluster().server;
    const caData = kubeConfig.getCurrentCluster().caData;
    const contextName = userName + '@' + clusterName;

    const kubeConfigForUser = {
        apiVersion: 'v1',
        kind: 'Config',
        clusters: [{
            name: clusterName,
            cluster: {
                server: server,
                'certificate-authority-data': caData,
            }
        }],
        users: [{
            name: userName,
            user: {
                token: token
            }
        }],
        contexts: [{
            name: contextName,
            context: {
                cluster: clusterName,
                user: userName,
                namespace: 'namespace-' + emailToNamespace(email),
            }
        }],
        'current-context': contextName,
    };

    return kubeConfigForUser;
}

export async function generateNewUserKubeConfig(email: string) {
    // Create Namespace
    await createNamespace(email);

    // Create ServiceAccount
    const serviceAccountName = await createServiceAccount(email);

    // Bind ServiceAccount to roles
    await bindServiceAccount(email, serviceAccountName);

    // Get ServiceAccount token
    const token = await getServiceAccountToken(email, serviceAccountName);

    // Generate kubeconfig for the user
    const userKubeConfig = await generateKubeConfig(email, token);

    // Convert kubeconfig to yaml and base64
    const userKubeConfigYaml = yaml.dump(userKubeConfig);
    const userKubeConfigBase64 = Buffer.from(userKubeConfigYaml).toString('base64');

    return userKubeConfigBase64;
}