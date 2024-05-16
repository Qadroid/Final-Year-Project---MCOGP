//  To avoid naming errors in Kubernetes. `@` symbol is not allowed in namespace names.
function emailToNamespace(email: string): string {
    return email.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/^-+|-+$/g, '');
}
     
export { emailToNamespace }