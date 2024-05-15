//  To avoid naming errors in Kubernetes. `@` symbol is not allowed in namespace names.
function emailToNamespace(email: string): string {
    return email.replace(/[@.]/g, '-').toLowerCase();
}

export { emailToNamespace }