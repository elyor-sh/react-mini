export const isPrimitive = (type: unknown): boolean => {
    return typeof type === 'string' || typeof type === 'number'
}