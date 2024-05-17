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

let namespace: string

async function createNamespace(email: string) {
    const namespace = 'namespace-' + emailToNamespace(email);
    const namespaceResource = { metadata: { name: namespace } };
    await serverK8sClient.createNamespace(namespaceResource);
    return namespace;
}

async function createServiceAccount(email: string, namespace: string) {
    const serviceAccountName = 'sa-' + emailToNamespace(email);
    const serviceAccount = { metadata: { name: serviceAccountName, namespace: namespace } };
    await serverK8sClient.createNamespacedServiceAccount(namespace, serviceAccount);

    const secretName = `${serviceAccountName}-token`;
    const secret = {
        metadata: {
            name: secretName,
            namespace: namespace,
            annotations: { 'kubernetes.io/service-account.name': serviceAccountName }
        },
        type: 'kubernetes.io/service-account-token'
    };
    await serverK8sClient.createNamespacedSecret(namespace, secret);

    return serviceAccountName;
}

async function bindServiceAccount(email: string, namespace: string, serviceAccountName: string) {
    const roleBinding = {
        apiVersion: 'rbac.authorization.k8s.io/v1',
        kind: 'RoleBinding',
        metadata: { name: 'rolebinding-' + serviceAccountName, namespace: namespace },
        subjects: [{ kind: 'ServiceAccount', name: serviceAccountName, namespace: namespace }],
        roleRef: { kind: 'ClusterRole', name: 'admin', apiGroup: 'rbac.authorization.k8s.io' }
    };
    await serverK8sRbacClient.createNamespacedRoleBinding(namespace, roleBinding);
}

async function createClusterRoleBinding(email: string, namespace: string, serviceAccountName: string) {
    const clusterRoleBinding = {
        apiVersion: 'rbac.authorization.k8s.io/v1',
        kind: 'ClusterRoleBinding',
        metadata: { name: 'clusterrolebinding-' + serviceAccountName },
        subjects: [{ kind: 'ServiceAccount', name: serviceAccountName, namespace: namespace }],
        roleRef: { kind: 'ClusterRole', name: 'admin', apiGroup: 'rbac.authorization.k8s.io' }
    };
    await serverK8sRbacClient.createClusterRoleBinding(clusterRoleBinding);
}

async function getServiceAccountToken(email: string, namespace: string, serviceAccountName: string) {
    const secretList = await serverK8sClient.listNamespacedSecret(namespace);
    const secret = secretList.body.items.find(secret => secret.metadata.annotations &&
        secret.metadata.annotations['kubernetes.io/service-account.name'] === serviceAccountName);
    const token = Buffer.from(secret.data.token, 'base64').toString('utf-8');
    return token;
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
        clusters: [{ name: clusterName, cluster: { server: server, 'certificate-authority-data': caData } }],
        users: [{ name: userName, user: { token: token } }],
        contexts: [{ name: contextName, context: { cluster: clusterName, user: userName, namespace: 'namespace-' + emailToNamespace(email) } }],
        'current-context': contextName,
    };

    return kubeConfigForUser;
}

export async function generateNewUserKubeConfig(email: string) {
    namespace = await createNamespace(email);
    const serviceAccountName = await createServiceAccount(email, namespace);
    await bindServiceAccount(email, namespace, serviceAccountName);
    await createClusterRoleBinding(email, namespace, serviceAccountName);
    const token = await getServiceAccountToken(email, namespace, serviceAccountName);
    const userKubeConfig = await generateKubeConfig(email, token);
    const userKubeConfigYaml = yaml.dump(userKubeConfig);
    return Buffer.from(userKubeConfigYaml).toString('base64');
}
