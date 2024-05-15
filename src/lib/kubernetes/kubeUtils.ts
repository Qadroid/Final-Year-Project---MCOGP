import { generateNewUserKubeConfig } from "./kubernetes"

//  To avoid naming errors in Kubernetes. `@` symbol is not allowed in namespace names.
function emailToNamespace(email: string): string {
    return email.replace(/[@.]/g, '-').toLowerCase()
}

// Create new namespace + user + kubeconfig for new user
async function userInit(email: string) {
    const kubeConfig = await generateNewUserKubeConfig(email)
    return kubeConfig
}
     
export { emailToNamespace, userInit }