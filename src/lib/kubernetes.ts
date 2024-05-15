import * as k8s from '@kubernetes/client-node'
import { KUBECONFIG_BASE64 } from '$env/static/private'
import { error } from '@sveltejs/kit';

// Server only use

const kubeConfigContent = Buffer.from(KUBECONFIG_BASE64, 'base64').toString('utf-8');
const kubeConfig = new k8s.KubeConfig();
kubeConfig.loadFromString(kubeConfigContent);
const serverK8sClient = kubeConfig.makeApiClient(k8s.CoreV1Api);

//  To avoid naming errors in Kubernetes. `@` symbol is not allowed in namespace names.
function emailToNamespace(email: string): string {
    return email.replace(/[@.]/g, '-').toLowerCase();
}

async function createNamespaceIfNotExists(email: string, userId: string) {
    const namespaceName = emailToNamespace(email);

    try {
        // Check if namespace exists
        await serverK8sClient.readNamespace(namespaceName);
        console.log(`Namespace ${namespaceName} already exists.`);
    } catch (e) {
        const namespace: k8s.V1Namespace = {
            metadata: {
                name: namespaceName,
            },
        };
        await serverK8sClient.createNamespace(namespace);
        console.log(`Namespace ${namespaceName} created.`);

        const serviceAccount: k8s.V1ServiceAccount = {
            metadata: {
                name: 'default',
                namespace: namespaceName,
            },
        };
        await serverK8sClient.createNamespacedServiceAccount(namespaceName, serviceAccount);
        console.log(`Service Account created in namespace ${namespaceName}.`);
    }

    const currentCluster = kubeConfig.getCurrentCluster();

    if (!currentCluster) {
        return error;
    }

    const kubeconfig = `
apiVersion: v1
kind: Config
clusters:
- cluster:
    server: ${currentCluster.server}
    certificate-authority-data: ${currentCluster.caData}
  name: ${currentCluster.name}
contexts:
- context:
    cluster: ${currentCluster.name}
    namespace: ${namespaceName}
    user: ${namespaceName}-user
  name: ${namespaceName}-context
current-context: ${namespaceName}-context
users:
- name: ${namespaceName}-user
  user:
    token: ${await getServiceAccountToken(namespaceName)}
    `;

    const projectData = {
        name: 'default',
        kubeConfigText: kubeconfig,
    };

    try {
        const response = await databases.createDocument(
            'YOUR_DATABASE_ID', // Your database ID
            'Projects', // Collection ID
            'unique()', // Document ID
            projectData, // Document data
            [`user:${userId}`] // Permissions: only the user can access
        );
        console.log('Project added to Appwrite:', response);
    } catch (error) {
        console.error('Error adding project to Appwrite:', error);
    }
}

// Helper function to get service account token
async function getServiceAccountToken(namespace: string): Promise<string> {
    const secrets = await k8sApi.listNamespacedSecret(namespace);
    const secret = secrets.body.items.find(secret => secret.metadata?.annotations?.['kubernetes.io/service-account.name'] === 'default');
    if (secret && secret.data && secret.data.token) {
        return Buffer.from(secret.data.token, 'base64').toString('utf8');
    }
    throw new Error('Service account token not found');
}

// Usage example
createNamespaceIfNotExists('user@example.com', 'user-id');