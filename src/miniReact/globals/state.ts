// state.ts
export let currentComponentId: number | null = null;

export function setCurrentComponentId (val: number | null) {
    currentComponentId = val
}

export const componentStates: Record<number, any[]> = {};
let stateIndex = 0;

export function resetStateIndex() {
    stateIndex = 0;
}

export function incrementStateIndex() {
    stateIndex++;
    return stateIndex
}

export function getStateIndex() {
    return stateIndex;
}
