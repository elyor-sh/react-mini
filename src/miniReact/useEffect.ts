// src/miniReact/useEffect.ts
let prevDeps: any[] = [];

export function useEffect(callback: () => void, deps: any[]) {
    const hasChanged = deps.some((dep, index) => dep !== prevDeps[index]);
    if (hasChanged) {
        callback();
        prevDeps = deps;
    }
}