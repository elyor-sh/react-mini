import {components, getCurrentComponentId, scheduleUpdate} from "./globals/state";

export function useState<T>(initialValue: T): [T, (newValue: T) => void] {
    const currentComponentId = getCurrentComponentId()
    // if (currentComponentId === null) {
    //     throw new Error('useState can only be used inside a component');
    // }
    //
    // const component = components[currentComponentId];
    //
    // if (!component) {
    //     throw new Error(`Component with ID ${currentComponentId} not found.`);
    // }
    //
    // const { states } = component;
    //
    // // Используем stateIndex для получения/установки текущего состояния
    // const stateIndex = component.stateIndex++;
    //
    // if (states[stateIndex] === undefined) {
    //     states[stateIndex] = initialValue;
    // }
    //
    // const setState = (newValue: T) => {
    //     states[stateIndex] = newValue;
    //
    //     console.log('components ', components)
    //
    //     console.log('component ', component)
    //
    //     // Рендерим только текущий компонент
    //     component.render();
    // };
    //
    // return [states[stateIndex], setState];
    if (!currentComponentId) {
        throw new Error('useState can only be used inside a component');
    }

    const component = components[currentComponentId];
    const { stateIndex } = component;

    if (component.states[stateIndex] === undefined) {
        component.states[stateIndex] = initialValue;
    }

    const setState = (newValue: T) => {
        component.states[stateIndex] = newValue;
        scheduleUpdate(currentComponentId!); // Добавляем компонент в очередь обновлений
    };

    const state = component.states[stateIndex];
    component.stateIndex++;
    return [state, setState];
}