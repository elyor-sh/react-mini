import {components, getCurrentComponentId, scheduleUpdate} from "./globals/state";

export function useState<T>(initialValue: T): [T, (newValue: T) => void] {
    const currentComponentId = getCurrentComponentId()
    if (currentComponentId === null) {
        throw new Error('useState can only be used inside a component');
    }

    const component = components[currentComponentId];

    if (!component) {
        throw new Error(`Component with ID ${currentComponentId} not found.`);
    }

    const { states } = component;

    // Используем stateIndex для получения/установки текущего состояния
    const stateIndex = component.stateIndex++;

    if (states[stateIndex] === undefined) {
        states[stateIndex] = initialValue;
    }

    const setState = (newValue: T) => {
        // если новое состояние равно текущему, то ничего не делаем
        if(states[stateIndex] === newValue) {
            return
        }
        states[stateIndex] = newValue;
        scheduleUpdate(currentComponentId)
    };

    return [states[stateIndex], setState];
}