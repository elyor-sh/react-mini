import {components, currentComponentId} from "./render";

export function useState<T>(initialValue: T): [T, (newValue: T) => void] {
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
        states[stateIndex] = newValue;

        console.log('components ', components)

        console.log('component ', component)

        // Рендерим только текущий компонент
        component.render();
    };

    return [states[stateIndex], setState];
}