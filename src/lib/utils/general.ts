
function serializeNonPOJOs(obj: object) {
    return structuredClone(obj)
}

export { serializeNonPOJOs }