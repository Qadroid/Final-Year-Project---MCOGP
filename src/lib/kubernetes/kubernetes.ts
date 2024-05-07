import { KubeConfig, CoreV1Api, V1ServiceAccount } from '@kubernetes/client-node';
import { KUBECONFIG_BASE64 } from '$env/static/private';

// Helper function to initialize Kubernetes API client
function getK8sClient(encodedKubeConfig: string) {
    const kubeConfigContent = Buffer.from(encodedKubeConfig, 'base64').toString('utf-8');
    const kubeConfig = new KubeConfig();
    kubeConfig.loadFromString(kubeConfigContent);
    return kubeConfig.makeApiClient(CoreV1Api);
}

const k8sClient = getK8sClient(KUBECONFIG_BASE64);

// Async function to create a namespace if it doesn't exist
async function ensureNamespaceExists(userId: string) {
    try {
        await k8sClient.createNamespace({ metadata: { name: userId }});
        console.log('Namespace created');
        return true;
    } catch (error) {
        console.error('Error creating namespace:', error);
        return false;
    }
}

// Async function to create a service account within the namespace
async function ensureServiceAccountExists(userId: string) {
    const serviceAccount = new V1ServiceAccount({ metadata: { name: userId }});
    try {
        await k8sClient.createNamespacedServiceAccount(userId, serviceAccount);
        console.log('Service Account created');
        return true;
    } catch (error) {
        console.error('Error creating Service Account:', error);
        return false;
    }
}

// Function to retrieve and configure a user-specific kubeconfig
async function getUserKubeConfig(userId: string) {
    try {
        const { body: { secrets: [{ name: secretName }] } } = await k8sClient.readNamespacedServiceAccount(userId, userId);
        const { body: { data: { token } } } = await k8sClient.readNamespacedSecret(secretName, userId);
        const decodedToken = Buffer.from(token, 'base64').toString('utf-8');
        
        const currentCluster = k8sClient.getCurrentCluster();
        const kubeConfig = new KubeConfig();
        kubeConfig.loadFromOptions({
            clusters: [currentCluster],
            users: [{ name: userId, user: { token: decodedToken }}],
            contexts: [{ name: userId, context: { cluster: currentCluster.name, user: userId }}],
            currentContext: userId
        });

        return JSON.stringify(kubeConfig.exportConfig(), null, 2);
    } catch (error) {
        console.error('Error fetching Service Account:', error);
        return null;
    }
}

// Controller function to handle new project creation
async function handleNewDefaultProject(user, supabase) {
    try {
        const namespaceCreated = await ensureNamespaceExists(user.id);
        const serviceAccountCreated = await ensureServiceAccountExists(user.id);
    
        if (namespaceCreated && serviceAccountCreated) {
            const kubeConfigJson = await getUserKubeConfig(user.id);
            const { data, error } = await supabase.from('projects').insert({
                name: 'default',
                user_id: user.id,
                kubeconfig: kubeConfigJson
            }).single();

            if (error) throw error;
            return true;
        }
    } catch (error) {
        console.error('Error creating project:', error);
        return false;
    }
}

export { handleNewDefaultProject };
